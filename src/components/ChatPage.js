import React, { useEffect, useState, useRef } from "react";
import ChatBar from "./ChatBar";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
import "../index.css";
import { useSelector, useDispatch } from "react-redux";
import {
  inputMessages,
  logCurrentUser,
  logTypingStatus,
  logActiveUsers,
} from "../Slices/chatSlice";

const ChatPage = ({ socket }) => {
  const { currentUser, messages, typingStatus } = useSelector((state) => {
    return state.chat;
  });
  // const [messages, setMessages] = useState([]);
  // const [typingStatus, setTypingStatus] = useState("");
  const lastMessageRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("messageResponse", (data) => {
      console.log("messageResponse", data);
      // console.log(data);
      dispatch(inputMessages(data));
      // setMessages((lastMessage) => {
      //   return [...lastMessage, data];
      // });
    });
  }, []);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    socket.on("typingResponse", (data) => {
      dispatch(logTypingStatus(data));
      // setTypingStatus(data);
      setTimeout(() => {
        dispatch(logTypingStatus(""));
      }, 2000);
    });
  }, [socket]);

  return (
    <div className="chat">
      <ChatBar socket={socket} />
      <div className="chat__main">
        <ChatBody
          messages={messages}
          typingStatus={typingStatus}
          lastMessageRef={lastMessageRef}
          socket={socket}
        />
        <ChatFooter socket={socket} />
      </div>
    </div>
  );
};

export default ChatPage;
