import axios from "axios";

export const getCoordinatesLatLon = async (address: string) => {
    const response = await axios.get("https://nominatim.openstreetmap.org/search", {
        params: { q: address, format: "json" },
    });
  
    if (response.data && response.data.length > 0) {
        const { lat, lon } = response.data[0];
        return { lat: parseFloat(lat), lon: parseFloat(lon) };
    } else {
        console.error("Address not found");
        return { lat: 0, lon: 0 };
    }
};