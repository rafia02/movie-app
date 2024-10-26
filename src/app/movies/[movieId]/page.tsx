import { IdType, MovieType } from "@/types/allTypes"
import Image from "next/image";
import Link from "next/link";






const MovieDetailsPage = async ({ params }: IdType) => {
    const { movieId } = await params

    const API_KEY = "a6aa2bd7cebb58fa30a2dcdd75d1793d";

    const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}
`, {
        next: {
            revalidate: 60
        }
    })
    const movie = await res.json()


    const rescredit = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`, {
        next: {
            revalidate: 60
        }
    })
    const { cast } = await rescredit.json()


    const resrecomand = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${API_KEY}`, {
        next: {
            revalidate: 60
        }
    })
    const recommandMovie = await resrecomand.json()




    console.log(recommandMovie)





    return (
        <div className="my-16 mx-8 md:mx-10 font-catamaran">
      
            <div>
                      {/* movie details  */}
                <div className="flex flex-col md:flex-row gap-16 items-center">
                    <div className="md:w-1/3 relative">
                        <Image className="rounded h-[450px]" src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`} alt="" height={100} width={500} />
                        <span className="px-5 md:px-[29px] py-5 md:py-8 absolute left-[-20px]  top-[-30px] text-2xl md:text-3xl z-30 text-white font-bold  rounded-full bg-[#f1b722]">{movie?.vote_average.toFixed(1)}</span>
                    </div>
                    <div className="md:w-2/3 md:px-10">
                        <h1 className="text-3xl text-center md:text-6xl font-bold mb-6"> {movie?.title}</h1>
                        <p className="text-lg">{movie?.overview}</p>
                        <p className="mt-6">
                            <strong>Release Date: </strong> {movie?.release_date}
                        </p>
                        <p className="mt-1">
                            <strong>Genres: </strong> {movie?.genres.map((genre: any) => genre.name).join(", ")}
                        </p>
                    </div>
                </div>


                {/* credits  */}
                <div className="mt-16">
                    <h1 className="mb-5 text-2xl md:text-4xl font-bold text-center">All Credits</h1>
                    <div className="grid grid-cols-2  md:grid-cols-5 gap-5">
                        {
                            cast?.slice(1, 11).map((c: any) => <div key={c?.id} className="border rounded bg-gray-100">
                                {c?.profile_path ? (
                                    <Image
                                        src={`https://image.tmdb.org/t/p/w200${c?.profile_path}`}
                                        alt={c?.original_name}
                                        width={100}
                                        height={150}
                                        className="rounded mb-2 w-full h-[300px]"
                                    />
                                ) : (
                                    <div className="w-full h-[300px] bg-gray-500 rounded mb-2"></div>
                                )}
                                <div className="px-2 md:px-4 py-2">
                                    <h3 className="font-semibold  md:text-lg">{c?.original_name}</h3>
                                    <p className="text-xs md:text-sm">Character: {c?.character}</p>
                                    {/* <p className="text-sm">Popularity: {c?.popularity.toFixed(1)}</p> */}
                                </div>
                            </div>)
                        }
                    </div>
                </div>
            </div>



            {/* recommands */}
            <div className="mt-20">
                <h1 className="mb-5 text-2xl md:text-4xl font-bold text-center">Also Relevant Recommended Movies</h1>


                <div className="grid grid-cols-1 md:grid-cols-4 gap-x-3 gap-y-16">
                    {recommandMovie?.results.map((movie: MovieType, index: number) => (
                        <Link key={index} href={`/movies/${movie?.id}`}>
                            <div className=" h-[450px]  bg-gray-100 rounded-lg">
                                <div className="relative flex flex-col items-center">
                                    <Image
                                        className="w-full rounded-t-lg h-[365px] mb-4"
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        height={100}
                                        width={500}
                                        alt=""
                                    />
                                    <span className="px-3 py-2 absolute   top-[-20px]  z-30 text-white font-bold  rounded-full bg-[#f1b722]">{movie?.vote_average?.toFixed(1)}</span>
                                </div>

                                <h3 className="text-[17px] px-2 font-semibold">{movie.title}</h3>
                            </div>
                        </Link>
                    ))}
                </div>



            </div>
        </div>
    )
}

export default MovieDetailsPage