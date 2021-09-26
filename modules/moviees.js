const axios = require('axios');

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

module.exports = getMovieData;