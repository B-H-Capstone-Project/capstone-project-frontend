import { useState, useEffect } from "react";
import { GoogleMap, InfoWindow, MarkerF  } from "@react-google-maps/api";

const containerStyle = {
  width: "1200px",
  height: "400px",
};

const center = {
  lat: 51.0447,
  lng: -114.0719,
};

const markers = [
  {
    id: 1,
    name: "Hyunju, 천재 천재 천재 천재 천재 천재",
    position: { lat: 51.048110, lng: -114.082490 },
  },
  {
    id: 2,
    name: "SAIT",
    position: { lat: 51.066670, lng: -114.089890 },
  },
  {
    id: 3,
    name: "Dom, 바보 바보 바보 바보 바보 바보",
    position: { lat: 51.049550, lng: -114.079340 },
  },
];


// const { googleApiKey } = require('./config')
// const axios = require('axios')

// const geocodingQuery = (address:any, city:any) => {
  
//   const [user, setUser] = useState([]);
//   useEffect(() => {
//     const fetchNewEmployees = async () => {
//       try {
//         // New Employees
//         const resEmployee = await axios.get(
//           "http://localhost:8080/users/"
//         );
//         setUser(resEmployee.data.users);
//         const employeeCount = resEmployee.data.users.length;
//       } catch (err) {
//         console.log(err);
//       }
//     };
//   }, []);

//   const geocoderQuery = encodeURIComponent(${address} ${city}.replace(/ /g, '+'))
//   return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${geocoderQuery}&key=${googleApiKey}`)
//     .then(res => res.data)
//     .then(json => {
//       if (json.results.length === 0) {
//         return null
//       }
//       let lat = json.results['0'].geometry.location.lat
//       let lng = json.results['0'].geometry.location.lng
//       return {lat, lng}
//     })
// }

// module.exports = geocodingQuery

function Map() {
  const image =
    "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";

  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (marker: any) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const handleOnLoad = (map: any) => {
    const bounds = new google.maps.LatLngBounds();
    markers.forEach(({ position }) => bounds.extend(position));
    map.fitBounds(bounds);
  };

  // const { isLoaded } = useJsApiLoader({
  //   id: "google-map-script",
  //   googleMapsApiKey: "AIzaSyDa4ZNjAcA6NEACcDSrpXbt2IY7Bz6cNI4",
  // });

  // const [map, setMap] = React.useState<google.maps.Map | null>(null);

  // const onLoad = React.useCallback<any>(function callback(
  //   map: google.maps.Map
  // ) {
  //   const bounds = new window.google.maps.LatLngBounds(center);
  //   map.fitBounds(bounds);

  //   setMap(map);
  // },
  // []);

  // const onUnmount = React.useCallback(function callback(map: google.maps.Map) {
  //   setMap(null);
  // }, []);

  //   return isLoaded ? (
  //     <GoogleMap
  //       mapContainerStyle={containerStyle}
  //       center={center}
  //       zoom={10}
  //       onLoad={onLoad}
  //       onUnmount={onUnmount}
  //     ></GoogleMap>
  //   ) : null;
  // }

  return (
    <GoogleMap
      onLoad={handleOnLoad}
      onClick={() => setActiveMarker(null)}
      // mapContainerStyle={{ width: "100vw", height: "100vh" }}
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
    >
      {markers.map(({ id, name, position }) => (

        <MarkerF 
          key={id}
          position={position}
          onClick={() => handleActiveMarker(id)}
        >
          {activeMarker === id ? (
            <InfoWindow onCloseClick={() => setActiveMarker(null)}>
              <div>{name}</div>
            </InfoWindow>
          ) : null}
        </MarkerF>
      ))}
    </GoogleMap>
  );
}

// export default React.memo(Map);
export default Map;
