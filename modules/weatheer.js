const axios = require('axios');

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

class WeatherApi {
    constructor(item) {
        this.date = item.valid_date;
        this.description = item.weather.description;
    }

}

module.exports = getweatherinformation;