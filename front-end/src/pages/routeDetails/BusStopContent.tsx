import React from 'react';
import * as L from "leaflet";
import { BusStopType } from "@/types/route";
import './BusStopContent.css';

interface BusStopProps {
    busStops: BusStopType[];
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
                        <div className='bus-stop-point'/>
                        <span className='font-bold text-gray-500'>{stop.name}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
};

export default BusStopContent;

