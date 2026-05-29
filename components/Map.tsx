"use client";

import React from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/marker-icon-2x.png",
  iconUrl: "/marker-icon.png",
  shadowUrl: "/marker-shadow.png",
});

type MapProps = {
  latitude: number;
  longitude: number;
};

export default function Map({ latitude, longitude }: MapProps) {
  return (
    <div className="h-125 w-full rounded-xl overflow-hidden">
        <MapContainer 
        className="h-full w-full"
        center={[latitude, longitude]}
        scrollWheelZoom={true}
        zoom={13}
        >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[latitude, longitude]}>
          <Popup>
            You are here!
          </Popup>
        </Marker>
        </MapContainer>
    </div>
  )
}
