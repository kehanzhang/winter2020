import React, {useState} from 'react'

import Chatbox from "../layout/Chatbox";
import firebaseApp from '../../firebase'

export default function Dashboard() {
	const [message, setMessage] = useState('');

	const handleSubmit = e => {
		e.preventDefault();
		if(this.state.message !== ''){
			const chatRef = firebaseApp.database().ref('messages');
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
			<h1>Chatbox</h1>
			<div>
				<form className="send-chat" onSubmit={handleSubmit}>
					<input type="text" id="message" value={message} onChange={(e) => {setMessage(e.target.value)}} placeholder='Leave a message...' />
				</form>
				<Chatbox/>
			</div>
		</div>
)
}
