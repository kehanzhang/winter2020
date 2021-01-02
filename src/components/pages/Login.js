import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import firebase from "../../firebase";
import { AuthContext } from "../Auth";
import logo from '../assets/logo.png';

export default function Login() {
  const { currUser, setCurrUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      setCurrUser({
        email: email
      });
      history.push("/dashboard");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <div align="center">
      <img src={logo} alt="Logo" class="center"/>
      <form onSubmit={e => handleSubmit(e)}>
        <div class="customTxt">
          <label htmlFor="log-email">Email</label>
        </div>
          <input 
            class="inputFields"
            id="log-email"
            type="email"
            placeholder="Email"
            onChange={e => setEmail(e.target.value)}
          />

        <div class="customTxt">
          <label htmlFor="log-pass">Password</label>
        </div>

          <input
            class="inputFields"
            id="log-pass"
            type="password"
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
          />

        <div className = 'button-container'>
        <button className='loginButton' type="submit">Log In</button>
        </div>
      </form>
      </div>
    </>
  );
}
