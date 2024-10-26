// api/tmdb.ts
const API_KEY = "a6aa2bd7cebb58fa30a2dcdd75d1793d";
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMovieDetails = async (id: string) => {

    const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`, {
        cache: "force-cache",
        next: { revalidate: 60 }
    })

    const data = await res.json()
    return data
}

export const fetchMovieCredits = async (id: string) => {


    const res = await fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`, {
        cache: "force-cache",
        next: { revalidate: 60 }
    })

    const data = await res.json()
    return data
}

