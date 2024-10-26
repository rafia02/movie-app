// store/watchlistStore.ts
import { create } from 'zustand';

interface Movie {
  id: number;
  title: string;
  // Additional fields as needed
}

interface WatchlistStore {
  watchlist: Movie[];
  addToWatchlist: (movie: Movie) => void;
  removeFromWatchlist: (movieId: number) => void;
}

const useWatchlistStore = create<WatchlistStore>((set) => ({
  watchlist: [],
  addToWatchlist: (movie) => set((state) => ({
    watchlist: [...state.watchlist, movie],
  })),
  removeFromWatchlist: (movieId) => set((state) => ({
    watchlist: state.watchlist.filter((movie) => movie.id !== movieId),
  })),
}));

export default useWatchlistStore;
