const request = require('request');

const geocode = (place, callback) => {
    request({
        url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?limit=1&access_token=pk.eyJ1IjoiZG92aWRrIiwiYSI6ImNrNnppNzFsOTE4cnYzZ3A1aXczMDh4eTQifQ.WqH7WW16n0u8wmAs3pWiag
        `,
        json: true
    }, (err, response) => {
        if (err) {
            callback('Unable to connect');
        }
        else if (response.body.features.length === 0) {
            callback('No such location found');
        }
        else {
            callback('', {
                lat: response.body.features[0].center[1],
                lon: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            });
        }
    });
};

module.exports = geocode;