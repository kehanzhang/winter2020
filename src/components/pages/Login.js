import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import firebaseApp from "../../firebase";
import { AuthContext } from "../Auth";

export default function Login() {
  const { currUser, setCurrUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await firebaseApp.auth().signInWithEmailAndPassword(email, password);
      setCurrUser({
				email: email
			});
			history.push('/dashboard')

    } catch (err) {
      console.log(err.message);
    } 
  };
	
  return (
    <>
      <h2>Log In</h2>
      <form onSubmit={e => handleSubmit(e)}>
        <label htmlFor="log-email">Email</label>
        <input
          id="log-email"
          type="email"
          placeholder="email"
          onChange={e => setEmail(e.target.value)}
        />

        <label htmlFor="log-pass">Password</label>
        <input
          id="log-pass"
          type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />

        <button type="submit">Log In</button>
      </form>
    </>
  );
}
