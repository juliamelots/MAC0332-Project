import { CinemaType } from "@/types/cinema";
import { RouteDetailType } from "@/types/routes";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CinemaCard.css";

interface AddressInfoProps {
  icon: string;
  iconClass: string;
  street?: string;
  city?: string;
  state?: string;
}

interface ScheduleInfoProps {
  schedule: { time: string; subs: string }[];
}

interface CommuteInfoProps {
  icon: string;
  label: string;
  value: string;
  transportIcon?: string;
}

const CinemaCard = ({ cinema }: { cinema: CinemaType }) => {
  const navigate = useNavigate();
  const { cinemaName, location, address, schedule, commuteInfo } = cinema;
  const [selectedDate, setSelectedDate] = useState(null);

  const openPopup = (scheduleItem: any) => {
    setSelectedDate(scheduleItem);
  };

  const closePopup = () => {
    setSelectedDate(null);
  };

  const handleButtonClick = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();

    navigate(`/routedetails`, { 
      state: {
        home: address?.home,
        destination: address?.destination,
        cinemaTitle: cinemaName,
        movieTitle: cinema.movieName,
        latitude: cinema.latitude,
        longitude: cinema.longitude,
        cinemaId: cinema.cinemaId
      }, 
    });
  };

  return (
    <div className="card p-4 card-container bg-ac-white">
      <div className="d-flex justify-content-between mb-3">
        <div>
          <h5 className="text-dark">{cinemaName}</h5>
          <p className="text-muted">{location}</p>
        </div>
        <div>
          <button type="button" className="btn btn-outline-dark" onClick={handleButtonClick}>
            <i className="bi bi-plus-circle"></i>
          </button>
        </div>
      </div>

      {/* Addresses info */}
      <div className="d-flex flex-wrap mb-4">
        <div className="flex-grow-1 mb-3 mb-md-0">
          <AddressInfo
            icon="bi-circle-fill"
            iconClass="home-address-icon icon-bg-grey"
            street={address?.home.street}
            city={address?.home.city}
            state={address?.home.state}
          />
          <AddressInfo
            icon="bi-geo-alt-fill"
            iconClass="destination-address-icon icon-bg-red"
            street={address?.destination.street}
            city={address?.destination.city}
          />
        </div>
      </div>

      <div>
        <h6 className="text-dark mb-3">Datas das sessões</h6>
      </div>

      {/* Session dates grid */}
      <div className="dates-grid mb-4">
        {schedule.map((scheduleItem) => (
          <button
            key={scheduleItem.date}
            className="btn btn-ac-red-light"
            onClick={() => openPopup(scheduleItem)}
          >
            {scheduleItem.date}
          </button>
        ))}
      </div>

      {/* Popup modal */}
      {selectedDate && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <h5 className="mb-3 fs-6">{selectedDate.date}</h5>
            <ScheduleInfo schedule={selectedDate.sessions} />
            <button className="btn btn-ac-red mt-3 text-white" onClick={closePopup}>
              Fechar
            </button>
          </div>
        </div>
      )}

      {/* Commute Info */}
      <div className="d-flex flex-wrap">
        <div className="flex-grow-1 mb-3 mb-md-0">
          <CommuteInfo
            icon="bi-clock-fill"
            label="Melhor trajeto"
            value={commuteInfo.bestRoute.time}
            transportIcon="bi-bus-front"
          />
        </div>
        <div className="flex-grow-1">
          <CommuteInfo
            icon="bi-map"
            label="Menor distância"
            value={commuteInfo.shortestDistance}
          />
        </div>
      </div>
    </div>
  );
};

const AddressInfo = ({ icon, iconClass, street, city, state }: AddressInfoProps) => (
  <div className="mb-2">
    <div className="d-flex align-items-center">
      <i className={`bi ${icon} ${iconClass}`}></i>
      <span className="text-muted ms-3">{street}</span>
    </div>
    <p className="text-muted ms-5 mb-0">{city} - {state}</p>
  </div>
);

const ScheduleInfo = ({ schedule }: ScheduleInfoProps) => {
  return (
    <div>
      {['Legendado', 'Dublado'].map((type) => {
        const typeSchedule = schedule.filter(item => item.subs === type);
        return (
          <div key={type} className="schedule-type mb-3">
            <h6 className="text-dark fs-6">{type}</h6>
            <div className="schedule-scroll">
              {typeSchedule.length > 0 ? (
                typeSchedule.map((item, index) => (
                  <span key={index} className="badge bg-light text-dark me-2">
                    {item.time}
                  </span>
                ))
              ) : (
                <span className="text-muted">Nenhum horário disponível</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const CommuteInfo = ({ icon, label, value, transportIcon }: CommuteInfoProps) => (
  <div className="mb-2">
    <div className="d-flex align-items-center">
      <i className={`bi ${icon} generic-info-icon icon-bg-purple`}></i>
      <span className="text-muted ms-3">{label}</span>
      {transportIcon && (
        <span className="ms-3">
          <i className={`bi ${transportIcon} transportation-icon icon-bg-yellow`}></i>
        </span>
      )}
    </div>
    <h6 className="text-dark ms-5 mb-0">{value}</h6>
  </div>
);

export default CinemaCard;
