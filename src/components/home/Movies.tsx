"use client";
import { FormData, MovieType } from "@/types/allTypes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";



const Movies = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [more, setMore] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const API_KEY = "a6aa2bd7cebb58fa30a2dcdd75d1793d";

  // Fetch popular movies or search results 
  const fetchMovies = async (page: number, query = "") => {
    setLoading(true)
    const endpoint = query
      ? `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`
      : `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`;
    const res = await fetch(endpoint, { cache: "force-cache" });
    const data = await res.json()

    if (data.results.length === 0 || data.page >= data.total_pages) {
      setMore(false)
    }

    setMovies((prevMovies) =>
      page === 1 ? data.results : [...prevMovies, ...data.results]
    );
    setLoading(false)
  };

  useEffect(() => {
    fetchMovies(page, searchQuery)
  }, [page, searchQuery])

  const loadMoreMovies = () => {
    setPage((prevPage) => prevPage + 1)
  };

  const onSubmit = handleSubmit((data) => {
    if (data.title.length >= 3) {
      setSearchQuery(data.title)
      setPage(1)
      setMovies([])
    }
  });

  return (
    <div className="container mx-auto p-4 font-catamaran">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <h1 className="text-3xl font-bold mb-4">Popular Movies</h1>

        <form onSubmit={onSubmit}>
          <div className="flex mb-5 md:mb-0">
            <div className="w-3/4">
              <input
                type="text"
                id="title"
                {...register("title", {
                  required: "Movie title is required",
                  minLength: {
                    value: 3,
                    message: "Enter at least 3 characters",
                  },
                })}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                placeholder="Enter movie title"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-1/4 h-10 bg-secondary text-white font-medium py-2 px-4 rounded-md duration-500 hover:bg-[#d29f1d] transition"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {movies.map((movie: MovieType, index) => (
          <Link key={index} href={`/movies/${movie?.id}`}>
            <div className="bg-[#081b27]  h-[500px] text-white p-4 rounded">
              <Image
                className="w-full h-auto mb-4"
                src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
                height={100}
                width={500}
                alt=""
              />
              <h3 className="text-[17px] font-semibold">{movie?.title}</h3>
            </div>
          </Link>
        ))}
      </div>

      {loading && <p className="text-center">Loading...</p>}

      {!loading && more && (
        <div className="text-center mt-4">
          <button
            onClick={loadMoreMovies}
            className="bg-[#dfa81e] hover:bg-[#d29f1d] duration-500 text-white py-2 px-5 rounded"
          >
            Load More
          </button>
        </div>
      )}

      {!more && <p className="text-center mt-4">No more movies to load.</p>}
    </div>
  );
};

export default Movies;
