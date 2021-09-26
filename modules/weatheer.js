const axios = require('axios');

let weatherMemory = {};

function getweatherinformation(req, res) {
    //http://localhost:3004/getweatherApi?city=Amman 

    let weatherArea = req.query.city;

    let URL = `https://api.weatherbit.io/v2.0/forecast/daily?city=${weatherArea}&key=${process.env.WEATHER_KEY}`

    if (weatherMemory[weatherArea] !== undefined) {
        res.send(weatherMemory[weatherArea]);
    } else {


        try {
            axios.get(URL).then(dataCollection => {
                let array = dataCollection.data.data.map(item => {
                    return new WeatherApi(item)
                })
                weatherMemory[weatherArea] = array;
                res.send(array)
            });
        } catch (error) {
            res.send(error);
        }

    }
}

class WeatherApi {
    constructor(item) {
        this.date = item.valid_date;
        this.description = item.weather.description;
    }

}

module.exports = getweatherinformation;