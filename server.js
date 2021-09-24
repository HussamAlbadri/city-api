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
server.get('/test', (request, response) => {
    response.send('api server is working')
})

class WeatherApi {
    constructor(item) {
        this.data = item.datetime;
        this.descrip = item.weather.description;
    }

}
//localhost:3005/getweatherApi?city=Amman
server.get('/getweatherApi', (req, res) => {
    try {
        let weatherArea = req.query.city;
        let cityData = weatherInformation.find((data) => {
            if (data.city_name === weatherArea) {
                return data;
            }
        });
        let array = cityData.data.map(item => {
            return new WeatherApi(item);
        });
        res.status(200).send(array);
    } catch (err) {
        res.status(404).send("Error: Something Went Wrong \n The Site Is Not Avaible");
    }

});

// localhost:3005/ANYTHING
server.get('*', (req, res) => {
    res.status(404).send('route is not found')
})
server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})