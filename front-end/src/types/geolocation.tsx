export type UserLocationType = {
    latitude: number;
    longitude: number;
} | null;

export type GetUserLocation = () => void;

export interface UseGeolocation {
    userLocation: UserLocationType;
    getUserLocation: GetUserLocation;
}