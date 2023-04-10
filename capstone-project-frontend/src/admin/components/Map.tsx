import { useState, useEffect } from "react";
import { GoogleMap, MarkerF, InfoWindow } from "@react-google-maps/api";
import axios from "../../api/axios";

const mapContainerStyle = {
  width: "80vw",
  height: "60vh",
  borderRadius: '20px',
};
interface MarkerProps {
  address: string;
  lat: number;
  lng: number;
}

// interface MarkerDataProps {
//   address: string;
//   lat: number;
//   lng: number;
// }

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

function Map() {
  const [loading, setLoading] = useState<any>("...loading");
  const [activeMarker, setActiveMarker] = useState(null);
  // const [addresses, setAddresses] = useState([]);
  const [reservations, setReservations] = useState([]);

  const handleActiveMarker = (marker: any) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  useEffect(() => {
    const fetchAllAddresses = async () => {
      // try {
      // const res = await axios.get(// "http://localhost:8080/reservations/address");
      // const res = await axios.get("http://localhost:8080/reservations/map");
      // setAddresses(res.data);
      // setAddresses(res.data.newAddresses);
      // console.log(JSON.stringify(res.data));
      // console.log(JSON.stringify(res.data.newAddresses));
      // } catch (err) {
      // console.log(err);
      // }

      try {
        const res = await axios.get("/reservations/map");
        setReservations(res.data.reservations);
      } catch (err) {
        console.log(err);
      }
      setLoading(true);
    };
    fetchAllAddresses();
  }, []);

  const [markers, setMarkers] = useState<MarkerProps[]>([]);

  useEffect(() => {
    const newAddresses = reservations.map(
      (address: any) =>
        `${address.address_line1}, ${address.city}, ${address.province} ${address.postal_code}, ${address.country}`
    );
    // console.log("frontend: " + newAddresses);
    const promises = newAddresses.map((address) =>
      axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
        params: {
          address: address,
          key: "AIzaSyDa4ZNjAcA6NEACcDSrpXbt2IY7Bz6cNI4",
          // key: process.env.GOOGLE_MAPS_API_KEY
        },
      })
    );

    Promise.all(promises)
      .then((responses) => {
        const results: any = responses.map(
          (response) => response.data.results[0]
        );
        // console.log("frontend results: " + JSON.stringify(results));

        const newMarkers: any = results.map((result: any) => ({
          id: result.id,
          lat: result.geometry.location.lat,
          lng: result.geometry.location.lng,
          address: result.formatted_address,
          name: `${result.first_name} ${result.last_name}`,
          type: result.type,
          description: result.description,
          date: result.date,
        }));

        // console.log("newMarkers: " + JSON.stringify(newMarkers));
        setMarkers(newMarkers);
      })
      .catch((err) => console.log(err));
    // }, [addresses]);
  }, [reservations]);

  return loading && (
      <GoogleMap
        onClick={() => setActiveMarker(null)}
        mapContainerStyle={mapContainerStyle}
        // mapContainerClassName={classes.mapContainer}
        zoom={11}
        center={center}
        options={options}
      >
        {markers.map((marker: any) => (
          <MarkerF
            key={marker.address}
            position={{ lat: marker.lat, lng: marker.lng }}
            options={markerOptions}
          >
            {activeMarker === marker.id ? (
              <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                <div>hello</div>
                <div>{marker.name}</div>
              </InfoWindow>
            ) : null}
          </MarkerF>
        ))}
      </GoogleMap>
  );
}

export default Map;
