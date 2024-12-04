import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "@/services/axiosInstance";

import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import * as L from "leaflet";
import "leaflet-routing-machine";
import 'leaflet.utm';

import { getCoordinatesLatLon } from "@/utils/getCoordinatesLatLon";
import { AddressType, StopType } from "@/types/route";

import Navbar from "@/components/layout/navbar/Navbar";
import CinemaBox from "@/components/ui/cinema-box/CinemaBox";

const fetchRoute = async (coordinates: string) => {
    const url = `http://router.project-osrm.org/route/v1/driving/${coordinates}?overview=full&geometries=geojson`;
    const response = await fetch(url);
    const data = await response.json();
    return data.routes[0].geometry;
};

const addRouteToMap = async (map: L.Map, coordinates: string) => {
    const geometry = await fetchRoute(coordinates);
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

    const [mockCinemaData, setMockCinemaData] = useState<any>(null); // Estado para armazenar os dados

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
                        x: parseFloat(stop.latitude),
                        y: parseFloat(stop.longitude),
                        zone: utmCoords.zone,
                        band: utmCoords.band,
                        southHemi: true,
                    });

                    const stopLatLng = stopUtm.latLng();

                    return {
                        id: index + 1,
                        name: stop.name,
                        coordinates: [stopLatLng.lat, stopLatLng.lng] as L.LatLngTuple,
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
    }, [userLat, userLon, cinemaId]);

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
    };

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
        if (!map && busStops.length > 0) {
            const coord1 = await getCoordinatesLatLon(address1);
            const coord2 = await getCoordinatesLatLon(address2);

            // Inicializar o mapa no contêiner com ID "map-container"
            const mapInstance = L.map("map-container").setView([coord1.lat, coord1.lon], 13);
            setMap(mapInstance);

            L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(mapInstance);

            busStops.forEach((stop) => {
                L.marker(stop.coordinates, { icon: mapIcon })
                    .bindPopup(`<b>${stop.name}</b>`)
                    .addTo(mapInstance)
                    .on("click", () => {
                        mapInstance.setView(stop.coordinates, 18);
                    });
            });

            const route1 = `${coord1.lon},${coord1.lat};${busStops[0]?.coordinates[1]},${busStops[0]?.coordinates[0]}`;
            const route2 = `${busStops[busStops.length - 1]?.coordinates[1]},${busStops[busStops.length - 1]?.coordinates[0]};${coord2.lon},${coord2.lat}`; 

            await addRouteToMap(mapInstance, route1);
            await addRouteToMap(mapInstance, route2);
        }
    };

    const goToStop = (coordinates: L.LatLngTuple) => {
        if (map) {
            map.setView(coordinates, 24);
        }
    };

    useEffect(() => {
        if (busStops.length > 0) {
            fetchAndRenderMap();
        }
    }, [busStops]);
    
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
    );
};

export default RouteDetailsPage;
