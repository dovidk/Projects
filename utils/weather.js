const request = require('request');



const weather = (place, callback) => {
    request({
        url: `https://api.openweathermap.org/data/2.5/weather?lat=${place.lat}&lon=${place.lon}&units=imperial&appid=???`,
        json: true
    }, (err, response) => {
        if (err) {
            callback(`Error code:${err.cod} ${err.message}`);
        }
        else {
            callback('', `It is currently ${response.body.main.temp} degrees with (a) ${response.body.weather[0].description} and a high of ${response.body.main.temp_max} and a low of ${response.body.main.temp_min}`);
        }
    });
};

module.exports = weather;
