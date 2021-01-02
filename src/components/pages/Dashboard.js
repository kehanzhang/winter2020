import React, { useContext, useEffect, useRef, useState } from "react";
import firebase, { db } from "../../firebase";
import { AuthContext } from "../Auth";
import { useHistory } from "react-router-dom";

import Chatbox from "../layout/Chatbox";
import MainContainer from "../layout/MainContainer";

export default function Dashboard() {
  const { currUser, setCurrUser } = useContext(AuthContext);
  const history = useHistory();
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);

  if (currUser === null) history.push("/");

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

  const logout = async e => {
    e.preventDefault();

    try {
      await firebase.auth().signOut();
      console.log("Signed Out!");
      setCurrUser(null);

      if (currUser === null) history.push("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  const profile = () => {
    history.push("/profile");
  };
  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <button onClick={logout}>Log Out</button>
        <button onClick={profile}>TO THE PROFILES</button>
      </div>
      <div>
        <ul>{buttonlist}</ul>
      </div>
      <div>
        {activeChat === null
          ? "no active chat"
          : `active chat is ${activeChat}`}
      </div>
    </div>
  );
}
