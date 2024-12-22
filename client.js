const xmasTreeOrigin = [240.82095336914062, -880.853515625, 28.792084503173828];

on('onClientResourceStart', (resource) => {
    if (resource === 'snow') {
        SetOverrideWeather('XMAS');
        SetSnowLevel(1);

        // I don't actually have a clue if this does anything in GTAV but hell it doesn't break anything neither so...
        LoadCloudHat('Snowy 01', 1);

        SetForcePedFootstepsTracks(true);
        SetForceVehicleTrails(true);
        SetRainLevel(-1.0);
        RequestNamedPtfxAsset('core_snow');

        if (GetConvar('snow_spawnTree', 'true').match(/^("true"|true)$/i)) {
            const xmasTreeHash = GetHashKey('prop_xmas_ext');
            RequestModel(xmasTreeHash);

            const waitInterval = setInterval(() => {
                if (HasModelLoaded(xmasTreeHash)) {
                    clearInterval(waitInterval);
                    const treeEntity = CreateObject(xmasTreeHash, ...xmasTreeOrigin, false, false, false);
                    FreezeEntityPosition(treeEntity, true);
                    console.log('[snow] xmas tree spawned');
                }
            }, 1500);
        }
    }
});