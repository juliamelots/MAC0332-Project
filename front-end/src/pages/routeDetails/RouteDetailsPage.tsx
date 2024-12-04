import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "@/services/axiosInstance";

import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import * as L from "leaflet";
import "leaflet-routing-machine";
import 'leaflet.utm';
import proj4 from 'proj4';

import { getCoordinatesLatLon } from "@/utils/getCoordinatesLatLon";
import { AddressType, StopType } from "@/types/route";

import Navbar from "@/components/layout/navbar/Navbar";
import CinemaBox from "@/components/ui/cinema-box/CinemaBox";

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
    const [busStops, setBusStops] = useState<StopType[]>([]);

    const location = useLocation();
    const movieTitle: string = location.state?.movieTitle || '';
    const cinemaTitle: string = location.state?.cinemaTitle || '';
    const cinemaId: string = location.state?.cinemaId || '';
    const userLat: string = location.state?.latitude || '';
    const userLon: string = location.state?.longitude || '';
    const home: AddressType = location.state?.home || '';
    const destination: AddressType = location.state?.destination || '';

    const address1 = `${home.street} - ${home.city}, ${home.state}, Brasil`
    const address2 = `${destination.street} - ${destination.city}, São Paulo, Brasil`

    const [mockCinemaData, setMockCinemaData] = useState<any>(null);  // Estado para armazenar os dados

    useEffect(() => {
        const fetchBusStops = async () => {
            try {
                const utmCoords = L.latLng(parseFloat(userLat), parseFloat(userLon)).utm();

                const response = await axios.get(`/route`, {
                    params: {
                        "user-latitude": utmCoords.x,
                        "user-longitude": utmCoords.y,
                        "cinema": cinemaId,
                    },
                });

                const fetchedStops: StopType[] = response.data[0].stops.map((stop: any, index: number) => {
                    const stopUtm = L.utm({
                        x: parseFloat(stop.longitude), // Coordenada UTM X (Easting)
                        y: parseFloat(stop.latitude),  // Coordenada UTM Y (Northing)
                        zone: utmCoords.zone, // Mesma zona do usuário
                        band: utmCoords.band, // Mesma banda do usuário
                        southHemi: utmCoords.band < 'N', // Define se está no hemisfério sul
                    });

                    return {
                        id: index + 1,
                        name: stop.name,
                        coordinates: [stopUtm.x, stopUtm.y], // Coordenadas convertidas
                        type: stop.type,
                        line: stop.line,
                    };
                });
    
                setBusStops(fetchedStops);
            } catch (err) {
                console.error(err);
            }
        };
        fetchBusStops();
    }, []);

    const mockData = () => {

        const mockCinemaData = {
            movieName: movieTitle,
            cinemaName: cinemaTitle,
            address: {
                home: { street: home.street, city: home.city },
                destination: { street: destination.street, city: destination.city },
            },
            priceTicket: "15.00",
            priceTransportation: "7.00",
            commuteInfo: {
                bestRoute: { time: "40 minutos", transportation: "Ônibus" },
                shortestDistance: "12 km",
            },
        };

        return mockCinemaData;
    }

    useEffect(() => {
        const data = mockData();
        setMockCinemaData(data);
    }, []);


    const mapIcon = L.icon({
        iconUrl: '/map-icon.svg',
        iconSize: [20, 20],
        iconAnchor: [10, 20],
        popupAnchor: [0, -20],
    });

    const fetchAndRenderMap = async () => {
        if (!map) {
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
    }

    const goToStop = (coordinates: L.LatLngTuple) => {
        if (map) {
            map.setView(coordinates, 24);
        }
    };

    useEffect(() => {
        fetchAndRenderMap();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="relative" style={{ display: "flex", height: "100vh" }}>
                <div className="relative w-1/3">
                    <CinemaBox
                        {...mockCinemaData}
                        busStops={busStops}
                        goToStop={goToStop}
                    />
                </div>
                <div id="map-container" style={{ flex: 1 }}></div>
            </div>
        </div>
    )
}

export default RouteDetailsPage;