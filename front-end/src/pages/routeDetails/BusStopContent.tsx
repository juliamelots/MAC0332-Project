import React from 'react';
import * as L from "leaflet";
import { StopType } from "@/types/route";
import './BusStopContent.css';

interface BusStopProps {
    busStops: StopType[];
    onStopClick: (coordinates: L.LatLngTuple) => void;
}

const BusStopContent: React.FC<BusStopProps> = ({ busStops, onStopClick }) => {
    return (
        <div className="absolute w-full left-0 top-full">
            <ul className="list-none p-0">
                {busStops.map((stop) => (
                    <li
                        key={stop.id}
                        className="relative mb-2 py-2 bus-stop-item"
                        onClick={() => onStopClick(stop.coordinates)}
                    >
                        <div className="bus-stop-point w-4 h-4 bg-blue-500 rounded-full mt-1" />
                        <div className="ml-6">
                            <div className="text-lg font-semibold text-gray-700">{stop.name}</div>
                            <div className="text-sm text-gray-500">Linha: <span className="font-medium">{stop.line}</span></div>
                            <div className="text-sm text-gray-500">Tipo: <span className="font-medium">{stop.type.charAt(0).toUpperCase() + stop.type.slice(1).toLowerCase()}</span></div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
};

export default BusStopContent;

