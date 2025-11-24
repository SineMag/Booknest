import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './Map.module.css';
import { Icon } from 'leaflet';

// Sample hotel data - replace with actual data from your application
const hotels = [
  { id: 1, name: 'Hotel Sunshine', position: [51.505, -0.09] as [number, number], address: '123 Sunshine Street, London' },
  { id: 2, name: 'The Grand Hotel', position: [51.51, -0.1] as [number, number], address: '456 Grand Avenue, London' },
  { id: 3, name: 'Seaside Resort', position: [51.515, -0.08] as [number, number], address: '789 Seaside Lane, London' },
];

// Custom icon for the markers
const customIcon = new Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41],
});

const Map = () => {
  const defaultPosition: [number, number] = [51.505, -0.09];

  return (
    <div className={styles.mapWrapper}>
      <MapContainer center={defaultPosition} zoom={13} scrollWheelZoom={false} className={styles.mapContainer}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {hotels.map(hotel => (
          <Marker key={hotel.id} position={hotel.position} icon={customIcon}>
            <Popup>
              {hotel.name}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <div className={styles.locationDetails}>
        <h2>Hotel Locations</h2>
        <ul>
          {hotels.map(hotel => (
            <li key={hotel.id}>
              <strong>{hotel.name}:</strong> {hotel.address}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Map;
