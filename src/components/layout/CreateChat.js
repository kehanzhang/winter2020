// import React, {useState, useContext} from 'react'
// import firebase, { db } from "../../firebase";

// import { AuthContext } from "../Auth";

// export default function CreateChat({callBack}) {
// 	const { currUser, profiles } = useContext(AuthContext);
// 	const [firstText, setFirstText] = useState('');
// 	const [recipient, setRecipient] = useState('');

// 	const friends = profiles[currUser.uid].friends;

// 	const createChat = (e) => {
// 		e.preventDefault();

// 		if (firstText !== '' && friends.includes(recipient)) {
// 			let id = null;
// 			db.collection('chat-groups').add({})
// 				.then((docRef) => {
// 					let groupDocRef = db.collection('chat-groups').doc(docRef.id)
// 					id = docRef.id;
// 					const newChat = {
// 						chatName: profiles[recipient].name,
// 						createdAt: Date.now(),
// 						createdBy: currUser.uid,
// 						id: docRef.id,
// 						members: [currUser.uid, recipient]
// 					}
// 					groupDocRef.set(newChat)
// 					callBack(newChat)

// 					//query and change profile
// 					const query = db
// 						.collection("profiles")
// 						.where("user", "==", currUser.uid)
// 						.get();

// 					const profileDoc = query.docs[0];

// 					profileDoc.ref.update({
// 						chats: [...chats, recipient]
// 					});

// 					db.collection('chat-messages').doc(id).collection('messages').add({})
// 						.then((docRef) => {
// 							let messageDocRef = db.collection('chat-messages').doc(id).collection('messages').doc(docRef.id);

// 							const newMessage = {
// 								sentAt: firebase.firestore.FieldValue.serverTimestamp(),
// 								sentBy: currUser.uid,
// 								text: firstText,
// 								id: docRef.id
// 							};

// 							messageDocRef.set(newMessage);
// 						})
// 				})

// 		}
// 	}

// 	return (
// 		<div>
// 			<form onSubmit = {createChat}>
// 				<div>
// 					<input
// 						type = "text"
// 						placeholder = "Recipient"
// 						value = {recipient}
// 						onChange = {(e) => setRecipient(e.target.value)}
// 					/>
// 				</div>
// 				<div>
// 					<input
// 						type = "text"
// 						placeholder = "Send message"
// 						value = {firstText}
// 						onChange = {(e) => setFirstText(e.target.value)}
// 					/>
// 					<button type = 'submit'>send</button>
// 				</div>

// 			</form>

// 		</div>
// 	)
// }
