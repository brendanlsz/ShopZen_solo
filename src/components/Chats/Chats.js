import React, { useRef, useState, useEffect } from "react"

import axios from 'axios'
import { useHistory } from "react-router-dom"
import { ChatEngine, getOrCreateChat, sendMessage  } from 'react-chat-engine'
import { Link, useLocation, NavLink } from "react-router-dom";
import { getChats } from 'react-chat-engine';

import { ChatEngineWrapper, Socket, ChatList, ChatFeed, ChatSettings } from 'react-chat-engine'

import { Col } from 'react-grid-system'
import WithAuth from "../../hoc/withAuth";

import './index.css'

// import { useAuth } from "./AuthContext"
import firebase, { auth } from 'firebase'

function useForceUpdate(){
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => value + 1); // update the state to force render
}

export default function Chats(props) {
  const {currentUserEmail, currentUserUid} = props
  const authObject = {projectID: '896f6a0e-9b91-41ff-a3a4-4dedbfe06c10', userName: `${currentUserEmail}`, userSecret: `${currentUserEmail}`}
  console.log(`${currentUserEmail}`)

  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  //const { user } = useAuth();
  const history = useHistory();
  let [chatID, setChatID] = useState("");
  let [toggle, setToggle] = useState(false);


  const callback = (chat) => {
    setChatID(chat.id);
    console.log(chat.id);
    console.log("callback")
  }


  function createDirectChat(creds, str, str2) {
    getOrCreateChat(
      creds,
      {
        is_direct_chat: true,
        usernames: [`${str}`, `${currentUserEmail}`],
      },
      callback
    );
    console.log(`${str}`)
  }

  useEffect(() => {
    setTimeout(createDirectChat(authObject, props.adminUserEmail, props.adminUserUid), 0);
    // setTimeout(() => {
    //    setLoading(false)
    // }, 1000)

  }, []);


  useEffect(() => {
    createDirectChat(authObject, props.adminUserEmail, props.adminUserUid);
    console.log("create direct chat called")
  }, [])

  function renderChatForm(creds) {
    setTimeout(createDirectChat(creds, props.adminUserEmail, props.adminUserUid), 0);
  }

  useEffect(() => {
    setTimeout(createDirectChat("", props.adminUserEmail, props.adminUserUid), 0);
    console.log(chatID)
  }, [chatID])

  // if (loading) {
  //   return <div>loading...</div>;
  // }
  return (
    <WithAuth>
      <div className="chats-page">
        <div className="nav-bar">
          <div className="logo-tab">ShopZen Direct Chat</div>
        </div>
        <ChatEngineWrapper>
          <div className="chat-hide">
            <Socket
              height="100vh"
              userName={currentUserEmail}
              userSecret={currentUserEmail}
              projectID="896f6a0e-9b91-41ff-a3a4-4dedbfe06c10"
              renderNewChatForm={(creds) => renderChatForm(creds)}
            />
          </div>
          <ChatFeed activeChat={chatID} />
        </ChatEngineWrapper>
      </div>
    </WithAuth>
  );
}