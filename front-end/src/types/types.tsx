export interface CinemaType {
    name: string;
    latitude: string;
    longitude: string;
};
  
export interface MovieType {
    title: string;
    posterUrl: string;
    runtime: string;
    genre: string;
    plot: string;
    rated: MovieRating;
    directors: string;
    availableCinemas: CinemaType[];
};

export interface BackMovieType {
    name: string;
    availableCinemas: CinemaType[];
    genre: string[];
    rating: MovieRating;
    duration: string;
    synopsis: string;
    url: string;
    img_url: string;
};

type MovieRating = 'L' | '10' | '12' | '14' | '16' | '18';