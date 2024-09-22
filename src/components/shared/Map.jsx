import React, { useState, useEffect } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Icon from './Icon';

// Custom Marker Icon
const customIcon = new L.Icon({
  iconUrl: require('../../assets/images/icons/mapMarker.png'),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Function to get city name using OpenStreetMap Nominatim API
export async function getCityName(lat, lng) {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
  );
  const data = await response.json();

  return data.address;
}

// A component to update the map view based on the position
function MapCenter({ position }) {
  const map = useMap();

  useEffect(() => {
    if (position && !isNaN(position.lat) && !isNaN(position.lng)) {
      map.setView([position.lat, position.lng], map.getZoom()); // Update map center
    }
  }, [map, position]);

  return null;
}

function LocationMarker({ setPosition, setCity, markerPosition, viewOnly }) {
  const [internalMarkerPosition, setInternalMarkerPosition] =
    useState(markerPosition);

  useMapEvents({
    click(e) {
      // Only allow updating the marker position if viewOnly is false
      if (!viewOnly) {
        const newMarkerPosition = e.latlng;
        setInternalMarkerPosition(newMarkerPosition);
        setPosition(newMarkerPosition);

        // Call the reverse geocoding function to get the city name
        getCityName(newMarkerPosition.lat, newMarkerPosition.lng).then(
          (response) => {
            setCity(response.city);
          }
        );
      }
    },
  });

  return internalMarkerPosition === null ? null : (
    <Marker position={internalMarkerPosition} icon={customIcon}></Marker>
  );
}

// Custom Detect Location Button as a Leaflet Control
function DetectLocationControl({ setDetectedPosition, setCity }) {
  const map = useMap();

  useEffect(() => {
    const detectLocationButton = L.control({ position: 'topright' });

    detectLocationButton.onAdd = function () {
      const button = L.DomUtil.create('button', 'detect-location-button');
      button.innerHTML = 'Detect';
      button.style.backgroundColor = '#fff';
      button.style.color = '#000';
      button.style.border = 'none';
      button.style.padding = '10px';
      button.style.borderRadius = '5px';
      button.style.cursor = 'pointer';
      button.style.zIndex = 50;
      button.setAttribute('type', 'button');
      button.onclick = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              const detectedPosition = {
                lat: latitude,
                lng: longitude,
              };

              // Set the map view to the detected location
              map.setView([latitude, longitude], 13);

              // Update the position state
              setDetectedPosition(detectedPosition);

              // Call the reverse geocoding function to get the city name
              getCityName(latitude, longitude).then((response) => {
                setCity(response.city);
              });
            },
            () => {
              alert('Allow Green Me to access your location');
            }
          );
        } else {
          alert('Geolocation is not supported by this browser.');
        }
      };

      return button;
    };

    detectLocationButton.addTo(map);

    // Clean up the control when the component is unmounted
    return () => {
      detectLocationButton.remove();
    };
  }, [map, setDetectedPosition, setCity]);

  return null;
}

export default function MapComponent({
  positionValue = null, // Expect lat and lng as numbers, not strings
  setProjectPosition,
  viewOnly = false, // New prop to make the map view-only
}) {
  const [position, setPosition] = useState(() => {
    const parsedLat = parseFloat(positionValue?.lat);
    const parsedLng = parseFloat(positionValue?.long);
    return !isNaN(parsedLat) && !isNaN(parsedLng)
      ? { lat: parsedLat, lng: parsedLng }
      : { lat: 51.505, lng: -0.09 }; // Default fallback coordinates
  });

  const [city, setCity] = useState(null);

  // Fetch city when position is initially set
  useEffect(() => {
    if (position && !isNaN(position.lat) && !isNaN(position.lng)) {
      getCityName(position.lat, position.lng).then((response) => {
        setCity(response.city);
      });
    }
  }, [position]);

  const handleSetPosition = (newPosition) => {
    setPosition(newPosition);
    if (setProjectPosition) {
      console.log(newPosition);
      setProjectPosition(newPosition);
    }
  };

  return (
    <div
      className="map-container"
      style={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        overflow: 'hidden',
      }}>
      <div
        className="map-header"
        style={{
          backgroundColor: '#2c7a7b',
          color: '#fff',
          padding: '10px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <span>Choose on Map</span>
      </div>

      <MapContainer
        center={position ? [position.lat, position.lng] : [51.505, -0.09]}
        zoom={13}
        style={{ height: '200px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapCenter position={position} />{' '}
        {/* Dynamically update the map center */}
        {/* Show the marker if there's a valid position */}
        <LocationMarker
          setPosition={handleSetPosition}
          setCity={setCity}
          markerPosition={position} // Pass position as initial marker position
          viewOnly={viewOnly} // Pass viewOnly to disable position changes
        />
        {/* Only show detect location control if viewOnly is false */}
        {!viewOnly && (
          <DetectLocationControl
            setDetectedPosition={handleSetPosition}
            setCity={setCity}
          />
        )}
      </MapContainer>
      <div
        className="bg-[#EBEBEB] flex items-center justify-between"
        style={{
          padding: '10px',
          backgroundColor: '#f7fafc',
          display: 'flex',
          alignItems: 'center',
        }}>
        <div className="flex items-center gap-2">
          <Icon name={'locationIcon'} />
          {position ? `Dropped pin: ${city ? `${city}` : ''}` : 'Dropped pin'}
        </div>
        <span>
          <Icon name={'arrow-right'} />
        </span>
      </div>
    </div>
  );
}
