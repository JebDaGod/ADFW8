
import MovieGrid from '../components/MovieGrid';
import { useWatchlist } from '../context/WatchlistContext';

function Watchlist() {
  const { watchlist } = useWatchlist();

  return (
    <main className="main-content">
      <div className="content-header">
        <h2>My Watchlist</h2>
        <p>Movies you want to watch later</p>
      </div>

      {watchlist.length > 0 ? (
        <MovieGrid movies={watchlist} />
      ) : (
        <div className="empty-state">
          <p>
            Your watchlist is empty. Add movies you want to watch later!
          </p>
        </div>
      )}
    </main>
  );
}

export default Watchlist;
