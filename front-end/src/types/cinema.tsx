import { AddressType } from "./route";

export interface CinemasType {
  movie: string,
  cinemas: CinemaType[];
};

export interface Session {
  time: string;
  subs: string;
}

export interface Schedule {
  date: string;
  sessions: Session[];
}

export interface CinemaType {
  movieName: string;
  cinemaName: string;
  latitude: string;
  longitude: string;
  location?: string; // mocked for now
  address?: {
    home: AddressType;
    destination: AddressType;
  }; // mocked for now
  schedule?: Schedule[];
  commuteInfo?: {
    bestRoute: { time: string; transportation: string };
    shortestDistance: string;
  }; // mocked for now
};