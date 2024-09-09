const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());

const OMDb_API_KEY = "585f11fd";
const OMDb_URL = `http://omdbapi.com/?apikey=${OMDb_API_KEY}`;

// http://omdbapi.com/?apikey=585f11fd

// search for movies
app.get('/api/search', async(req,res)  => {
    const { query } = req.query;
    console.log("RECEIVED QUERY: ", query);
    
    try {
        const response = await axios.get(`${OMDb_URL}&s=${query}`);
        // console.log(response.data.Search); // a capital letter!!!!!!!!
        let movies = response.data.Search || [];

        const movieDetailsProm = movies.map((movie) => {
            return axios.get(`${OMDb_URL}&i=${movie.imdbID}`)
        });

        const movieDetails = await Promise.all(movieDetailsProm);        
        // sorintg movies based on ratings
        const sortedMovies = movieDetails.map((resp) => { return resp.data }).filter((movie) => { return movie.imdbRating !== 'N/A'}).sort((a,b) => { return parseFloat(b.imdbRating) - parseFloat(a.imdbRating)});

        const topThreeMovies = sortedMovies.slice(0,3);

        res.json({
            searchResults: movies,
            topRankedMovies: topThreeMovies
        });
    } catch (err) {
        console.error('Error during searchMovies API call:', err.message);
        res.status(500).json({
            error: 'Failed fetching data'
        });
    }
});



// fetch movie details
app.get('/api/movie', async (req,res) => {
    const {id} = req.query;

    try {
        const response = await axios.get(`${OMDb_URL}&i=${id}`);
        res.json(response.data);
    } catch (err) {
        console.error('Error during getMovieDetails API call:', err.message);
        res.status(500).json({
            error: 'Failed fetching data'
        });
    }
});

app.listen(3010, () => {
    console.log("Server is running on port 3010");
})
