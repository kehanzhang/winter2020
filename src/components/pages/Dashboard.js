import React, {useState, useContext} from 'react'

import Chatbox from "../layout/Chatbox";
import firebase from '../../firebase'
import {auth, firestore as db} from '../../firebase'
import { AuthContext } from '../Auth';
import {useHistory} from 'react-router-dom'

export default function Dashboard() {
	const [message, setMessage] = useState('');
	const {currUser, setCurrUser} = useContext(AuthContext)
	const history = useHistory();

	if (currUser=== null)	history.push('/')
	
	const groupRef = db.collection('chat-groups');
	const groups = groupRef.where('members', 'array-contains', currUser.uid)

	const logout = async (e) => {
		e.preventDefault();
		
    try {
      await firebase.auth().signOut();
      console.log("Signed Out!");
      setCurrUser(null);

      history.push('/')
    } catch (err) {
      console.log(err.message);
    }
  };

	return (
		<div>
			<h1>Chatbox</h1>
			<div>
				<button onClick={logout}>Log Out</button>
				<Chatbox/>
			</div>
		</div>
)
}
