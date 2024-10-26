'use client'
import { getWatchlist } from '@/action/watchListAction';
import useWatchlistStore from '@/store/store';
import { MovieType } from '@/types/allTypes';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const WatchlistPage = () => {
  const { watchlist, removeFromWatchlist } = useWatchlistStore();
  const [initialWatchlist, setInitialWatchlist] = useState<MovieType[]>([]);



  return (
    <div className='px-8 md:px-10 my-10 font-catamaran'>
      <h1 className="text-2xl font-bold text-center mb-5">
        Your Watchlist Movies
      </h1>
      <div className='grid grid-cols-1 gap-5'>
        {(initialWatchlist.length > 0 ? initialWatchlist : watchlist).map((movie) => (
          <div key={movie.id} className="flex md:flex-row flex-col border border-gray-300 rounded p-5 md:w-1/2 mx-auto items-center md:justify-between">
            <div className=' flex md:flex-row items-center md:items-start flex-col gap-5'>

              <Image
                className="w-20 h-20 mb-4"
                src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
                height={10}
                width={100}
                alt=""
              />
              <div>
                <h3 className='text-xl font-bold'>{movie?.title}</h3>
                <p>Release Date: {movie?.release_date}</p>
              </div>
            </div>
            <button
              onClick={() => removeFromWatchlist(movie?.id)}
              className="px-2 py-1 mt-5 md:mt-0 bg-red-500 text-white rounded"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WatchlistPage;
