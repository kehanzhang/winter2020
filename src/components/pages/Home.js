import React, { useContext } from "react";
import { AuthContext } from "../Auth";
import { useHistory } from "react-router-dom";
import logo from '../assets/logo.png';

export default function Home() {
  const { currUser } = useContext(AuthContext)
  const history = useHistory();

	if (currUser !== null)	history.push('/dashboard')

  const register = () => {
    history.push('/register')
  };

  const login = () => {
    history.push('/login')
  };

  return ( 
    <div align="center">
      <img src={logo} alt="Logo" class="center"/>
      <div className = 'button-container'>
				<button className = "loginButton" onClick={login}>Log In</button> 
			</div>
			<div className = 'button-container'>
				<button className = "registerButton" onClick={register}>Register</button>
			</div>
		</div>
	);
}
