import { useLocation } from "react-router-dom";

import { CinemaType } from "@/types/cinema";
import axios from "@/services/axiosInstance";

import CinemaCard from "@/pages/cinemas/CinemaCard";
import FilterSelector from "@/components/layout/filter-selector/FilterSelector";
import Navbar from "@/components/layout/navbar/Navbar";
import { useState, useEffect } from "react";
import "./CinemasPage.css"

function CinemasPage() {
  const location = useLocation();
  const movieName = location.state?.movieName || '';
  const movieId: string = location.state?.movieId || '';

  const [cinemas, setCinemas] = useState<CinemaType[]>([]);
  const [message, setMessage] = useState<string>('');
  let responseData: string[] = [];

  useEffect(() => {
    const fetchCinemas = async () => {
      try {
        setMessage('Carregando filmes...');
        const response = await axios.get(`/movie/${movieId}/available-cinemas`);
        responseData = response.data["available-cinemas"];

        // Convert the string cinemas array to a mocked array of CinemaType 
        const enhancedCinemasMocked: CinemaType[] = responseData.map((cinema) => ({
          name: cinema
            .split('-')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' '),
          latitude: "0.0000", 
          longitude: "0.0000", 
          location: "Shopping Iguatemi", 
          price: "R$29,99", 
          address: {
            home: { street: "Av. minha rua, 123", city: "Osasco, São Paulo" },
            destination: { street: "Av. Paulista, 1234", city: "São Paulo, São Paulo" },
          },
          schedule: [
            { time: "12:30", subs: "Dublado" },
            { time: "21:30", subs: "Legendado" },
            { time: "24:00", subs: "Legendado" },
          ],
          commuteInfo: {
            bestRoute: { time: "40 minutos", transportation: "Ônibus" },
            shortestDistance: "12 km",
          },
        }));
        setCinemas(enhancedCinemasMocked as CinemaType[]);
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
    const cinemaDistanceInKm = parseFloat(cinema.commuteInfo?.shortestDistance?.replace(' km', ''));
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
            filteredCinemas.map((cinema, index) => (
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