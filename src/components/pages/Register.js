import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import firebase from "../../firebase";
import { AuthContext } from "../Auth";

const authListener = () => {
  firebase.auth().onAuthStateChanged((currUser) => {
    if(currUser){
      setCurrUser(currUser);
    }
    else{
      setCurrUser("");
    }
  })
}

/*
  firebase.catch(err =>{
    switch(err.code ){
      case "auth/invalid-email": 
      case "auth/user-disabled":
      case "auth/user-not-found":
        SetEmailError(err.message);
        break;
      case "auth/wrong-password":
        setPasswordError(err.message);
        break;
    }
  }) 
*/

useEffect(() => {
  authListener();
}, [])

const clearInputs = () =>{
  setEmail("");
  setName("");
  setPassword("");
}

const clearErrors = () =>{
  setPasswordError("");
  SetEmailError("");
}

export default function Register() {
  const {setCurrUser } = useContext(AuthContext);

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
      const regRes = await firebase.auth().createUserWithEmailAndPassword(email, password);
			const {user} = regRes;
			setCurrUser(user);

			history.push('/dashboard')

      firebase.catch(err =>{
        switch(err.code ){
          case "auth/email-already-in-use": 
          case "auth/invalid-email":
            SetEmailError(err.message);
            break;
          case "auth/weak-password":
            setPasswordError(err.message);
            break;
        }
      })
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
