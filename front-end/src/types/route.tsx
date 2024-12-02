export interface BusStopType {
    id: number;
    name: string;
    coordinates: L.LatLngTuple;
};

export interface RouteDetailType {
    home: string;
    destination: string;
    movieTitle: string;
    cinemaTitle: string;
}