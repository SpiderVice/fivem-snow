const xmasTreeHash = GetHashKey('prop_xmas_ext');
const xmasTreeOrigin = [240.82095336914062, -880.853515625, 28.792084503173828];

let treeEntity;

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
        console.log('[snow] snow disabled');
    }
});