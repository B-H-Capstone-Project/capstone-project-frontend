import { useState } from "react";
import { GoogleMap, MarkerF, InfoWindow } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "80vw",
  height: "60vh",
  borderRadius: "20px",
};

const markerOptions: any = {
  icon: {
    path: "M-20,0a20,20 0 1,0 40,0a20,20 0 1,0 -40,0",
    fillColor: "green",
    fillOpacity: 0.8,
    strokeColor: "white",
    strokeWeight: 2,
    scale: 0.5,
  },
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
  styles: [
    {
      featureType: "administrative",
      elementType: "all",
      stylers: [
        {
          saturation: "-100",
        },
      ],
    },
    {
      featureType: "administrative.province",
      elementType: "all",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "landscape",
      elementType: "all",
      stylers: [
        {
          saturation: -100,
        },
        {
          lightness: 65,
        },
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "all",
      stylers: [
        {
          saturation: -100,
        },
        {
          lightness: "50",
        },
        {
          visibility: "simplified",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "all",
      stylers: [
        {
          saturation: "-100",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "all",
      stylers: [
        {
          visibility: "simplified",
        },
      ],
    },
    {
      featureType: "road.arterial",
      elementType: "all",
      stylers: [
        {
          lightness: "30",
        },
      ],
    },
    {
      featureType: "road.local",
      elementType: "all",
      stylers: [
        {
          lightness: "40",
        },
      ],
    },
    {
      featureType: "transit",
      elementType: "all",
      stylers: [
        {
          saturation: -100,
        },
        {
          visibility: "simplified",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [
        {
          hue: "#ffff00",
        },
        {
          lightness: -25,
        },
        {
          saturation: -97,
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels",
      stylers: [
        {
          lightness: -25,
        },
        {
          saturation: -100,
        },
      ],
    },
  ],
};

const center = {
  lat: 51.0447,
  lng: -114.0719,
};

const markers = [
  {
    id: 1,
    name: "Hyunju Lee",
    type: "Outdoor Lighting",
    date: "2023-04-14",
    position: { lat: 51.04811, lng: -114.08249 },
  },
  {
    id: 2,
    name: "Seoyoung Hwang",
    type: "Commercial",
    date: "2023-04-15",
    position: { lat: 51.06667, lng: -114.08989 },
  },
  {
    id: 3,
    name: "Dominik Bueckert",
    type: "Service",
    date: "2023-04-16",
    position: { lat: 51.04955, lng: -114.07934 },
  },
  {
    id: 4,
    name: "Seoyoung Hwang",
    type: "Service",
    date: "2023-04-16",
    position: { lat: 51.014870, lng: -114.150870 },
  },
  {
    id: 5,
    name: "Lisa Chen",
    type: "Service",
    date: "2023-04-16",
    position: { lat: 51.002880, lng: -114.129090 },
  }

];

function Map() {
  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (marker: any) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const handleCloseInfoWindow = () => {
    setActiveMarker(null);
  };

  const handleOnLoad = (map: any) => {
    const bounds = new google.maps.LatLngBounds();
    markers.forEach(({ position }) => bounds.extend(position));
    map.fitBounds(bounds);
  };

  return (
    <>
      <GoogleMap
        onLoad={handleOnLoad}
        // onClick={() => setActiveMarker(null)}
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={10}
        options={options}
      >
        {markers.map(({ id, name, type, date, position }) => (
          <MarkerF
            key={id}
            options={markerOptions}
            position={position}
            onClick={() => handleActiveMarker(id)}
          >
            {activeMarker === id && (
              // <InfoWindow onCloseClick={() => setActiveMarker(null)}>
              <InfoWindow onCloseClick={handleCloseInfoWindow}>
                <>
                  <span><strong>{name}</strong></span>
                  <br />

                  <span>{date}</span>
                  <br />
                  <span>{type}</span>
                  <br />
                </>
              </InfoWindow>
            )}
          </MarkerF>
        ))}
      </GoogleMap>
    </>
  );
}

export default Map;
