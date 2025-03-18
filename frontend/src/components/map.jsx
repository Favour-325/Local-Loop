import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

const customIcon = new Icon({
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

function Map({ onLocationSelect }) {
    if (typeof window === "undefined") return null;

    const [position, setPosition] = useState({ 
        lat: 4.0511, 
        lng: 9.7679 
    });

    const handleDragEnd = (event) => {
        const newLat = event.target.getLatLng().lat;
        const newLng = event.target.getLatLng().lng;
        setPosition({ lat: newLat, lng: newLng });

        if (onLocationSelect) {
            onLocationSelect({ lat: newLat, lng: newLng });
        }
    };

    return (
        <div style={{ position: "relative", height: "400px", width: "100%" }}>
            <MapContainer center={position} zoom={13} style={{ height: "100%", width: "100%" }}>
                <TileLayer 
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker 
                position={position} 
                draggable={true} 
                eventHandlers={{ dragend: handleDragEnd }}
                icon={customIcon}
                >
                    <Popup>Drag me to select a location</Popup>
                </Marker>
                <MapUpdater position={position} />
            </MapContainer>
        </div>
    );
}

// Ensures map updates when state changes
function MapUpdater({ position }) {
    const map = useMap();
    useEffect(() => {
        map.setView(position);
        map.invalidateSize();
    }, [position, map]);
    return null;
}

export default Map;