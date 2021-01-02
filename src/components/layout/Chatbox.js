import React, { useEffect, useState } from 'react'
import { db } from "../../firebase";

export default function Chatbox({chat}) {
	const {id, chatName} = chat
	const [messages, setMessages] = useState([])
	const [text, setText] = useState("");
	
	const sendMessage = (e) => {
		e.preventDefault()
		if (text !== '') {
			//push to firebase
			console.log(text);

			setText('');
		}
		
	}

	useEffect(() => {
		const unsubscribe = db.collection("chat-messages").doc(id).collection("messages").onSnapshot((snapshot) => {
			let data = snapshot.docs.map(doc => doc.data()).sort((m1,m2) => {return m1.sentAt - m2.sentAt});
			console.log(data)
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
			<form onSubmit = {sendMessage}>
				<input type = 'text' value = {text} onChange = {(e) => setText(e.target.value)} placeholder = "send a message"/>
				<button type = "submit">Send</button>
			</form>
		</div>
	)
}
