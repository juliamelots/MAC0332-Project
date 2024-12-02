import axios from "axios";

interface OpenStreetMapResponse {
    lat: string;
    lon: string;
}

export const getCoordinatesLatLon = async (address: string) => {
    try {
        const response = await axios.get<OpenStreetMapResponse[]>(
            "https://nominatim.openstreetmap.org/search",
            {
                params: { q: address, format: "json" },
            }
        );
    
        if (response.data && response.data.length > 0) {
            const { lat, lon } = response.data[0];
            return { lat: parseFloat(lat), lon: parseFloat(lon) };
        } else {
            console.error("Address not found");
            return { lat: 0, lon: 0 };
        }
    } catch (error) {
        console.error("Error fetching coordinates:", error);
        return { lat: 0, lon: 0 };
    }
};