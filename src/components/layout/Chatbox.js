import React, { useEffect, useContext, useState } from 'react'
import firebase, { db } from "../../firebase";
import { AuthContext } from "../Auth";

export default function Chatbox({chat}) {
	const {id, chatName} = chat
	const [messages, setMessages] = useState([])
	const [formText, setFormText] = useState("");
	const {currUser} = useContext(AuthContext);

	

	const sendMessage = (e) => {
		e.preventDefault()
		if (formText !== '') {
			//push to firebase
			console.log(formText);
			db.collection('chat-messages').doc(id).collection('messages').add({})
			.then(function(docRef) {
				var messageDocRef = db.collection('chat-messages').doc(id).collection('messages').doc(docRef.id)
				//console.log("Document written with ID: ", docRef.id);

				const newMessage = {
					sentAt: firebase.firestore.FieldValue.serverTimestamp(),
					sentBy: currUser.uid,
					text: formText,
					id: docRef.id
				};
				
				messageDocRef.set(newMessage);
			});
			setFormText('');
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
				<input 
					type = 'text' 
					value = {formText} 
					onChange = {(e) => setFormText(e.target.value)} 
					placeholder = "send a message"
				/>
				<button type = "submit">Send</button>
			</form>


		</div>
	)
}
