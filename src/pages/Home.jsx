
import { useEffect, useState } from 'react';
import MovieGrid from '../components/MovieGrid';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { getPopularMovies } from '../services/movieService';

function Home({ searchResults }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError('');

        const data = await getPopularMovies();
        setMovies(data.results);
      } catch (error) {
        setError('Failed to load popular movies. Please try again.');
        console.error('Error fetching popular movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const displayedMovies = searchResults ?? movies;

  return (
    <main className="main-content">
      <div className="content-header">
        <h2>{searchResults !== null ? 'Search Results' : 'Popular Movies'}</h2>
        <p>Discover and save your favorite films</p>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : error && searchResults === null ? (
        <ErrorMessage message={error} />
      ) : displayedMovies.length > 0 ? (
        <MovieGrid movies={displayedMovies} />
      ) : (
        <p>No movies found.</p>
      )}
    </main>
  );
}

export default Home;
