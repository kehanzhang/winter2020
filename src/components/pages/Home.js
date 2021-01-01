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
			<> <button onClick={register}>Register</button> <button onClick={login}>Log In</button> </>
		</div>
	);
}
