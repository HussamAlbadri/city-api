'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const axios = require('axios');

const server = express();

const PORT = process.env.PORT;
server.use(cors());

// server.get('/', (req, res) => {
//     res.status(200).send('home route')
// })
// const weatherInformation = require('./data/weatherApi.json')

// Modules
const getweatherinformation = require('./modules/weatheer.js')
const getMovieData = require('./modules/moviees.js')

// Roots
server.get('/getweatherApi', getweatherinformation);
server.get('/movies', getMovieData);

// localhost:3005/ANYTHING
server.get('*', (req, res) => {
    res.status(404).send('route is not found')
})
server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})