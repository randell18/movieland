import { useEffect, useState } from 'react';
import './App.css';
import SearchIcon from '@mui/icons-material/Search';
import MovieCard from './comps/MovieCard';

const API_URL = 'http://www.omdbapi.com/?apikey=c0822fea';

function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');

  const searchMovies = async (title) => {
    try {
      const res = await fetch(`${API_URL}&s=${title}`);
      const data = await res.json();
      setMovies(data.Search);
    }catch(err) {
      console.error(err);
    }
  }
  useEffect(() => {
    searchMovies('venom');
  }, [])

  return (
    <div className="App">
      <h1>MovieLand</h1>
      <div>
        <input 
            placeholder='Search for movies'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <SearchIcon onClick={() => searchMovies(search)} />
      </div>
        {movies.length > 0 
          ? (
            <div>
              {movies.map(movie => (
                <MovieCard movie={movie}/>
              ))}
            </div>
          ) : (
            <div>
              <h2>No movies found</h2>
            </div>
          )}
    </div>
  );
}

export default App;
