import { useEffect, useState } from 'react';
import './App.css';
import MovieCard from './components/MovieCard';
import SearchIcon from './search.svg';

// API KEY : f5793505

const API_URL = 'http://www.omdbapi.com?apikey=f5793505';

// const movie1 = {
//   Title: 'The World Is Watching: Making the Hunger Games',
//   Year: '2012',
//   imdbID: 'tt2327114',
//   Type: 'movie',
//   Poster: 'N/A',
// };

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState();

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };
  useEffect(() => {
    searchMovies(' ');
  }, []);

  return (
    <div className="app">
      <h1>MovieLand</h1>
      <div className="search">
        <input
          placeholder="Chercher un film"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>Aucun film trouvé</h2>
        </div>
      )}
    </div>
  );
};

export default App;
