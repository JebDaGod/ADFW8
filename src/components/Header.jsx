import { Link } from 'react-router-dom';
import { useState } from 'react';
import { searchMovies } from '../services/movieService';
import ErrorMessage from './ErrorMessage';

function Header({ setSearchResults }) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!query.trim()) {
      setSearchResults(null);
      setError('');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const data = await searchMovies(query.trim());
      setSearchResults(data.results);
    } catch (err) {
      setError('Failed to search movies. Please try again.');
      console.error('Error searching movies:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setQuery(value);

    if (!value.trim()) {
      setSearchResults(null);
      setError('');
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="app-title">
          MovieShelf
        </Link>

        <nav className="nav-links">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/watchlist" className="nav-link">
            Watchlist
          </Link>
          <Link to="/favorites" className="nav-link">
            Favorites
          </Link>
        </nav>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search movies..."
            className="search-input"
            value={query}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />

          <button
            className="search-button"
            onClick={handleSearch}
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </div>

      {error && <ErrorMessage message={error} />}
    </header>
  );
}

export default Header;
