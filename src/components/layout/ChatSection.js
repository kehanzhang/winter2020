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
  const { currUser, profiles } = useContext(AuthContext);

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
        setMessages(data);
        setLoading(false);
      });
    return unsubscribe;
  }, [id]);

  const messageList = messages.map(message => {
    const uid = firebase.auth().currentUser.uid;
    const msender = message.sentBy;
    const msender2 = profiles[msender];
    const msendername = msender2 === undefined ? "User Deleted" : msender2.name;

    if (msender2 === undefined) return null;

    return (
      <>
        <Message
          model={{
            message: message.text,
            sender: msender,
            direction: msender === uid ? "outgoing" : "incoming",
            position: "single"
          }}
        >
          <Message.Header
            sender={msender2.status === "anonymous" ? "anon" : msendername}
            sentBy={message.sentAt.toString()}
          />
        </Message>
      </>
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
            <div>{profiles[uid].name}</div>
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
