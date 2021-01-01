import React, { useContext } from "react";
import { AuthContext } from "../Auth";
import { useHistory } from "react-router-dom";

export default function Home() {
  const { currUser } = useContext(AuthContext)
  const history = useHistory();

  const register = () => {
    history.push('/register')
  };

  const login = () => {
    history.push('/login')
  };

  return ( 
		<div>
			<div className = 'button-container'>
				<button className = "button" onClick={register}>Register</button>
			</div>
			<div className = 'button-container'>
				<button className = "button" onClick={login}>Log In</button> 
			</div>
		</div>
	);
}
