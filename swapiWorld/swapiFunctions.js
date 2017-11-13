"use strict";

const getSwapiComplete = require('./swapiAll').getSwapiComplete;

// Object to store units in hours (will be used to unify the consumable values for starships).  Conversions based on Mr.Google.
let unitsInHours = {
    "hour": 1,
    "hours": 1,
    "day": 24,
    "days": 24,
    "week": 168,
    "weeks": 168,
    "month": 730.001,
    "months": 730.001,
    "year": 8760,
    "years": 8760
};

// Convert all time units to hour units
let hoursConsumables = (inConsumables) => {
    try {
        var splitArray = inConsumables.split(" "),
            consumableUnit = parseFloat(splitArray[0]),
            consumableUnitType = splitArray[1];
        if (!isNaN(consumableUnit) && unitsInHours[consumableUnitType]) {
            return consumableUnit * unitsInHours[consumableUnitType];
        } else {
            return 0
        }
    }
    catch (error) {
        return 0;
    }
};

// Get details of all starships and calculate the number of stops required for each based on MGLT input and the starships existing MGLT capacity (where known) amd starships consumables (where known)
let getStops = (inMGLT) => {
    return new Promise((resolve, reject) => {
        var myMGLT = parseFloat(inMGLT),
            starshipsStops = [],
            starshipObj = {},
            calculatedStops = 'unknown';
        getSwapiComplete('starships')
            .then(data => {
                calculatedStops = 'unknown';
                // loop over all starships returned
                for (var i = 0; i < data.length; i++) {
                    if (data[i].MGLT !== 'unknown' && data[i].consumables !== 'unknown' && data[i].consumables !== 0) {
                        try {
                            calculatedStops = Math.floor(inMGLT / data[i].MGLT / hoursConsumables(data[i].consumables));
                        }
                        catch (error) {
                            calculatedStops = 'unknown';
                        }
                    }
                    else {
                        calculatedStops = 'unknown';
                    }
                    starshipObj = { "starshipName": data[i].name, "stops": calculatedStops };
                    starshipsStops.push(starshipObj);
                }


                resolve(starshipsStops);
            });
    });
};

module.exports = {
    getStops: getStops
};
