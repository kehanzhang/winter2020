import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import firebase, { db } from "../../firebase";
import { AuthContext } from "../Auth";
import logo from "../assets/logo.png";

export default function Register() {
  const { setCurrUser } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_conf, setPassword_conf] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [EmailError, SetEmailError] = useState("");

  const history = useHistory();

  const handleSubmit = async e => {
    e.preventDefault();
    //verify
    if (password !== password_conf) {
      console.log("passwords dont match");
      return;
    }
    try {
      const regRes = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      const { user } = regRes;
      setCurrUser(user);

      // Create Profile

      const newProfile = {
        name: name,
        status: "green",
        friends: [],
        location: new firebase.firestore.GeoPoint(0, 0),
        user: firebase.auth().currentUser.uid
      };

      await db.collection("profiles").add(newProfile);

      history.push("/dashboard");

      // firebase.catch(err => {
      //   switch (err.code) {
      //     case "auth/email-already-in-use":
      //     case "auth/invalid-email":
      //       SetEmailError(err.message);
      //       break;
      //     case "auth/weak-password":
      //       setPasswordError(err.message);
      //       break;
      //   }
      // });
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <div align="center">
        <img
          onClick={() => {
            history.push("/");
          }}
          src={logo}
          alt="Logo"
          className="center"
        />
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="columnLeft">
              <div className="customTxt">
                <label htmlFor="reg-name">Name</label>
              </div>
              <input
                className="inputFields"
                id="reg-name"
                type="text"
                placeholder="Display Name"
                onChange={e => setName(e.target.value)}
              />
            </div>

            <div className="columnRight">
              <div className="customTxt">
                <label htmlFor="reg-email">Email</label>
              </div>

              <input
                className="inputFields"
                id="reg-email"
                type="email"
                placeholder="Email"
                onChange={e => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="row">
            <div className="columnLeft">
              <div className="customTxt">
                <label htmlFor="reg-pass">Password</label>
              </div>

              <input
                className="inputFields"
                id="reg-pass"
                type="password"
                placeholder="Password"
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <div className="columnRight">
              <div className="customTxt">
                <label htmlFor="reg-pass_conf">Password Confirmation</label>
              </div>

              <input
                className="inputFields"
                id="reg-pass-conf"
                type="password"
                placeholder="Confirm Password"
                onChange={e => setPassword_conf(e.target.value)}
              />
            </div>
          </div>

          <div className="button-container">
            <button className="loginButton" type="submit">
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
