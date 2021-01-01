import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../Auth";
import firebaseApp from "../../firebase";

const NavBar = () => {
  const { currUser } = useContext(AuthContext);

	const register = () => {
		return <Redirect to ="/register"/>
	}
	const login = () => {
		return <Redirect to ='/login'/>
	}
  const logOut = async e => {
    e.preventDefault();

    // firebaseApp
    //   .auth()
    //   .signOut()
    //   .then(() => {
    //     history.push("/login");
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });

    try {
      await firebaseApp.auth().signOut();
      console.log("Signed Out!");

      return <Redirect to="/login" />;
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div>
			{currUser === null ? 'not logged in' : 'logged in'}
      {currUser === null ? <>
			<button onClick={e => register(e)}>Register</button> <button onClick={e => login(e)}>Login</button> </>:
			<button onClick={e => logOut(e)}>LogOut</button>}
    </div>
  );
};

export default NavBar;
