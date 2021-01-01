import React, {useState, useContext} from 'react'

import Chatbox from "../layout/Chatbox";
import firebase from '../../firebase'
import { AuthContext } from '../Auth';
import {useHistory} from 'react-router-dom'

export default function Dashboard() {
	const [message, setMessage] = useState('');
	const {currUser, setCurrUser} = useContext(AuthContext)
	const history = useHistory();

	if (currUser=== null)	history.push('/')
	
	const handleSubmit = e => {
		e.preventDefault();
		if(message !== ''){

			const chatRef = firebase.database().ref('test');
			const chat = {
				message: message,
				user: currUser.email,
				timestamp: new Date().getTime()
			}
			
			chatRef.push(chat);
			setMessage('');
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

				<form className="send-chat" onSubmit={handleSubmit}>
					<input type="text" id="message" value={message} onChange={(e) => {setMessage(e.target.value)}} placeholder='Leave a message...' />
				</form>
				<Chatbox/>
			</div>
		</div>
)
}
