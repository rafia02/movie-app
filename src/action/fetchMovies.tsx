
export const API_KEY = "a6aa2bd7cebb58fa30a2dcdd75d1793d";
export const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMovieDetails = async (id: string) => {
    const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`, { 
        cache: "force-cache", 
        next: { 
            revalidate: 60 
        } 
    });
    if (!res.ok) throw new Error("Failed to fetch movie details");
    return res.json();
};

export const fetchMovieCredits = async (id: string) => {
    const res = await fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`, { 
        cache: "force-cache", 
        next: { 
            revalidate: 60 
        } 
    });
    if (!res.ok) throw new Error("Failed to fetch movie credits");
    return res.json();
};
