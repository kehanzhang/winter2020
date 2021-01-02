import React from 'react'
import firebase, { auth, db } from "../../firebase";
import { AuthContext } from "../Auth";
import { useHistory } from "react-router-dom";

export default function Chatbox({ids}) {
	
	const getMessages = async () => {
		console.log(ids[0])
		let desired_id = null;
		try {
			const query = await db
				.collection("chat-messages")
				.get();

			query.forEach(doc => {
				if(doc.id === ids[0]) {
					desired_id = doc.id
				}
			});
			console.log(desired_id);

			const query2 = await db.collection(`chat-messages/${desired_id}/messages`).get();

			query2.forEach(doc2 => {
				console.log(doc2.data())
			})
		} catch (err) {
			console.log(err.message);
		}
	}


	return (
		<div>
			<h3>Message list</h3>
			<ul>
				<li>
					<button onClick = {getMessages}>Press me</button>
					<button onClick = {() => console.log(ids)}>Press me</button>
				</li>
			</ul>
		</div>
	)
}
