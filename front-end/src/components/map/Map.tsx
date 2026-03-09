import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import styles from "./Map.module.css";
import { Icon } from "leaflet";

// Custom icon for the markers
const customIcon = new Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  shadowSize: [41, 41],
});

export interface Hotel {
  id: number;
  name: string;
  position: [number, number];
  address: string;
}


interface MapProps {
  hotels: Hotel[];
  center: [number, number];
}

const Map: React.FC<MapProps> = ({ hotels, center }) => {
  return (
    <div className={styles.mapWrapper}>
      <MapContainer
        center={center}
        zoom={5}
        scrollWheelZoom={false}
        className={styles.mapContainer}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {hotels.map((hotel) => (
          <Marker key={hotel.id} position={hotel.position} icon={customIcon}>
            <Popup>{hotel.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
