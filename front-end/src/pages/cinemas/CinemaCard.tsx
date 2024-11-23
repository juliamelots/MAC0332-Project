import "./CinemaCard.css";
import { useState } from "react";

interface CinemaCardProps {
  name: string;
  location: string;
  address: {
    home: { street: string; city: string };
    destination: { street: string; city: string };
  };
  schedule: {
    date: string;
    sessions: { time: string; subs: string }[];
  }[];
  commuteInfo: {
    bestRoute: { time: string; transportation: string };
    shortestDistance: string;
  };
}

interface AddressInfoProps {
  icon: string;
  iconClass: string;
  street: string;
  city: string;
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

const CinemaCard = ({
  name,
  location,
  address,
  schedule,
  commuteInfo,
}: CinemaCardProps) => {
  const [expandedDate, setExpandedDate] = useState<string | null>(null);

  const toggleDateExpansion = (date: string) => {
    setExpandedDate((prev) => (prev === date ? null : date));
  };

  return (
    <div className="card p-4 card-container bg-ac-white">
      <div className="d-flex justify-content-between mb-3">
        <div>
          <h5 className="text-dark">{name}</h5>
          <p className="text-muted">{location}</p>
        </div>
        <div>
          <button type="button" className="btn btn-outline-dark">
            <i className="bi bi-plus-circle"></i>
          </button>
        </div>
      </div>

      <div className="d-flex flex-wrap mb-4">
        <div className="flex-grow-1 mb-3 mb-md-0">
          <AddressInfo
            icon="bi-circle-fill"
            iconClass="home-address-icon icon-bg-grey"
            street={address.home.street}
            city={address.home.city}
          />
          <AddressInfo
            icon="bi-geo-alt-fill"
            iconClass="destination-address-icon icon-bg-red"
            street={address.destination.street}
            city={address.destination.city}
          />
        </div>
      </div>

      <div className="dates-container">
        <h5 className="mb-3 fs-6">Datas das sessões</h5>
        {schedule.map((scheduleItem) => (
          <div key={scheduleItem.date} className="mb-3">
            <button
              className="btn btn-ac-red-light"
              onClick={() => toggleDateExpansion(scheduleItem.date)}
            >
              {scheduleItem.date}
            </button>
            {expandedDate === scheduleItem.date && (
              <div className="schedule-info mt-3">
                <ScheduleInfo schedule={scheduleItem.sessions} />
              </div>
            )}
          </div>
        ))}
      </div>

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

const AddressInfo = ({ icon, iconClass, street, city }: AddressInfoProps) => (
  <div className="mb-2">
    <div className="d-flex align-items-center">
      <i className={`bi ${icon} ${iconClass}`}></i>
      <span className="text-muted ms-3">{street}</span>
    </div>
    <p className="text-muted ms-5 mb-0">{city}</p>
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
