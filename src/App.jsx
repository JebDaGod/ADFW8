import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Watchlist from './pages/Watchlist';
import { MovieProvider } from './context/WatchlistContext';
import './App.css';

function App() {
  const [searchResults, setSearchResults] = useState(null);

  return (
    <MovieProvider>
      <Router>
        <div className="app">
          <Header setSearchResults={setSearchResults} />

          <Routes>
            <Route
              path="/"
              element={<Home searchResults={searchResults} />}
            />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/watchlist" element={<Watchlist />} />
          </Routes>
        </div>
      </Router>
    </MovieProvider>
  );
}

export default App;
