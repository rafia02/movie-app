export interface MovieType {
    id: number;
    title: string;
    poster_path: string;
    vote_average?: number
  }



  // types/movie.ts
export interface MovieDetails {
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  genres: { name: string }[];
}

export interface MovieCredit {
  name: string;
  character: string;
}



export type FormData = {
  title: string;
};


export interface SearchForm {
  query: string;
}



export interface IdType {
  params: {
      movieId: string
  }
}


export interface castType {
  name: string
}
