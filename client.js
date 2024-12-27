const xmasTreeHash = GetHashKey('prop_xmas_ext');
const xmasTreeOrigin = [240.82095336914062, -880.853515625, 28.792084503173828];
const xmasTruckHash = GetHashKey('phantom4');
const xmasTrailerHash = GetHashKey('trailers5');
const xmasTruckDriverHash = GetHashKey('s_m_m_strperf_01');

let treeEntity;
let haulerEntity;
let haulerTrailerEntity;
let haulerDriver;

on('onClientResourceStart', (resource) => {
    if (resource === 'snow') {
        SetOverrideWeather('XMAS');
        const snowConvar = GetConvar('snow_snowLevel', '0');
        const snowLevel = (!(snowConvar?.length > 0) || Number.isNaN(Number(snowConvar))) ? 0 : Number(snowConvar);
        SetSnowLevel(snowLevel);

        SetForcePedFootstepsTracks(true);
        SetForceVehicleTrails(true);
        SetRainLevel(-1.0);
        RequestNamedPtfxAsset('core_snow');

        if (GetConvar('snow_spawnTree', 'true').match(/^("true"|true)$/i)) {
            RequestModel(xmasTreeHash);

            const waitInterval = setInterval(() => {
                if (HasModelLoaded(xmasTreeHash)) {
                    clearInterval(waitInterval);
                    treeEntity = CreateObject(xmasTreeHash, ...xmasTreeOrigin, false, false, false);
                    FreezeEntityPosition(treeEntity, true);
                    console.log('[snow] xmas tree spawned');
                }
            }, 1500);
        }

        //if (GetConvar('snow_spawnHauler', 'true').match(/^("true"|true)$/i)) {
            // Holiday Hauler prototype

            // Load models into memory
            RequestModel(xmasTruckHash);
            RequestModel(xmasTrailerHash);
            RequestModel(xmasTruckDriverHash);

            const modelLoadDelay = setInterval(() => {
                if (HasModelLoaded(xmasTruckHash) || HasModelLoaded(xmasTrailerHash || HasModelLoaded(xmasTruckDriverHash))) {
                    clearInterval(modelLoadDelay);

                    // Create the entities
                    haulerEntity = CreateVehicle(xmasTruckHash, 779.05, -3082.69, 5.2, 360.0, true, false);

                    // Fun fact: trailers are "vehicles" themselves, so... this has to happen.
                    haulerTrailerEntity = CreateVehicle(xmasTrailerHash, 779.05, -3082.69, 10.2, 360.0, true, false); // just spawn it 5 units above the cab why not
                    AttachVehicleToTrailer(haulerEntity, haulerTrailerEntity, 10.0); // check for trailers in a 10 unit radius

                    haulerDriver = CreatePedInsideVehicle(haulerEntity, null, xmasTruckDriverHash, -1, true, false);
                    
                    // Setup routing
                    TaskVehicleDriveWander(haulerDriver, haulerEntity, 10, 4);
                    
                    SetVehicleDoorsLocked(haulerEntity, 2);
                    PlaySoundFromEntity(-1, "Crate_Beeps", haulerTrailerEntity, "MP_CRATE_DROP_SOUNDS", true, 0); // need xmas soundbank for this

                    console.log('[snow] happy holidays hauler spawned!');
                }
            }, 1500);
        //}
        
        console.log('[snow] snow enabled');
    }
});

on('onResourceStop', (resource) => {
    if (resource === 'snow') {
        ClearOverrideWeather();
        SetSnowLevel(-1.0);

        SetForcePedFootstepsTracks(false);
        SetForceVehicleTrails(false);
        SetRainLevel(-1.0);
        RemoveNamedPtfxAsset('core_snow');

        if (GetConvar('snow_spawnTree', 'true').match(/^("true"|true)$/i)) {
            if (DoesEntityExist(treeEntity)) {
                DeleteObject(treeEntity);
                SetModelAsNoLongerNeeded(xmasTreeHash);

                console.log('[snow] xmas tree removed');
            }
        }

        if (DoesEntityExist(haulerDriver) && DoesEntityExist(haulerEntity) && DoesEntityExist(haulerTrailerEntity)) {
            DeletePed(haulerDriver);
            SetModelAsNoLongerNeeded(xmasTruckDriverHash);
            DeleteVehicle(haulerTrailerEntity);
            SetModelAsNoLongerNeeded(xmasTrailerHash);
            DeleteVehicle(haulerEntity);
            SetModelAsNoLongerNeeded(xmasTruckHash);

            console.log('[snow] happy holidays hauler removed!');
        }

        console.log('[snow] snow disabled');
    }
});