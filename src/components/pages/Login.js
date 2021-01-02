import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import firebase from "../../firebase";
import { AuthContext } from "../Auth";
import logo from "../assets/logo.png";

export default function Login() {
  const { currUser, setCurrUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const loginRes = await firebase.auth().signInWithEmailAndPassword(email, password);
			const { user } = loginRes
			setCurrUser(user)
			
			// setCurrUser({
      //   email: email
      // });
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
