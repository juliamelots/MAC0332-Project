export type CinemaType = {
    name: string;
    latitude: string;
    longitude: string;
};
  
export type MovieType = {
    title: string,
    posterUrl: string,
    runtime: string,
    genre: string,
    plot: string,
    rated: string,
    directors: string,
    availableCinemas: CinemaType[];
};