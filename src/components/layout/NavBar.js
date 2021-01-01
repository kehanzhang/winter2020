import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../Auth";
import firebaseApp from "../../firebase";

const NavBar = props => {
  const { currUser } = useContext(AuthContext);
  const history = useHistory();

  const logOut = e => {
    e.preventDefault();

    firebaseApp
      .auth()
      .signOut()
      .then(() => {
        history.push("/login");
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div>
      <button onClick={e => logOut(e)}>LogOut</button>
    </div>
  );
};

export default NavBar;
