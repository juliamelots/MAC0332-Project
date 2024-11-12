import "./CinemaCard.css";

interface CinemaCardProps {
  name: string;
  location: string;
  price: string;
  address: {
    home: { street: string; city: string };
    destination: { street: string; city: string };
  };
  schedule: { time: string; subs: string }[];
  commuteInfo: {
    bestRoute: { time: string; transportation: string };
    shortestDistance: string;
  };
}

const CinemaCard = ({
  name,
  location,
  price,
  address,
  schedule,
  commuteInfo,
}: CinemaCardProps) => {
  return (
    <div className="card my-4 p-4 card-container">
      <div className="d-flex flex-row justify-content-between">
        <div>
          <h5 className="text-dark">{name}</h5>
          <p className="text-muted">{location}</p>
        </div>
        <div className="d-flex flex-column my-1">
          <div className="d-flex align-items-center">
            <i class="bi bi-ticket-detailed generic-info-icon"></i>
            <span className="text-muted ms-3">Preço</span>
          </div>
          <div>
            <h6 className="text-dark ms-5">{price}</h6>
          </div>
        </div>
      </div>

      {/* Addresses info */}
      <div className="d-flex flex-row">
        {/* Left column for location info */}
        <div className="flex-grow-1">
          <div className="d-flex align-items-center my-1">
            <i class="bi bi-circle-fill home-address-icon"></i>
            <span className="text-muted ms-3">{address.home.street}</span>
          </div>
          <div>
            <p className="text-muted ms-5">{address.home.city}</p>
          </div>
          <div className="d-flex align-items-center my-1">
            <i class="bi bi-geo-alt-fill destination-address-icon"></i>
            <span className="text-muted ms-3">{address.destination.street}</span>
          </div>
          <div>
            <p className="text-muted ms-5">{address.destination.city}</p>
          </div>
        </div>

        {/* Right column for subs info */}
        <div className="">
          <div className="text-end my-1">
            <p className="text-muted mb-1">Legendado</p>
            <div className="d-flex gap-2">
              {schedule
                .filter((item) => item.subs === "Legendado")
                .map((item, index) => (
                  <span key={index} className="badge bg-light text-dark">
                    {item.time}
                  </span>
                ))}
            </div>
          </div>
          <div className="text-end my-4">
            <p className="text-muted mb-1">Dublado</p>
            <div className="d-flex gap-2">
              {schedule
                .filter((item) => item.subs === "Dublado")
                .map((item, index) => (
                  <span key={index} className="badge bg-light text-dark">
                    {item.time}
                  </span>
                ))}
            </div>
          </div>
        </div>

      </div>

      {/* Generic details: commuting time, smallest distance etc. */}
      <div className="d-flex justify-content-start my-3" style={{ gap: '80px' }}>
        <div className="d-flex flex-column">
          <div className="d-flex align-items-center my-1">
            <i class="bi bi-clock-fill generic-info-icon"></i>
            <span className="text-muted ms-3">Melhor trajeto</span>
            <span className="ms-3"><i class="bi bi-bus-front transportation-icon"></i></span>
          </div>
          <div>
            <h6 className="text-dark ms-5">{commuteInfo.bestRoute.time}</h6>
          </div>
        </div>
        <div className="d-flex flex-column">
          <div className="d-flex align-items-center my-1">
            <i class="bi bi-map generic-info-icon"></i>
            <span className="text-muted ms-3">Menor distância</span>
          </div>
          <div>
            <h6 className="text-dark ms-5">{commuteInfo.shortestDistance}</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CinemaCard;
