import React, { useState, useEffect } from "react";
import firebase, { db } from "../../firebase";
import { useHistory } from "react-router-dom";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const Map = () => {
  const defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  const [userLocation, setUserLocation] = useState({ lat: 0, lng: 0 });
  const [loading, setLoading] = useState("true");

  useEffect(() => {
    if (navigator.geolocation) console.log("it exists");

    navigator.geolocation.getCurrentPosition(
      pos => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        });
        console.log(pos.coords.latitude);
        console.log(pos.coords.longitude);

        setLoading(false);
      },
      err => {
        console.log(err.message);
      },
      { timeout: 10000, enableHighAccuracy: true, maximumAge: 75000 }
    );
  }, []);

  const history = useHistory();

  if (firebase.auth().currentUser === null) {
    history.push("/");
  }

  if (loading) return <div>Loading...</div>;

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyAJHUXHm2q7jMOk-ecp9itzQS_wrtKKuac" }}
        defaultCenter={userLocation}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent
          lat={userLocation.lat}
          lng={userLocation.lng}
          text="My Marker"
        />
      </GoogleMapReact>
    </div>
  );
};

export default Map;
