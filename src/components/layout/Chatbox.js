import React, { useEffect, useState } from 'react'
import firebase, { auth, db } from "../../firebase";

export default function Chatbox({chat}) {
	const {id, chatName} = chat
	const [messages, setMessages] = useState([])

	
	useEffect(() => {
		const unsubscribe = db.collection("chat-messages").doc(id).collection("messages").onSnapshot((snapshot) => {
			let data = snapshot.docs.map(doc => doc.data());
			setMessages(data)
		})
		return unsubscribe;
	}, [id])

	const messageList = messages.map(message => {
		return (
			<li key = {message.id}>{message.text}</li>
		)
	})


	return (
		<div>
			<h3>Message list</h3>
			<ul>
				<li>{`active chat is ${chatName}`}</li>
				{messageList}
			</ul>
		</div>
	)
}
