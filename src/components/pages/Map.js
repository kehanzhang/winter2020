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
  const [othersLocations, setOthersLocations] = useState([]);
  const [loading, setLoading] = useState("true");

  const getOthersLocations = async () => {
    let locArr = [];

    const query = await db.collection("profiles").get();

    query.forEach(doc => {
      console.log(
        doc.data().location.latitude + " " + doc.data().location.longitude
      );

      locArr.push({
        lat: doc.data().location.latitude,
        lng: doc.data().location.longitude
      });
    });

    setOthersLocations(locArr);
    console.log(locArr);
    setLoading(false);
  };

  useEffect(() => {
    if (navigator.geolocation) console.log("it exists");

    navigator.geolocation.getCurrentPosition(
      async pos => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        });
        console.log(pos.coords.latitude);
        console.log(pos.coords.longitude);

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

  const allLocations = [userLocation, ...othersLocations];
  const markers = allLocations.map(loc => {
    return <AnyReactComponent lat={loc.lat} lng={loc.lng} text="My Marker" />;
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
