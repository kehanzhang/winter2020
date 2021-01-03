import React, { useState, useEffect, useContext } from "react";
import firebase, { db } from "../../firebase";
import { useHistory } from "react-router-dom";
import GoogleMapReact from "google-map-react";

import Marker from "../layout/Marker";
import { AuthContext } from "../Auth";

const Map = () => {
  const defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  const [userLocation, setUserLocation] = useState({ lat: 0, lng: 0 });
  const [othersLocations, setOthersLocations] = useState([]);
  const [loading, setLoading] = useState("true");
	const {currUser, profiles} = useContext(AuthContext)

  const getOthersLocations = async () => {
    let locArr = [];

    const query = await db.collection("profiles").get();

    query.forEach(doc => {
      locArr.push({
        lat: doc.data().location.latitude,
        lng: doc.data().location.longitude,
        id: doc.data().user
      });
    });

    setOthersLocations(locArr);
    setLoading(false);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async pos => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        });

        // Update current user's location in database

        const uid = firebase.auth().currentUser.uid;

        const query = await db
          .collection("profiles")
          .where("user", "==", uid)
          .get();

        const profileDoc = query.docs[0];

        await profileDoc.ref.update({
          location: new firebase.firestore.GeoPoint(
            pos.coords.latitude,
            pos.coords.longitude
          )
        });

        await getOthersLocations();
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

	const allLocations = othersLocations;
  const markers = allLocations.map(loc => {
    return (
      <Marker
        lat={loc.lat}
        lng={loc.lng}
        color={profiles[loc.id].status}
        name={profiles[loc.id].name}
        url={profiles[loc.id].photoURL}
        id={loc.id}
      />
    );
  });

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyAJHUXHm2q7jMOk-ecp9itzQS_wrtKKuac" }}
        defaultCenter={userLocation}
        defaultZoom={defaultProps.zoom}
      >
        {markers}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
