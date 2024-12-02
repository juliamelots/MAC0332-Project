import { useState } from "react";

import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import * as L from "leaflet";
import "leaflet-routing-machine";

import { getCoordinatesLatLon } from "@/utils/getCoordinatesLatLon";
import { BusStopType } from "@/types/route";

import Navbar from "@/components/layout/navbar/Navbar";
import Sidebar from "./Sidebar";
import CinemaBox from "@/components/ui/cinema-box/CinemaBox";

const busStops: BusStopType[] = [
    { id: 1, name: "Av. Paulista", coordinates: [-23.564250, -46.6530000] },
    { id: 2, name: "Av. Paulista", coordinates: [-23.561250, -46.6565000] },
    { id: 3, name: "Rua Augusta", coordinates: [-23.558000, -46.6600000] },
    { id: 4, name: "Rua da Consolação", coordinates: [-23.556000, -46.6630000] },
    { id: 5, name: "Av. Rebouças", coordinates: [-23.558000, -46.6670000] },
    { id: 6, name: "Av. Rebouças", coordinates: [-23.558800, -46.6690000] },
    { id: 7, name: "Alameda Lorena", coordinates: [-23.560000, -46.6700000] },
    { id: 8, name: "Av. Rebouças", coordinates: [-23.565100, -46.6800000] },
    { id: 9, name: "Rua Capitão Antônio Rosa", coordinates: [-23.568000, -46.6840000] },
    { id: 10, name: "Rua Maria Carolina", coordinates: [-23.570000, -46.6880000] },
    { id: 11, name: "Av. Eusébio Matoso", coordinates: [-23.571000, -46.6920000] },
    { id: 12, name: "Av. Eusébio Matoso", coordinates: [-23.572080, -46.6990000] },
    { id: 13, name: "USP", coordinates: [-23.572080, -46.7050000] },
    { id: 14, name: "Av. Vital Brasil", coordinates: [-23.571092, -46.7098000] },
];

const mockCinemaData = {
    movieName: "Titanic",
    cinemaName: "Cinemark Shopping Iguatemi",
    address: {
        home: { street: "Av. Minha Rua", city: "São Paulo, São Paulo" },
        destination: { street: "Av. Paulista 789", city: "São Paulo, São Paulo" },
    },
    priceTicket: "15.00",
    priceTransportation: "7.00",
    commuteInfo: {
        bestRoute: { time: "40 minutos", transportation: "Ônibus" },
        shortestDistance: "12 km",
    },
};

const fetchRoute = async () => {
    const url = `http://router.project-osrm.org/route/v1/driving/-46.653000,-23.564250;-46.656500,-23.561250;-46.660000,-23.558000;-46.663000,-23.556000;-46.667000,-23.558000;-46.669000,-23.558800;-46.670000,-23.560000;-46.680000,-23.565100;-46.684000,-23.568000;-46.688000,-23.570000;-46.692000,-23.571000;-46.699000,-23.572080;-46.705000,-23.572080;-46.709800,-23.571092?overview=full&geometries=geojson`;
    const response = await fetch(url);
    const data = await response.json();
    return data.routes[0].geometry;
};

const addRouteToMap = async (map: L.Map) => {
    const geometry = await fetchRoute();

    L.geoJSON(geometry, {
        style: {
            color: "#3F3F3F",
            weight: 5,
        },
    }).addTo(map);
};

const RouteDetailsPage = () => {
    const [map, setMap] = useState<L.Map | null>(null);
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const address1 = "Avenida paulista - Bela Vista, São Paulo, Brasil";
    const address2 = "Avenida Vital Brasil - Butantã, São Paulo, Brasil";

    const mapIcon = L.icon({
        iconUrl: '/map-icon.svg',
        iconSize: [20, 20],
        iconAnchor: [10, 20],
        popupAnchor: [0, -20],
    });

    const toggleSidebar = () => {
        setSidebarVisible((prev) => !prev);
    };

    const fetchAndRenderMap = async () => {
        const coord1 = await getCoordinatesLatLon(address1);
        const coord2 = await getCoordinatesLatLon(address2);

        // Inicializar o mapa no contêiner com ID "map-container"
        const map = L.map("map-container").setView([coord1.lat, coord1.lon], 13);
        setMap(map);

        L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        busStops.forEach((stop) => {
            L.marker(stop.coordinates, { icon: mapIcon })
                .bindPopup(`<b>${stop.name}</b>`)
                .addTo(map)
                .on("click", () => {
                    map.setView(stop.coordinates, 48);
                });
        });

        addRouteToMap(map);

        return () => {
            map.remove();
        };
    }

    const goToStop = (coordinates: L.LatLngTuple) => {
        if (map) {
            map.setView(coordinates, 24);
        }
    };

    return (
        <div>
            <Navbar />
            <div style={{ display: "flex", height: "100vh" }}>
                <CinemaBox
                    {...mockCinemaData}
                    onVisualizeStops={toggleSidebar} />
                {sidebarVisible && (
                    <Sidebar
                        busStops={busStops}
                        onLoadMap={fetchAndRenderMap}
                        onStopClick={goToStop}
                    />
                )}
                <div id="map-container" style={{ flex: 1 }}></div>
            </div>
        </div>
    )
}

export default RouteDetailsPage;