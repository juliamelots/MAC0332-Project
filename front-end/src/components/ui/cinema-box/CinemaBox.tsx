import { useState } from 'react';
import './CinemaBox.css';
import { BusStopType } from '@/types/route';
import BusStopContent from '@/pages/routeDetails/BusStopContent';

interface CinemaBoxProps {
  movieName: string;
  cinemaName: string;
  address: {
    home: { street: string; city: string };
    destination: { street: string; city: string };
  }; 
  priceTicket: string;
  priceTransportation: string;
  commuteInfo: {
    bestRoute: { time: string; transportation: string };
    shortestDistance: string;
  }; 
  busStops: BusStopType[];
  goToStop: (coordinates: L.LatLngTuple) => void;
}

const CinemaBox = ({
  movieName,
  cinemaName,
  address,
  priceTicket,
  priceTransportation,
  commuteInfo,
  busStops,
  goToStop,
}: CinemaBoxProps) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible((prev) => !prev);
  };

  return (
    <div className="blur-background bg-white">
      <div
        className="card info-card shadow p-4 bg-white rounded"
      >
        <div className="text-start mb-3">
          <button className="btn btn-link text-decoration-none text-secondary">
            <i className="bi bi-arrow-left-square p-2"></i>
            <span>Voltar</span>
          </button>    
        </div>
        <h2 className="card-title text-center mb-4">{movieName}</h2>

        <div className="card-body">
          <h5 className="fw-bold text-center mb-4">{cinemaName}</h5>

          {address && (
            <>
              <div className="mb-4">
                <div className="d-flex align-items-center">
                  <i className="bi bi-circle-fill home-address-icon icon-bg-grey"></i>
                  <span className="text-muted ms-2">{address.home.street}</span>
                </div>
                <p className="text-muted ms-4">{address.home.city}</p>
              </div>
              <div className="relative">
                <button 
                  className="btn btn-outline-secondary btn-sm w-100 mb-3"
                  onClick={toggleSidebar} 
                >
                  Visualizar paradas
                </button>
                  {sidebarVisible && (
                      <div className="absolute left-0 top-full w-full bg-gray-900">
                          <BusStopContent busStops={busStops} onStopClick={goToStop} />
                      </div>
                  )}
              </div>

              <div className="mb-4">
                <div className="d-flex align-items-center">
                  <i className="bi bi-geo-alt-fill destination-address-icon icon-bg-red"></i>
                  <span className="text-muted ms-2">{address.destination.street}</span>
                </div>
                <p className="text-muted ms-4">{address.destination.city}</p>
              </div>
            </>
          )}

          <div className="mb-4">
            <i className="bi bi-cash generic-info-icon icon-bg-purple"></i>
            <span className="text-muted ms-2"><b>Preço do ingresso:</b> R$ {priceTicket}</span>
          </div>

          {commuteInfo && (
            <>
              <div className="mb-4">
                <i className="bi bi-clock generic-info-icon icon-bg-purple"></i>
                <span className="text-muted ms-2"><b>Melhor trajeto:</b> {commuteInfo.bestRoute.time}</span>
              </div>

              <div className="mb-4">
                <i className="bi bi-arrows-move generic-info-icon icon-bg-purple"></i>
                <span className="text-muted ms-2"><b>Menor distância:</b> {commuteInfo.shortestDistance}</span>
              </div>
            </>
          )}

          <div className="mb-4">
            <i className="bi bi-bus-front generic-info-icon icon-bg-purple"></i>
            <span className="text-muted ms-2"><b>Preço transporte:</b> R$ {priceTransportation}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CinemaBox;
