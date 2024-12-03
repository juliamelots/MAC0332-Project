import { CinemaType } from "@/types/cinema";
import { AddressType } from "@/types/route";

export function convertToCinemaType(
    movieName: string,
    cinemaName: string,
    address: string,
    sessions: any[],
    userAddress: AddressType | null
): CinemaType {

    const mockLatitude = "0.0000";
    const mockLongitude = "0.0000";
    cinemaName = cinemaName
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
  
    const addressParts = address.split('-').map((part) => part.trim());
    const [street, location = "", city] = addressParts.length === 3
        ? addressParts
        : [addressParts[0], "", addressParts[1]];
  
    const addressObject = {
        home: { street: userAddress?.street, city: userAddress?.city, state: userAddress?.state },
        destination: { street, city },
    };
  
    const groupedSessions = sessions.reduce((acc, session) => {
        const sessionDate = session.date;
        if (!acc[sessionDate]) {
            acc[sessionDate] = [];
        }
        acc[sessionDate].push({
            time: session.time,
            subs: session.categories.includes("LEGENDADO") ? "Legendado" : "Dublado",
        });
        return acc;
    }, {} as Record<string, { time: string; subs: string }[]>);
  
    const schedule = Object.keys(groupedSessions).map((date) => ({
        date,
        sessions: groupedSessions[date],
    }));
  
    return {
        movieName: movieName,
        cinemaName: cinemaName,
        latitude: mockLatitude,
        longitude: mockLongitude,
        location: location,
        address: addressObject,
        schedule: schedule,
        commuteInfo: {
            bestRoute: { time: "40 minutos", transportation: "Ônibus" },
            shortestDistance: "12 km",
        },
    };
}