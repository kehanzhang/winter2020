import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../Auth";
import firebaseApp from "../../firebase";

const NavBar = props => {
  const { currUser } = useContext(AuthContext);

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
      <button onClick={e => logOut(e)}>LogOut</button>
    </div>
  );
};

export default NavBar;
