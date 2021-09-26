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

server.get('/getweatherApi', getweatherinformation);
server.get('/movies', getMovieData);


class WeatherApi {
    constructor(item) {
        this.date = item.valid_date;
        this.description = item.weather.description;
    }

}

class MovieCon {
    constructor(element) {
        this.title = element.title;
        this.overview = element.overview;
        this.average_votes = element.vote_average;
        this.total_votes = element.vote_count;
        this.image_url = 'https://image.tmdb.org/t/p/w500' + element.poster_path;
        this.popularity = element.popularity;
        this.released_on = element.release_date;
    }
}

function getweatherinformation(req, res) {
    //http://localhost:3004/getweatherApi?city=Amman 

    let weatherArea = req.query.city;

    let URL = `https://api.weatherbit.io/v2.0/forecast/daily?city=${weatherArea}&key=${process.env.WEATHER_KEY}`
    console.log(URL)
    try {
        axios.get(URL).then(dataCollection => {
            let array = dataCollection.data.data.map(item => {
                return new WeatherApi(item)
            })
            res.send(array)
        })
    } catch (error) {
        res.send(error);
    }

}

function getMovieData(req, res) {
    let movieHandler = req.query.city
        //http://localhost:3004/movies?city=Amman 

    let movieLink = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_KEY}&query=${movieHandler}`
        // console.log(movieLink)
    try {
        axios.get(movieLink).then(dataCollectionResult => {
            let array = dataCollectionResult.data.results.map(element => {
                return new MovieCon(element)
            })
            res.send(array)
        });

    } catch (error) {
        res.send(error);
    }
}


// localhost:3005/ANYTHING
server.get('*', (req, res) => {
    res.status(404).send('route is not found')
})
server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})