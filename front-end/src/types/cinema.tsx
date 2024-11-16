export interface CinemasType {
  movie: string,
  cinemas: CinemaType[];
};

export interface CinemaType {
  name: string;
  location: string;
  price: string;
  address: {
    home: { street: string; city: string };
    destination: { street: string; city: string };
  };
  schedule: { time: string; subs: string }[];
  commuteInfo: {
    bestRoute: { time: string; transportation: string };
    shortestDistance: string;
  };
};