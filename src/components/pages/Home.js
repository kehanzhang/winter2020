import React, { useState, useContext } from "react";
import { AuthContext } from "../Auth";
import Chatbox from "../layout/Chatbox";

export default function Home() {
  const { currUser } = useContext(AuthContext)
	const [message, setMessage] = useState('');

	const handleSubmit = e => {
		e.preventDefault();
		if(this.state.message !== ''){
			const chatRef = firebase.database().ref('messages');
			const chat = {
				message: this.state.message,
				user: this.props.user.displayName,
				timestamp: new Date().getTime()
			}
			
			chatRef.push(chat);
			setMessage('');
		}
	}
  return (
		<div>
			<h1>Welcome to Dott</h1>
			{
				currUser === null ? 
				"Please sign in": 
				<div>
					<form className="send-chat" onSubmit={handleSubmit}>
						<input type="text" id="message" value={message} onChange={(e) => {setMessage(e.target.value)}} placeholder='Leave a message...' />
					</form>
					<Chatbox/>
				</div>
			}
		</div>
	);
}
