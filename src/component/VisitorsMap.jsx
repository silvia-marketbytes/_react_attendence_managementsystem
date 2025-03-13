// src/components/VisitorsMap.jsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS

const VisitorsMap = () => {
  return (
    <div style={{ height: '500px', width: '100%' }}> {/* Ensure the container has a defined height */}
      <MapContainer center={[51.505, -0.09]} zoom={2} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default VisitorsMap;
