import React, {useContext} from 'react'
import firebase from "../../firebase";
import { useHistory } from "react-router-dom";
import { AuthContext } from '../Auth';

export default function Logout() {
	const {currUser, setCurrUser} = useContext(AuthContext)
	const history = useHistory();
	
	const logout = async e => {
    e.preventDefault();

    try {
      await firebase.auth().signOut();
      console.log("Signed Out!");
      setCurrUser(null);

      if (currUser === null) history.push("/");
    } catch (err) {
      console.log(err.message);
    }
  };
	return (
		<div>
			<button onClick={logout}>Log Out</button>
		</div>
	)
}
