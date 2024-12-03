export interface BusStopType {
    id: number;
    name: string;
    coordinates: L.LatLngTuple;
};

export interface AddressType {
    street: string;
    city: string;
    state?: string;
    number?: string;
    country?: string;
}

export interface RouteDetailType {
    home: string;
    destination: string;
    movieTitle: string;
    cinemaTitle: string;
}