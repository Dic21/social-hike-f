import React, { useEffect, useState, useRef } from "react";
import ChatBar from "./ChatBar";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
import "../index.css";

const ChatPage = ({ socket }) => {
  const [messages, setMessages] = useState([]);
  const [typingStatus, setTypingStatus] = useState("");
  const lastMessageRef = useRef(null);

  useEffect(() => {
    socket.on("messageResponse", (data) => {
      console.log("messageResponse", data);
      setMessages((lastMessage) => {
        return [...lastMessage, data];
      });
      console.log(messages);
    });
  }, []);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    socket.on("typingResponse", (data) => {
      setTypingStatus(data);
      setTimeout(() => {
        setTypingStatus("");
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
