import React, { useEffect, useContext, useState } from "react";
import firebase, { db } from "../../firebase";
import { AuthContext } from "../Auth";

import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Avatar,
  ConversationHeader,
  EllipsisButton
} from "@chatscope/chat-ui-kit-react";

import defaultIco from "../assets/logo.png";

export default function ChatSection({ chat }) {
  const [messages, setMessages] = useState([]);
  const [formText, setFormText] = useState("");
  const { currUser } = useContext(AuthContext);

  //const [messageInputValue, setMessageInputValue] = useState("");

  const [loading, setLoading] = useState(true);

  const { id, chatName } = chat;

  const sendMessage = () => {
    if (formText !== "") {
      //push to firebase
      console.log(formText);
      db.collection("chat-messages")
        .doc(id)
        .collection("messages")
        .add({})
        .then(function(docRef) {
          var messageDocRef = db
            .collection("chat-messages")
            .doc(id)
            .collection("messages")
            .doc(docRef.id);
          //console.log("Document written with ID: ", docRef.id);

          const newMessage = {
            sentAt: firebase.firestore.FieldValue.serverTimestamp(),
            sentBy: currUser.uid,
            text: formText,
            id: docRef.id
          };

          messageDocRef.set(newMessage);
        });
      setFormText("");
    }
  };

  useEffect(() => {
    const unsubscribe = db
      .collection("chat-messages")
      .doc(id)
      .collection("messages")
      .onSnapshot(snapshot => {
        let data = snapshot.docs
          .map(doc => doc.data())
          .sort((m1, m2) => {
            return m1.sentAt - m2.sentAt;
          });
        console.log(data);
        setMessages(data);
        setLoading(false);
      });
    return unsubscribe;
  }, [id]);

  const messageList = messages.map(message => {
    const uid = firebase.auth().currentUser.uid;

    return (
      <Message
        model={{
          message: message.text,
          sender: message.sentBy,
          direction: message.sentBy === uid ? "outgoing" : "incoming",
          position: "single"
        }}
      />
    );
  });

  if (loading) return <div>Loading...</div>;

  return (
    <ChatContainer>
      <ConversationHeader>
        <ConversationHeader.Back />
        <Avatar src={defaultIco} />
        <ConversationHeader.Content>
          {" "}
          {chat.members.map(uid => (
            <div>{uid}</div>
          ))}
        </ConversationHeader.Content>
        <ConversationHeader.Actions>
          <EllipsisButton orientation="vertical" />
        </ConversationHeader.Actions>
      </ConversationHeader>

      <MessageList>{messageList}</MessageList>
      <MessageInput
        placeholder="Type message here"
        value={formText}
        onChange={val => setFormText(val)}
        onSend={sendMessage}
      />
    </ChatContainer>
  );
}
