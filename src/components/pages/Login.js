import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import firebase, { db } from "../../firebase";
import { AuthContext } from "../Auth";
import logo from "../assets/logo.png";

export default function Login() {
  //const { currUser, setCurrUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      // const loginRes = await firebase
      //   .auth()
      //   .signInWithEmailAndPassword(email, password);
      // const { user } = loginRes;
			// setCurrUser(user);
			
			await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);

      // Update user's location in database
      if (navigator.geolocation) console.log("it exists");

      navigator.geolocation.getCurrentPosition(
        async pos => {
          console.log(pos.coords.latitude);
          console.log(pos.coords.longitude);

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
        },
        err => {
          console.log(err.message);
        },
        { timeout: 10000, enableHighAccuracy: true, maximumAge: 75000 }
      );

      history.push("/dashboard");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div align="center">
      <img
        onClick={() => {
          history.push("/");
        }}
        src={logo}
        alt="Logo"
        className="center"
      />
      <form onSubmit={e => handleSubmit(e)}>
        <div className="columnRight">
          <div className="customTxt">
            <label htmlFor="log-email">Email</label>
          </div>
          <input
            className="inputFields"
            id="log-email"
            type="email"
            placeholder="Email"
            onChange={e => setEmail(e.target.value)}
          />

          <div className="customTxt">
            <label htmlFor="log-pass">Password</label>
          </div>

          <input
            className="inputFields"
            id="log-pass"
            type="password"
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <div className="button-container">
          <button className="loginButton" type="submit">
            Log In
          </button>
        </div>
      </form>
    </div>
  );
}
