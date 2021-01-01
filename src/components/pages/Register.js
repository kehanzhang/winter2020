import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import firebaseApp from "../../firebase";
import { AuthContext } from "../Auth";

export default function Register() {
  const { currUser, setCurrUser } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_conf, setPassword_conf] = useState("");

	const history = useHistory();

	const handleSubmit = async e => {
    e.preventDefault();
    //verify
    if (password !== password_conf) {
      console.log("passwords dont match");
      return;
    }
    try {
      await firebaseApp.auth().createUserWithEmailAndPassword(email, password);

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
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="reg-name">Name</label>
        <input
          id="reg-name"
          type="text"
          placeholder="Display Name"
          onChange={e => setName(e.target.value)}
        />

        <label htmlFor="reg-email">Email</label>
        <input
          id="reg-email"
          type="email"
          placeholder="email"
          onChange={e => setEmail(e.target.value)}
        />

        <label htmlFor="reg-pass">Password</label>
        <input
          id="reg-pass"
          type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />

        <label htmlFor="reg-pass_conf">Password Confirmation</label>
        <input
          id="reg-pass-conf"
          type="password"
          placeholder="Confirm Password"
          onChange={e => setPassword_conf(e.target.value)}
        />

        <button type="submit">Register</button>
      </form>
    </>
  );
}
