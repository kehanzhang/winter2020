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
	
	const getChats = async () => {
		try {
			const query = await db.collection("chat-groups")
      .where('members', 'array-contains', currUser.uid)
			.get();
			
			query.forEach((doc) => {
				console.log(doc.id, " => ", doc.data());
			});
				
		} catch (err) {
			console.log("Error getting documents: ", err);
		}
	}
	
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
				<button onClick={getChats}>DONT CLICK ME</button>
			</div>
		</div>
)
}
