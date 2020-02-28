const express = require('express');
const router = express.Router();
const geocode = require('../utils/geocode');
const weather = require('../utils/weather');

router.get('/', (req, res, next) => {
    if (!req.query.location && !req.query.lat) {
        return res.send({
            error: 'Please provide a location'
        });
    }
    if (req.query.location) {
        geocode(req.query.location, (error, { location, lon, lat } = {}) => {
            if (error) {
                return res.send({ error });
            }
            weather({ lon, lat }, (error, forecastData) => {
                if (error) {
                    return res.send({ error });
                }
                res.send({ location, forecastData, lon, lat });
            });
        });
    }
    if (req.query.lat) {
        weather({ lon: req.query.lon, lat: req.query.lat }, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }
            res.send({ forecastData });
        });
    }
});


module.exports = router;