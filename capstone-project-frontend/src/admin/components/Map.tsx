import { useState, useEffect } from "react";
import { GoogleMap, MarkerF, InfoWindow } from "@react-google-maps/api";
import axios from "axios";
import { NONAME } from "dns";

const libraries: any = ["places"];
const mapContainerStyle = {
  width: "1200px",
  height: "400px",
};
interface MarkerProps {
  address: string;
  lat: number;
  lng: number;
}

interface MarkerDataProps {
  address: string;
  lat: number;
  lng: number;
}
const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

// const containerStyle = {
//   width: "1200px",
//   height: "400px",
// };

const center = {
  lat: 51.0447,
  lng: -114.0719,
};

function Map() {
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
        const res = await axios.get("http://localhost:8080/reservations/map");
        setReservations(res.data.reservations);
      // console.log("--------------reservations data for google maps----------------------");
      // console.log(JSON.stringify(res.data.reservations));
      } catch (err) {
      console.log(err);
      }
    };
    fetchAllAddresses();
  }, []);

  const [markers, setMarkers] = useState<MarkerProps[]>([]);

  useEffect(() => {
    const newAddresses = reservations.map((address: any) => (
      `${address.address_line1}, ${address.city}, ${address.province} ${address.postal_code}, ${address.country}`
    ));
    // console.log("frontend: " + newAddresses);
    const promises = newAddresses.map((address) =>
      axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
        params: {
          address: address,
          key: "AIzaSyDa4ZNjAcA6NEACcDSrpXbt2IY7Bz6cNI4",
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

  return (
    <GoogleMap
      onClick={() => setActiveMarker(null)}
      mapContainerStyle={mapContainerStyle}
      zoom={10}
      center={center}
      options={options}
    >
      {markers.map((marker: any) => (
        <MarkerF
          key={marker.address}
          position={{ lat: marker.lat, lng: marker.lng }}
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