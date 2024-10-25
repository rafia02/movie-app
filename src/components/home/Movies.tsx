"use client"
import { API_KEY } from "@/action/fetchMovies";
import { MovieType } from "@/types/moviesType";
import Image from "next/image";
import { useEffect, useState } from "react";



const Movies = () => {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [more, setMore] = useState<boolean>(true);




  const fetchPopularMovies = async (page: number) => {
    setLoading(true);
    const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`, {
      cache: 'force-cache',
      next: { revalidate: 60 },
    });
    const data = await res.json();
    console.log(data)

    if (data.results.length === 0 || data.page >= data.total_pages) {
      setMore(false);
    }

    setMovies((prevMovies) => [...prevMovies, ...data.results]);
    setLoading(false);
  };





  useEffect(() => {
    fetchPopularMovies(page);
  }, [page]);


  const loadMoreMovies = () => {
    setPage((prevPage) => prevPage + 1);
  };





  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Popular Movies</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {movies.map((movie: MovieType, index) => (
          <div key={index} className="bg-gray-900 text-white p-4 rounded">

            <Image className="w-full h-auto mb-4" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} height={100} width={500} alt=""></Image>
            <h3 className="text-[17px] font-semibold">{movie.title}</h3>
          </div>
        ))}
      </div>

      {loading && <p className="text-center">Loading...</p>}

      {!loading && more && (
        <div className="text-center mt-4">
          <button
            onClick={loadMoreMovies}
            className="bg-[#9f8741] hover:bg-[#816e34] duration-500 text-white py-2 px-5 rounded"
          >
            Load More
          </button>
        </div>
      )}

      {!more && (
        <p className="text-center mt-4">No more movies to load.</p>
      )}
    </div>
  )
}

export default Movies