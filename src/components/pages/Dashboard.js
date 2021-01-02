import React, { useContext, useEffect, useRef, useState } from "react";
import firebase, { db } from "../../firebase";
import { AuthContext } from "../Auth";
import { useHistory } from "react-router-dom";

import Chatbox from "../layout/Chatbox";


export default function Dashboard() {
	const {currUser, setCurrUser} = useContext(AuthContext)
	const history = useHistory();
	const [chats, setChats] = useState([])
	const [activeChat, setActiveChat] = useState(null)
	
	if (currUser=== null)	history.push('/')
	//.where('members', 'array-contains', currUser.uid)
	useEffect(() => {
		const getChats = async () => {
			try {
				await db
					.collection("chat-groups")					
					.onSnapshot((snapshot) => {
						let data = snapshot.docs.filter((doc) => 
							doc.data().members.includes(currUser.uid)
						).map((doc) => doc.id)
						setChats(data)
					})

			} catch (err) {
				console.log("Error getting documents: ", err);
			}
		}
		getChats()
	},[])

	const buttonlist = chats.map((chatid) => {
		return (
			<li key = {chatid}>
				<button onClick = {setActiveChat(chatid)}>{chatid}</button>
			</li>
		)
	})
	const logout = async (e) => {
		e.preventDefault();
		
    try {
      await firebase.auth().signOut();
      console.log("Signed Out!");
      setCurrUser(null);
			
			if(currUser === null)	history.push("/");
    } catch (err) {
      console.log(err.message);
    }
	};
	
	const profile = () => {
		history.push('/profile')
	}
	return (
		<div>
			<h1>Dashboard</h1>
			<div>
				<button onClick={logout}>Log Out</button>
				<button onClick={() => console.log(chats)}>Print</button>
				<button onClick={profile}>TO THE PROFILES</button>
			</div>

		</div>
)
}
