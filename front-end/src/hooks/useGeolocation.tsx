import { useState } from "react";
import { UseGeolocation, UserLocationType } from "@/types/geolocation";

export function useGeolocation(): UseGeolocation {
    const [userLocation, setUserLocation] = useState<UserLocationType>(null);

    const getUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ latitude, longitude });
                },
                (error) => {
                    console.error("Error getting user location: ", error);
                }
            );
        } else {
            console.log("Geolocation is not supported by this browser");
        }
    };

    return { userLocation, getUserLocation };
}
