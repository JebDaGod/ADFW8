import { useState } from 'react';
import { Link } from 'react-router-dom';
import { searchMovies } from '../services/movieService';

function Header({ setSearchResults }) {
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    if (!query.trim()) {
      setSearchResults(null);
      return;
    }

    try {
      const data = await searchMovies(query);
      setSearchResults(data.results);
    } catch (error) {
      console.error('Error searching movies:', error);
      setSearchResults([]);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (!value.trim()) {
      setSearchResults(null);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="app-title">MovieShelf</Link>

        <nav className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/favorites" className="nav-link">Favorites</Link>
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
          >
            Search
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
