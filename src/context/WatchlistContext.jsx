
import { createContext, useContext, useEffect, useState } from 'react';

const MovieContext = createContext();

export function MovieProvider({ children }) {
  const [watchlist, setWatchlist] = useState(() => {
    try {
      const savedWatchlist = localStorage.getItem('watchlist');
      return savedWatchlist ? JSON.parse(savedWatchlist) : [];
    } catch (error) {
      console.error('Error loading watchlist:', error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  const addToWatchlist = (movie) => {
    setWatchlist((currentWatchlist) => {
      if (currentWatchlist.some((item) => item.id === movie.id)) {
        return currentWatchlist;
      }

      return [...currentWatchlist, movie];
    });
  };

  const removeFromWatchlist = (movieId) => {
    setWatchlist((currentWatchlist) =>
      currentWatchlist.filter((movie) => movie.id !== movieId)
    );
  };

  const isInWatchlist = (movieId) =>
    watchlist.some((movie) => movie.id === movieId);

  return (
    <MovieContext.Provider
      value={{
        watchlist,
        addToWatchlist,
        removeFromWatchlist,
        isInWatchlist,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}

export function useWatchlist() {
  return useContext(MovieContext);
}
