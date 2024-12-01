import axios from "axios";

export const getAddress = async (latitude: number, longitude: number) => {
    const response = await axios.get("https://nominatim.openstreetmap.org/reverse", {
        params: { lat: latitude, lon: longitude, format: "json" },
    });

    if (response.data && response.data.address) {
        return response.data.address;
    } else {
        console.error("Coordinates not found");
        return null;
    }
};