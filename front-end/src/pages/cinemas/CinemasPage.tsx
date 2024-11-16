import { useParams, useLocation } from "react-router-dom";

import { CinemaType, CinemasType } from "@/types/cinema";

import CinemaCard from "@/pages/cinemas/CinemaCard";
import FilterSelector from "@/components/layout/filter-selector/FilterSelector";
import Navbar from "@/components/layout/navbar/Navbar";

function CinemasPage() {
  const location = useLocation();
  const cinemas = location.state?.cinemas || [];
  const { movie } = useParams<{ movie: string }>();

  const distanceOptions = [
    { label: "5 km", value: "5" },
    { label: "10 km", value: "10" },
    { label: "20 km", value: "20" },
  ];

  const routeOptions = [
    { label: "Mais rápida", value: "fastest" },
    { label: "Mais curta", value: "shortest" },
  ];

  const cinemaMockData: CinemasType = {
    movie: movie || "",
    cinemas: [
      {
        name: "Cinemark",
        location: "Shopping Iguatemi",
        price: "R$29,99",
        address: {
          home: { street: "Av. minha rua, 123", city: "Osasco, São Paulo" },
          destination: { street: "Av. Paulista, 1234", city: "São Paulo, São Paulo" },
        },
        schedule: [
          { time: "12:30", subs: "Legendado" },
          { time: "21:30", subs: "Legendado" },
          { time: "24:00", subs: "Legendado" },
          { time: "12:30", subs: "Dublado" },
          { time: "21:30", subs: "Dublado" },
          { time: "24:00", subs: "Dublado" },
        ],
        commuteInfo: {
          bestRoute: { time: "40 minutos", transportation: "bi-bus-front" },
          shortestDistance: "12 km",
        },
      },
      {
        name: "Kinoplex",
        location: "Shopping Vila Olímpia",
        price: "R$25,50",
        address: {
          home: { street: "Rua dos Bobos, 0", city: "São Paulo, São Paulo" },
          destination: { street: "Av. Brigadeiro Faria Lima, 1234", city: "São Paulo, São Paulo" },
        },
        schedule: [
          { time: "10:00", subs: "Legendado" },
          { time: "15:00", subs: "Legendado" },
          { time: "20:00", subs: "Legendado" },
          { time: "11:00", subs: "Dublado" },
          { time: "16:00", subs: "Dublado" },
          { time: "22:00", subs: "Dublado" },
        ],
        commuteInfo: {
          bestRoute: { time: "30 minutos", transportation: "bi-train-front" },
          shortestDistance: "8 km",
        },
      },
    ]
  }

  return (
    <div className="d-flex flex-column ">
      <div className="bg-ac-red text-center d-flex flex-column">
        <Navbar />
        <div className="container">
          <h1 className="text-white">Cinemas exibindo <em>{cinemaMockData.movie}</em></h1>
        </div>
        <div className="d-flex flex-row justify-content-center my-3" style={{ gap: '100px' }}>
          <FilterSelector placeholder="Distância máxima" options={distanceOptions} />
          <FilterSelector placeholder="Melhor rota" options={routeOptions} />
        </div>
      </div>
      <div className="bg-ac-black text center d-flex flex-column">
        {cinemaMockData.cinemas.map((cinema, index) => (
          <CinemaCard
            key={index}
            name={cinema.name}
            location={cinema.location}
            price={cinema.price}
            address={cinema.address}
            schedule={cinema.schedule}
            commuteInfo={cinema.commuteInfo}
          />
        ))}
      </div>
    </div>
  )
}

export default CinemasPage;