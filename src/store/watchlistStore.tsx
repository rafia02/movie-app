// store/useWatchlistStore.ts

import { create } from "zustand";


interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
}

interface WatchlistStore {
  watchlist: Movie[];
  addMovie: (movie: Movie) => void;
  removeMovie: (id: number) => void;
}

export const useWatchlistStore = create<WatchlistStore>((set) => ({
  watchlist: [],
  addMovie: (movie) =>
    set((state) => ({
      watchlist: [...state.watchlist, movie],
    })),
  removeMovie: (id) =>
    set((state) => ({
      watchlist: state.watchlist.filter((movie) => movie.id !== id),
    })),
}));
