import React, {useState, useEffect, useContext} from 'react'
import firebase, { db } from "../../firebase";
import {useHistory} from 'react-router-dom'

import Chatbox from './Chatbox'
import {AuthContext} from '../Auth'

export default function MainContainer() {
	const { currUser } = useContext(AuthContext);
	const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
	const history = useHistory();
  

  useEffect(() => {
    const unsubscribe = db.collection("chat-groups").onSnapshot(snapshot => {
      let data = snapshot.docs
        .filter(doc => doc.data().members.includes(currUser.uid))
				.map(doc => doc.id);
			setChats(data);	
    });

    return unsubscribe;
  }, []);

  const renderChats = chats.slice();				//fixes infinite render errors
  const buttonlist = renderChats.map(chat => (
    <li key={chat}>
      <button onClick={() => setActiveChat(chat)}>{chat}</button>
    </li>
  ));

  

  const profile = () => {
    history.push("/profile");
  };
	return (
		<div>
			<div>
        
        <button onClick={profile}>TO THE PROFILES</button>
      </div>
      <div>
        <ul>{buttonlist}</ul>
      </div>
      <div>
        {activeChat === null
          ? "no active chat"
          : <Chatbox id = {activeChat}/>}
      </div>
		</div>
	)
}
