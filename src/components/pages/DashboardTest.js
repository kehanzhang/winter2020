import React, { useState } from "react";
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
  Conversation,
  ConversationHeader,
  VoiceCallButton,
  VideoCallButton,
  EllipsisButton,
  TypingIndicator,
  MessageSeparator
} from "@chatscope/chat-ui-kit-react";
import { useHistory } from "react-router-dom";
import defaultIco from "../assets/logo.png";

import Map from "./Map";
import Logout from "../layout/Logout";

const DashboardTest = () => {
  // Set initial message input value to empty string
  const [messageInputValue, setMessageInputValue] = useState("");
  const [displayMap, setDisplayMap] = useState(false);

  const history = useHistory();

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
            <Conversation
              name="Lilly"
              lastSenderName="Lilly"
              info="Yes i can do it for you"
            >
              <Avatar src={defaultIco} name="Lilly" status="available" />
            </Conversation>
          </ConversationList>
          <button onClick={() => setDisplayMap(!displayMap)}>toggle</button>
          <button onClick={profile}>Profile</button>
          <Logout />
        </Sidebar>

        {displayMap ? (
          <Map />
        ) : (
          <ChatContainer>
            <ConversationHeader>
              <ConversationHeader.Back />
              <Avatar src={defaultIco} name="Zoe" />
              <ConversationHeader.Content
                userName="Zoe"
                info="Active 10 mins ago"
              />
              <ConversationHeader.Actions>
                <EllipsisButton orientation="vertical" />
              </ConversationHeader.Actions>
            </ConversationHeader>
            <MessageList
              typingIndicator={<TypingIndicator content="Zoe is typing" />}
            >
              <MessageSeparator content="Saturday, 30 November 2019" />
              <Message
                model={{
                  message: "Hello my friend",
                  sentTime: "15 mins ago",
                  sender: "Zoe",
                  direction: "incoming",
                  position: "single"
                }}
              >
                <Avatar src={defaultIco} name="Zoe" />
              </Message>
            </MessageList>
            <MessageInput
              placeholder="Type message here"
              value={messageInputValue}
              onChange={val => setMessageInputValue(val)}
            />
          </ChatContainer>
        )}
      </MainContainer>
    </div>
  );
};

export default DashboardTest;
