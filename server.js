'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');

const server = express();

const PORT = process.env.PORT;
server.use(cors());

server.get('/', (req, res) => {
    res.status(200).send('home route')
})
const weatherInformation = require('./data/weatherApi.json')

class WeatherApi {
    constructor(date, description) {
        this.date = date;
        this.description = description;
    }

}
//localhost:3005/getweatherApi?city=Amman
server.get('/getweatherApi', (req, res) => {
    try {
        let weatherArea = req.query.city;
        let cityData = weatherInformation.find((item) => {
            if (item.city_name === weatherArea) {
                return item;
            }
        });
        let array = cityData.data.map(ele => {
            return new WeatherApi(ele.datetime, ele.weather.description);
        });
        res.send(array);
    } catch (err) {
        res.send("Error: Something Went Wrong \n The Site Is Not Avaible");
    }

});

// localhost:3005/ANYTHING
server.get('*', (req, res) => {
    res.status(404).send('route is not found')
})
server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})