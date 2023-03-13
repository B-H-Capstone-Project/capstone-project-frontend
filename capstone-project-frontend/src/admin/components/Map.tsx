import { useState, useEffect } from "react";
import {
  GoogleMap,
  InfoWindow,
  MarkerF,
  useLoadScript,
} from "@react-google-maps/api";
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

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

const containerStyle = {
  width: "1200px",
  height: "400px",
};

const center = {
  lat: 51.0447,
  lng: -114.0719,
};

function Map() {
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    const fetchAllAddresses = async () => {
      try {
        const res = await axios.get("http://localhost:8080/reservations");
        setAddresses(res.data.reservations);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllAddresses();
  }, []);
  // axios
  //   .get("http://localhost:8080/reservations")
  //   .then((res) => setAddresses(res.data.reservations))
  //   .catch((err) => console.log(err));
  //   console.log(JSON.stringify())
  // }, []);

  const [markers, setMarkers] = useState<MarkerProps[]>([]);

  useEffect(() => {
    const promises = addresses.map((address) =>
      axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
        params: {
          address: address,
          key: "AIzaSyDa4ZNjAcA6NEACcDSrpXbt2IY7Bz6cNI4",
        },
      })
    );
    console.log("promises: " + JSON.stringify(promises));

    Promise.all(promises)
      .then((responses) => {
        const results: any = responses.map(
          (response) => response.data.results[0]
        );
        console.log("results: " + results);

        const newMarkers: any = results.map((result: any) => ({
          lat: result.geometry.location.lat,
          lng: result.geometry.location.lng,
          address: result.formatted_address,
        }));
        console.log("newMarkers: " + newMarkers);
        setMarkers(newMarkers);
      })
      .catch((err) => console.log(err));
  }, [addresses]);

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={10}
      center={center}
      options={options}
    >
      {markers.map((marker: MarkerProps) => (
        // <MarkerF key={marker.address} position={{ lat:any : marker.lat, lng: marker.lng }} />
        <MarkerF
          key={marker.address}
          position={{ lat: marker.lat, lng: marker.lng }}
        />
      ))}
    </GoogleMap>
  );
}

export default Map;
