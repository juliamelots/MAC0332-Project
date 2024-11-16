import { useParams, useLocation } from "react-router-dom";
import CinemaCard from "@/pages/cinemas/CinemaCard";
import FilterSelector from "@/components/layout/filter-selector/FilterSelector";
import Navbar from "@/components/layout/navbar/Navbar";
import { CinemaType } from "@/types/types";

function CinemasPage() {
  const location = useLocation();
  const { movie } = useParams<{ movie: string }>();
  const cinemas: CinemaType[] = location.state?.cinemas || []; 

  const distanceOptions = [
    { label: "5 km", value: "5" },
    { label: "10 km", value: "10" },
    { label: "20 km", value: "20" },
  ];

  const routeOptions = [
    { label: "Mais rápida", value: "fastest" },
    { label: "Mais curta", value: "shortest" },
  ];

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
  }));

  return (
    <div className="d-flex flex-column h-100 w-100">
      <div className="bg-ac-red text-center d-flex flex-column">
        <Navbar />
        <div className="container">
          <h1 className="text-white">Cinemas exibindo <em>{movie}</em></h1>
        </div>
        <div className="d-flex flex-row justify-content-center my-3" style={{ gap: '100px' }}>
          <FilterSelector placeholder="Distância máxima" options={distanceOptions} />
          <FilterSelector placeholder="Melhor rota" options={routeOptions} />
        </div>
      </div>
      <div className="bg-ac-black text center d-flex flex-column h-100">
        {enhancedCinemas.map((cinema, index) => (
          <CinemaCard
            key={index}
            name={cinema.name}
            location={cinema.location!}
            price={cinema.price!}
            address={cinema.address!}
            schedule={cinema.schedule!}
            commuteInfo={cinema.commuteInfo!}
          />
        ))}
      </div>
    </div>
  )
}

export default CinemasPage;