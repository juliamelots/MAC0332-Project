import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import { CinemaType } from "@/types/cinema";
import { UserLocationType } from "@/types/geolocation";
import { AddressType } from "@/types/route";
import { getAddress } from "@/utils/getAddress";
import axios from "@/services/axiosInstance";

import CinemaCard from "@/pages/cinemas/CinemaCard";
import FilterSelector from "@/components/layout/filter-selector/FilterSelector";
import Navbar from "@/components/layout/navbar/Navbar";
import { convertToCinemaType } from "@/utils/convertToCinemaType";

import "./CinemasPage.css"


function CinemasPage() {
  const location = useLocation();
  const movieName: string = location.state?.movieName || '';
  const movieId: string = location.state?.movieId || '';
  const userLocation: UserLocationType = location.state?.userLocation || {};

  const [cinemas, setCinemas] = useState<CinemaType[]>([]);
  const [message, setMessage] = useState<string>('');
  const [isAddressLoading, setIsAddressLoading] = useState(false);
  const [userAddress, setUserAddress] = useState<AddressType>({
    street: '',
    city: '',
    state: '',
  });
  let cinemaIdsData: string[] = [];

  useEffect(() => {
    const fetchUserAddress = async () => {
      try {
        if (userLocation) {
          setIsAddressLoading(true); // Inicia o carregamento
          const address = await getAddress(userLocation?.latitude, userLocation?.longitude);

          if (address) {
            setUserAddress({
              street: address.road || "Desconhecido",
              city: address.city || "Desconhecido",
              state: address.state || "Desconhecido"
            });
          }
        }
      } catch (error) {
        console.error("Erro ao carregar endereço do usuário:", error);
      } finally {
        setIsAddressLoading(false); // Finaliza o carregamento
      }
    };

    if (userLocation) {
      fetchUserAddress();
    }
  }, [userLocation]);

  useEffect(() => {
    const fetchCinemas = async () => {
      try {
        setMessage('Carregando cinemas...');
        const cinemaIds = await axios.get(`/movie/${movieId}/available-cinemas`);
        cinemaIdsData = cinemaIds.data["available-cinemas"];

        const cinemaPromises = cinemaIdsData.map(async (cinema) => {
          const cinemaAddressResponse = await axios.get(`/cinema/${cinema}/address`);
          const cinemaSessionsResponse = await axios.get(`/cinema/${cinema}/${movieId}/sessions`);

          const cinemaType = userLocation ? convertToCinemaType(
            movieName,
            cinema,
            cinemaAddressResponse.data.address,
            cinemaSessionsResponse.data["movie sessions"],
            userAddress,
            userLocation.latitude,  
            userLocation.longitude  
        ) : null;

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

    if (!isAddressLoading && userAddress) {
      fetchCinemas();
    }
  }, [isAddressLoading, userAddress, movieId, movieName]);

  const distanceOptions = ["5 km", "10 km", "15 km", "20 km"];

  const [selectedDistance, setSelectedDistance] = useState("100 km");

  const filteredCinemas = cinemas.filter((cinema) => {
    const selectedDistanceInKm = parseFloat(selectedDistance);
    const cinemaDistanceInKm = cinema.commuteInfo?.shortestDistance
      ? parseFloat(cinema.commuteInfo.shortestDistance.replace(' km', ''))
      : 0;

    return cinemaDistanceInKm <= selectedDistanceInKm;
  });

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
            filteredCinemas.map((cinema, idx) => (
              <CinemaCard key={idx} cinema={cinema} />
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