import React from 'react';
import * as L from "leaflet";
import { BusStopType } from "@/types/route";

interface SidebarProps {
    busStops: BusStopType[];
    onLoadMap: () => void;
    onStopClick: (coordinates: L.LatLngTuple) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ busStops, onLoadMap, onStopClick }) => {
    return (
        <div className="w-64 bg-gray-900 p-4 overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4 text-gray-500">Título</h2>
            <button 
                onClick={onLoadMap}
                className="w-full text-gray-900 font-bold py-2 px-4 rounded mb-4"
            >
                Carregar mapa
            </button>
            <h3 className="text-xl font-semibold mb-2 text-gray-500">Paradas</h3>
            <ul>
                {busStops.map((stop) => (
                    <li
                        key={stop.id}
                        style={{ cursor: "pointer" }}
                        className="py-2 px-3"
                        onClick={() => onStopClick(stop.coordinates)}
                    >
                        {stop.name}
                    </li>
                ))}
            </ul>
        </div>
    )
};

export default Sidebar;

