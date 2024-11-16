import { useParams, useLocation } from "react-router-dom";
import CinemaCard from "@/pages/cinemas/CinemaCard";
import FilterSelector from "@/components/layout/filter-selector/FilterSelector";
import Navbar from "@/components/layout/navbar/Navbar";
import { CinemaType } from "@/types/types";
import { useState } from "react";
import "./CinemasPage.css"

function CinemasPage() {
  const location = useLocation();
  const { movie } = useParams<{ movie: string }>();
  const cinemas: CinemaType[] = location.state?.cinemas || [];

  const distanceOptions = ["5 km", "10 km", "15 km", "20 km"];

  const [selectedDistance, setSelectedDistance] = useState(distanceOptions[3]);

  const enhancedCinemas = cinemas.map((cinema) => ({
    ...cinema,
    location: cinema.location || "Shopping Iguatemi",
    price: cinema.price || "R$29,99",
    address: cinema.address || {
      home: { street: "Av. minha rua, 123", city: "Osasco, São Paulo" },
      destination: { street: "Av. Paulista, 1234", city: "São Paulo, São Paulo" },
    },
    schedule: cinema.schedule || [
      { time: "12:30", subs: "Dublado" },
      { time: "21:30", subs: "Legendado" },
      { time: "24:00", subs: "Legendado" },
    ],
    commuteInfo: cinema.commuteInfo || {
      bestRoute: { time: "40 minutos", transportation: "bi-bus-front" },
      shortestDistance: "12 km",
    },
  })).filter((cinema) => {
    const selectedDistanceInKm = parseFloat(selectedDistance);
    const cinemaDistanceInKm = parseFloat(cinema.commuteInfo?.shortestDistance?.replace(' km', ''));
    return cinemaDistanceInKm <= selectedDistanceInKm;
  });;

  return (
    <div className="d-flex flex-column h-100 w-100">
      <div className="bg-ac-red text-center d-flex flex-column">
        <Navbar />
        <div className="container">
          <h1 className="text-white">Cinemas exibindo <em>{movie}</em></h1>
        </div>
        <div className="d-flex flex-row justify-content-center my-3" style={{ gap: '100px' }}>
          <FilterSelector
            placeholder="Distância máxima"
            options={distanceOptions}
            onOptionSelect={setSelectedDistance} />
        </div>
      </div>
      <div className="bg-ac-black text center d-flex flex-column h-100">
        {enhancedCinemas.length > 0 ? (
          enhancedCinemas.map((cinema, index) => (
            <CinemaCard className="cinema-card"
              key={index}
              name={cinema.name}
              location={cinema.location!}
              price={cinema.price!}
              address={cinema.address!}
              schedule={cinema.schedule!}
              commuteInfo={cinema.commuteInfo!}
            />
          ))
        ) : (
          <div className="d-flex align-items-center justify-content-center h-100">
            <h3 className="text-white">Nenhum cinema encontrado para a distância selecionada.</h3>
          </div>
        )}
        <div className="space"></div>
      </div>
    </div>
  )
}

export default CinemasPage;