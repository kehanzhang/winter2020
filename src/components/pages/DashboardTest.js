import React, { useState, useEffect, useContext } from "react";
import firebase, { db } from "../../firebase";
import { AuthContext } from "../Auth";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Sidebar,
  Search,
  ConversationList,
  Avatar,
  AvatarGroup,
  Conversation,
  ConversationHeader,
  EllipsisButton,
  TypingIndicator,
  MessageSeparator
} from "@chatscope/chat-ui-kit-react";
import { useHistory } from "react-router-dom";
import defaultIco from "../assets/logo.png";

import Map from "./Map";
import Logout from "../layout/Logout";
import ChatSection from "../layout/ChatSection";

const DashboardTest = () => {
  const { currUser, profiles } = useContext(AuthContext);
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);

  // Set initial message input value to empty string
  const [messageInputValue, setMessageInputValue] = useState("");
  const [displayMap, setDisplayMap] = useState(false);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  const initChat = childData => {
    setActiveChat(childData);
    setDisplayMap(false);
  };

  useEffect(() => {
    const unsubscribe = db.collection("chat-groups").onSnapshot(snapshot => {
      if (currUser === null) history.push("/");

      let data = snapshot.docs
        .filter(doc => {
          if (!doc.data().members) return false;

          return doc.data().members.includes(currUser.uid);
        })
        .map(doc => doc.data());

      setChats(data);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

	if (currUser === null)	{
		history.push("/");
		return <p>Loading...</p>
		
	}
  const profile = () => {
    history.push("/profile");
  };


  return (
    <div
      style={{
        height: "100vh",
        position: "relative"
      }}
    >
      <MainContainer responsive>
        <Sidebar position="left" scrollable={false}>
          <Search placeholder="Search..." />
          <ConversationList>
            {chats.map(chat => {
              return (
                <Conversation
                  name={
                    chat.members.length > 2
                      ? chat.chatName
                      : profiles[
                          chat.members.filter(
                            member => member !== currUser.uid
                          )[0]
                        ].status === "anonymous"
                      ? "anon"
                      : profiles[currUser.uid].name !==
                        chat.chatName.split("-")[0]
                      ? chat.chatName.split("-")[0]
                      : chat.chatName.split("-")[1]
                  }
                  onClick={() => {
                    setActiveChat(chat);
                    setDisplayMap(false);
                  }}
                >
                  <AvatarGroup size="sm">
                    {chat.members.map(uid => {
                      const profile = profiles[uid];

                      if (profile === null) return null;

                      return (
                        <Avatar
                          src={
                            profile.photoURL === "" ||
                            profile.status === "anonymous"
                              ? defaultIco
                              : profile.photoURL
                          }
                          name={profile.name}
                          status={profile.status}
                        />
                      );
                    })}
                  </AvatarGroup>
                </Conversation>
              );
            })}
          </ConversationList>
          <div align="center" className="btmPadding">
            <div className="leftBtn">
              <button className="toggleButton" onClick={profile}>
                Profile
              </button>
            </div>
            <div className="midBtn">
              <button
                className="toggleButton"
                onClick={() => setDisplayMap(!displayMap)}
              >
                Toggle
              </button>
            </div>
            <div className="rightBtn">
              <Logout />
            </div>
          </div>
        </Sidebar>

        {displayMap ? (
          <Map initChat={initChat} />
        ) : activeChat === null || currUser === null ? (
          <div>Loading...</div>
        ) : activeChat === undefined ? (
          <ChatSection
            chat={{ members: [], id: "emptyChat", chatName: "default" }}
          />
        ) : (
          <ChatSection chat={activeChat} />
        )}
      </MainContainer>
    </div>
  );
};

export default DashboardTest;
