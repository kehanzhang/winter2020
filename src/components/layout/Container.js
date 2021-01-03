import React, { useState, useEffect, useContext } from "react";
import firebase, { db } from "../../firebase";
import { useHistory } from "react-router-dom";

import Chatbox from "./Chatbox";
import { AuthContext } from "../Auth";
import CreateChat from './CreateChat'

export default function Container() {
  const { currUser } = useContext(AuthContext);
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const history = useHistory();


  useEffect(() => {
    const unsubscribe = db.collection("chat-groups").onSnapshot(snapshot => {
      let data = snapshot.docs
        .filter(doc => {
					if(doc.data().members === undefined)	return false
					else return doc.data().members.includes(currUser.uid)
				})
        .map(doc => doc.data());
      setChats(data);
    });

    return unsubscribe;
  }, []);

	const create = () => {
		setActiveChat("creationseed")
	}
	
	const callBack = (childData) => {
		this.setActiveChat(childData);
	}
	

  const renderChats = chats.slice(); //fixes infinite render errors
  const buttonlist = renderChats.map(chat => (
    <li key={chat.id}>
      <button onClick={() => setActiveChat(chat)}>{chat.chatName}</button>
    </li>
  ));

  return (
    <div>
      <div>
        <button onClick={() => {history.push("/profile")}}>TO THE PROFILES</button>
      </div>
			<div>
				<button onClick = {create}>Create Chat</button>
			</div>
      <div>
        <ul>{buttonlist}</ul>
      </div>
      <div>
        {activeChat === null ? "no active chat" : 
					activeChat === "creationseed" ? <CreateChat callback = {callBack}/> : <Chatbox chat={activeChat} />}
      </div>
    </div>
  );
}
