import React, {useState, useContext} from 'react'
import firebase, { db } from "../../firebase";

import { AuthContext } from "../Auth";

export default function CreateChat({callBack}) {
	const { currUser, profiles } = useContext(AuthContext);
	const [firstText, setFirstText] = useState('');
	const [recipient, setRecipient] = useState('');

	const friends = profiles.filter((profile) => profile.user === currUser.uid).map(profile => profile.friends)[0]

	const createChat = (e) => {
		e.preventDefault();

		if (firstText !== '' && friends.includes(recipient)) {
			db.collection('chat-groups').add({})
				.then((docRef) => {
					var groupDocRef = db.collection('chat-groups').doc(docRef.id)
					
					const newChat = {
						chatName: recipient,
						createdAt: Date.now(),
						createdBy: currUser.uid,
						id: docRef.id,
						members: [currUser.uid, recipient]
					}
					groupDocRef.set(newChat)
					callBack(newChat)
				})
				
		}
	}

	// const createChat = (e) => {
	// 	e.preventDefault();

	// 	if (firstText !== '' && friends.includes(recipient)) {
	// 		const newChat = {
	// 			chatName: recipient,
	// 			createdAt: Date.now(),
	// 			createdBy: currUser.uid,
	// 			members: [currUser.uid, recipient]
	// 		}
	// 		db.collection('chat-groups').add({
	// 			chatName: recipient,
	// 			createdAt: firebase.firestore.FieldValue.serverTimestamp(),
	// 			createdBy: currUser.uid,
	// 			members: [currUser.uid, recipient]
	// 		})
	// 			.then((docRef) => {
	// 				docRef.update({
	// 					id: docRef.id,
	// 				})
	// 				callBack(newChat)
	// 			})
				
	// 	}
	// }

	return (
		<div>
			<form onSubmit = {createChat}>
				<div>
					<input
						type = "text"
						placeholder = "Recipient"
						value = {recipient}
						onChange = {(e) => setRecipient(e.target.value)}
					/>
				</div>
				<div>
					<input
						type = "text"
						placeholder = "Send message"
						value = {firstText}
						onChange = {(e) => setFirstText(e.target.value)}
					/>
					<button type = 'submit'>send</button>
				</div>

			</form>
			
		</div>
	)
}
