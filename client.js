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
    }
});