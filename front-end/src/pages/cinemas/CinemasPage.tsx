import { useLocation } from "react-router-dom";

import { CinemaType } from "@/types/cinema";
import axios from "@/services/axiosInstance";

import CinemaCard from "@/pages/cinemas/CinemaCard";
import FilterSelector from "@/components/layout/filter-selector/FilterSelector";
import Navbar from "@/components/layout/navbar/Navbar";
import { useState, useEffect } from "react";
import "./CinemasPage.css"
import { UserLocationType } from "@/types/geolocation";

function convertToCinemaType(cinemaName: string, address: string, sessions: any[]): CinemaType {
  const mockLocation = "Shopping Iguatemi";
  const mockLatitude = "0.0000";
  const mockLongitude = "0.0000";
  cinemaName = cinemaName
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const [street, city] = address.split('-').map((part) => part.trim());
  const addressObject = {
    home: { street: "Av. Minha Rua, 1234", city: "São Paulo, São Paulo" },
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
    name: cinemaName,
    latitude: mockLatitude,
    longitude: mockLongitude,
    location: mockLocation,
    address: addressObject,
    schedule: schedule,
    commuteInfo: {
      bestRoute: { time: "40 minutos", transportation: "Ônibus" },
      shortestDistance: "12 km",
    },
  };
}


function CinemasPage() {
  const location = useLocation();
  const movieName: string = location.state?.movieName || '';
  const movieId: string = location.state?.movieId || '';
  const userLocation: UserLocationType = location.state?.userLocation || {};

  const [cinemas, setCinemas] = useState<CinemaType[]>([]);
  const [message, setMessage] = useState<string>('');
  let cinemaIdsData: string[] = [];

  useEffect(() => {
    const fetchCinemas = async () => {
      try {
        setMessage('Carregando cinemas...');
        const cinemaIds = await axios.get(`/movie/${movieId}/available-cinemas`);
        cinemaIdsData = cinemaIds.data["available-cinemas"];

        const cinemaPromises = cinemaIdsData.map(async (cinema) => {
          const cinemaAddressResponse = await axios.get(`/cinema/${cinema}/address`);
          const cinemaSessionsResponse = await axios.get(`/cinema/${cinema}/${movieId}/sessions`);

          const cinemaType = convertToCinemaType(
            cinema,
            cinemaAddressResponse.data.address,
            cinemaSessionsResponse.data["movie sessions"]
          );

          return cinemaType;
        });

        const cinemasData = await Promise.all(cinemaPromises);

        setCinemas(cinemasData as CinemaType[]);
        setMessage('');
      } catch (err) {
        setMessage('Não foi possível carregar os cinemas.');
        console.error(err);
      }
    };
    fetchCinemas();
  }, []);

  const distanceOptions = ["5 km", "10 km", "15 km", "20 km"];

  const [selectedDistance, setSelectedDistance] = useState("100 km");

  const filteredCinemas = cinemas.filter((cinema) => {
    const selectedDistanceInKm = parseFloat(selectedDistance);
    const cinemaDistanceInKm = cinema.commuteInfo?.shortestDistance
      ? parseFloat(cinema.commuteInfo.shortestDistance.replace(' km', ''))
      : 0; 

    return cinemaDistanceInKm <= selectedDistanceInKm;
  });;

  return (
    <div className="d-flex flex-column h-100 w-100">
      <div className="bg-ac-red text-center d-flex flex-column">
        <Navbar />
        <div className="container">
          <h1 className="text-white">Cinemas exibindo <em>{movieName}</em></h1>
        </div>
        <div className="d-flex flex-row justify-content-center my-3" style={{ gap: '100px' }}>
          <FilterSelector
            placeholder="Distância máxima"
            options={distanceOptions}
            onOptionSelect={setSelectedDistance} />
        </div>
      </div>
      <div className="bg-ac-black cinemas overflow-auto d-flex flex-column vh-100">
        {cinemas.length > 0 ? (
          filteredCinemas.length > 0 ? (
            filteredCinemas.map((cinema) => (
              <CinemaCard
                name={cinema.name}
                location={cinema.location!}
                address={cinema.address!}
                schedule={cinema.schedule!}
                commuteInfo={cinema.commuteInfo!}
              />
            ))
          ) : (
            <div className="d-flex align-items-center justify-content-center h-100">
              <h3 className="text-white">Nenhum cinema encontrado para a distância selecionada.</h3>
            </div>
          )
        ) : (
          <div className="d-flex align-items-center justify-content-center h-100">
            <h3 className="text-white">{message}</h3>
          </div>
        )}
        <div className="space"></div>
      </div>
    </div>
  )
}

export default CinemasPage;