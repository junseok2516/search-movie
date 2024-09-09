import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Fetch movies based on search query and select top 3
  const searchMovies = async (e) => {
    e.preventDefault();
    console.log("Searched Query: ", searchQuery);
    
    const response = await axios.get(`http://localhost:3010/api/search?query=${searchQuery}`);
    const allMovies = response.data;

    setMovies(allMovies.searchResults);
    setTopRatedMovies(allMovies.topRankedMovies);
  };

  // Fetch details for selected movie
  const fetchMovieDetails = async (movieId) => {
    const response = await axios.get(`http://localhost:3010/api/movie?id=${movieId}`);
    setSelectedMovie(response.data);
  };

  return (
    <div className="App">
      <div className="left-pane">
        <form onSubmit={searchMovies}>
          <input
            type="text"
            placeholder="Search for a movie..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
        <div className="movie-list">
          {movies.map((movie) => (
            <div key={movie.imdbID} onClick={() => fetchMovieDetails(movie.imdbID)}>
              {movie.Title} ({movie.Year})
            </div>
          ))}
        </div>
      </div>

      <div className="right-pane">
        <h2>Top 3 IMDb Rated Movies</h2>
        <div className="top-rated">
          {topRatedMovies.map((movie) => (
            <div key={movie.imdbID} onClick={() => fetchMovieDetails(movie.imdbID)}>
              <h3>{movie.Title} ({movie.Year})</h3>
              <p>IMDb Rating: {movie.imdbRating}</p>
            </div>
          ))}
        </div>

        {selectedMovie && (
          <div className="movie-details">
            <h2>{selectedMovie.Title}</h2>
            <p>{selectedMovie.Plot}</p>
            <p>Director: {selectedMovie.Director}</p>
            <p>Actors: {selectedMovie.Actors}</p>
            <p>IMDb Rating: {selectedMovie.imdbRating}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
