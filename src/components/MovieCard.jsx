import { useState } from 'react';

function MovieCard({ movie }) {
  const [imageError, setImageError] = useState(false);

  const [isFavorite, setIsFavorite] = useState(() => {
    try {
      const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      return favorites.some((favorite) => favorite.id === movie.id);
    } catch {
      return false;
    }
  });

  const handleFavorite = () => {
    try {
      const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      const alreadyFavorite = favorites.some(
        (favorite) => favorite.id === movie.id
      );

      let updatedFavorites;

      if (alreadyFavorite) {
        updatedFavorites = favorites.filter(
          (favorite) => favorite.id !== movie.id
        );
      } else {
        updatedFavorites = [...favorites, movie];
      }

      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setIsFavorite(!alreadyFavorite);

      window.dispatchEvent(new Event('favoritesUpdated'));
    } catch (error) {
      console.error('Could not update favorites:', error);
    }
  };

  const posterUrl =
    movie.poster_path && !imageError
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : null;

  return (
    <div className="movie-card">
      {posterUrl ? (
        <img
          src={posterUrl}
          alt={`${movie.title} poster`}
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="movie-poster-placeholder">
          Poster unavailable
        </div>
      )}

      <h3>{movie.title}</h3>
      <p>Rating: {movie.vote_average?.toFixed(1) ?? 'N/A'}</p>
      <p>Release Date: {movie.release_date || 'Unknown'}</p>

      <button
        type="button"
        className="favorite-button"
        onClick={handleFavorite}
        aria-pressed={isFavorite}
      >
        {isFavorite ? 'Remove Favorite' : 'Add to Favorites'}
      </button>
    </div>
  );
}

export default MovieCard;
