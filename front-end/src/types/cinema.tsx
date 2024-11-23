export interface CinemasType {
  movie: string,
  cinemas: CinemaType[];
};

export interface CinemaType {
  name: string;
  latitude: string;
  longitude: string;
  location?: string; // mocked for now
  address?: {
    home: { street: string; city: string };
    destination: { street: string; city: string };
  }; // mocked for now
  schedule?: {
    date: string;
    sessions: { time: string; subs: string }[];
  }[]; 
  commuteInfo?: {
    bestRoute: { time: string; transportation: string };
    shortestDistance: string;
  }; // mocked for now
};