"use strict";

const getStops = require('./swapiWorld/swapiFunctions').getStops,
      prompt = require('prompt');

const mglt = {
    properties: {
      mgltDistance: {
        pattern: /^[0-9]*$/,
        message: 'MGLT - must be a whole numeric value only',
        required: true
      }
    }
  };


  let calcShipStops = () => {
prompt.start();

prompt.get(mglt, function (err, result) {
    console.log('Input received.  Now calculating #stops per starship required for MGLTDistance: ' + result.mgltDistance);

    getStops(result.mgltDistance)
        .then(jsonData => {
            for (var i = 0; i < jsonData.length; i++) {
                console.log('Starship ' + jsonData[i].starshipName + ' requires ' + jsonData[i].stops + ' stops.');
            }
        });
});
  };

  calcShipStops();

module.exports = {
    calcShipStops: calcShipStops
};
