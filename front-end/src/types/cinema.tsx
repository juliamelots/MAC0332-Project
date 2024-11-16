export interface CinemasType {
  movie: string,
  cinemas: CinemaType[];
};

export type CinemaType = {
  name: string;
  latitude: string;
  longitude: string;
  location?: string; // mocked for now
  price?: string; // mocked for now
  address?: {
      home: { street: string; city: string };
      destination: { street: string; city: string };
  }; // mocked for now
  schedule?: { time: string; subs: string }[]; // mocked for now
  commuteInfo?: {
      bestRoute: { time: string; transportation: string };
      shortestDistance: string;
  }; // mocked for now
};