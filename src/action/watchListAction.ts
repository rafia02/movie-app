'use server';

import { MovieType } from "@/types/allTypes";

let watchlist: MovieType[] = []; // In-memory storage for testing

export async function addToWatchlist(movie: MovieType) {
  watchlist.push(movie);
  return { message: 'Movie added to watchlist' };
}

export async function removeFromWatchlist(movieId: number) {
  watchlist = watchlist.filter((movie) => movie.id !== movieId);
  return { message: 'Movie removed from watchlist' };
}

export async function getWatchlist() {
  return watchlist;
}
