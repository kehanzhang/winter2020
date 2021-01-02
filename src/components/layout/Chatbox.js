import React, { useEffect, useState } from 'react'
import firebase, { auth, db } from "../../firebase";

export default function Chatbox({id}) {
	const [messages, setMessages] = useState([])

	

	// const getMessages = async () => {
	// 	console.log(ids[0])
	// 	let desired_id = null;
	// 	try {
	// 		const query = await db
	// 			.collection("chat-messages")
	// 			.get();

	// 		query.forEach(doc => {
	// 			if(doc.id === ids[0]) {
	// 				desired_id = doc.id
	// 			}
	// 		});
	// 		console.log(desired_id);

	// 		const query2 = await db.collection(`chat-messages/${desired_id}/messages`).get();

	// 		query2.forEach(doc2 => {
	// 			console.log(doc2.data())
	// 		})
	// 	} catch (err) {
	// 		console.log(err.message);
	// 	}
	// }
	


	return (
		<div>
			<h3>Message list</h3>
			<ul>
				<li>{`active chat is ${id}`}</li>
			</ul>
		</div>
	)
}
