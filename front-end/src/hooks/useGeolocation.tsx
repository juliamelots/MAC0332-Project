import { useState } from "react";
import { UseGeolocation, UserLocationType } from "@/types/geolocation";

export function useGeolocation(): UseGeolocation {
    const [userLocation, setUserLocation] = useState<UserLocationType>(null);

    const getUserLocation = (): Promise<UserLocationType> => {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                console.error("Geolocation is not supported by this browser.");
                reject(new Error("Geolocation is not supported by this browser."));
                return;
            }

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const location = { latitude, longitude };
                    setUserLocation(location);
                    resolve(location);
                },
                (error) => {
                    console.error("Error getting user location:", error);
                    reject(error);
                }
            );
        });
    };

    return { userLocation, getUserLocation };
}
