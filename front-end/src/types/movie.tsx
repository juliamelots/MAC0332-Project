export interface MovieType {
    name: string;
    id: string;
    genre: string[];
    rating: MovieRating;
    duration: string;
    synopsis: string;
    url: string;
    img_url: string;
};

type MovieRating = 'L' | '10' | '12' | '14' | '16' | '18';