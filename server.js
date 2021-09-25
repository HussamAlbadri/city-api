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

server.get('/weather', getweatherinformation);
server.get('/movies', getMovieData);


class WeatherApi {
    constructor(date, description) {
        this.date = date;
        this.description = description;
    }

}

class MovieCon {
    constructor(data) {
        this.title = data.title;
        this.overView = data.over_view;
        this.NumberOfVotes = data.vote;
        this.total = data.numberOfTotalVotes;
        this.image_url = 'https://image.tmdb.org/t/p/w500' + data.image_path;
        this.popularity = data.popularity;
        this.date_proper = data.release_date;

    }
}

function getweatherinformation(req, res) {
    //localhost:3005/getweatherApi?city=Amman

    try {
        let weatherArea = req.query.city;

        let URL = `https://api.weatherbit.io/v2.0/forecast/daily?city=${weatherArea}&key=${process.env.WEATHER_KEY}`
        let array = cityData.data.map(ele => {
            return new WeatherApi(ele.datetime, ele.weather.description);
        });
        res.send(array);
    } catch (err) {
        res.send("Error: Something Went Wrong \n The Site Is Not Avaible");
    }
}

function getMovieData(req, res) {
    let movieHandler = req.query.city

    let movieLink = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${movieHandler}`

    axios.get(movieLink).then(dataCollectionResult => {
        let array = dataCollectionResult.data.results.map(item => {
            return new MovieCon(item)
        })
        res.send(array)
    }).catch(error => {
        res.send(error)
    })
}


// localhost:3005/ANYTHING
server.get('*', (req, res) => {
    res.status(404).send('route is not found')
})
server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})