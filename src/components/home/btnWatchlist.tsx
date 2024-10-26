'use client';

import { addToWatchlist, removeFromWatchlist } from "@/action/watchListAction";
import useWatchlistStore from "@/store/store";
import { MovieType } from "@/types/allTypes";
import { MinusIcon, PlusIcon } from "@heroicons/react/16/solid";

let watchlist = []

const BtnWatchlist = ({ movie }: { movie: MovieType }) => {
  const { watchlist, addToWatchlist: addLocally, removeFromWatchlist: removeLocally } = useWatchlistStore();
  const isInWatchlist = watchlist.some((m) => m.id === movie.id);

  const handleToggleWatchlist = async () => {
    if (isInWatchlist) {
      removeLocally(movie.id);
      await removeFromWatchlist(movie.id)
    } else {
      addLocally(movie);
      await addToWatchlist(movie)
    }
  };


  return (
    <div>

      {
        isInWatchlist ?
          <button onClick={handleToggleWatchlist} className="bg-[#e1ab20] flex items-center gap-2 px-5 py-2 text-white rounded-full">
            <MinusIcon className="w-6 h-6 font-bold"></MinusIcon>
            <span>Remove from Watchlist</span>


          </button> :

          <button onClick={handleToggleWatchlist} className="bg-[#e1ab20] flex items-center gap-2 px-5 py-2 text-white rounded-full">
            <PlusIcon className="w-6 h-6 font-bold"></PlusIcon>
            <span> Add to Watchlist</span>


          </button>
      }
      {/* <button onClick={handleToggleWatchlist} className="bg-[#e1ab20] flex items-center gap-2 px-5 py-2 text-white rounded-full">
        <PlusIcon className="w-6 h-6 font-bold"></PlusIcon>
        <span> {isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}</span>


      </button> */}
    </div>
  )
}

export default BtnWatchlist