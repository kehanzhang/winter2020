import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../Auth";
import firebaseApp from "../../firebase";

const NavBar = () => {
  const { currUser, setCurrUser } = useContext(AuthContext);
	const history = useHistory();

  const register = () => {
    history.push('/register')
  };
  const login = () => {
    history.push('/login')
  };
  const logOut = async e => {
		e.preventDefault();
		
    try {
      await firebaseApp.auth().signOut();
      console.log("Signed Out!");
      setCurrUser(null);

      history.push('/')
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div>
      {currUser === null ? "not logged in" : `logged in, hello ${currUser.email}`}
      {currUser !== null ? 
        <button onClick={e => logOut(e)}>Log Out</button>
       : <> <button onClick={register}>Register</button> <button onClick={login}>Log In</button> </>}
    </div>
  );
};

export default NavBar;
