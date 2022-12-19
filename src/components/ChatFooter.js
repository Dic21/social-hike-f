import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import checkPageStatus from "../utils/notification";
import {
  inputMessages,
  logCurrentUser,
  logTypingStatus,
  logActiveUsers,
} from "../Slices/chatSlice";
import { useSelector, useDispatch } from "react-redux";

const ChatFooter = ({ socket }) => {
  const { currentUser, messages, typingStatus } = useSelector((state) => {
    return state.chat;
  });
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");
  // const [currentUser, setCurrentUser] = useState("");
  const { eventID } = useParams();
  const getInfo = async () => {
    await fetch(`/get-current-user`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        dispatch(logCurrentUser(data.user.user));
      });
  };

  const handleTyping = (e) => {
    socket.emit("typing", `${currentUser} is typing`);
  };

  const messageDetail = {
    text: message,
    name: currentUser,
    id: `${socket.id}${Math.random()}`,
    socketID: socket.id,
    room: eventID,
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      dispatch(inputMessages(messageDetail));
      socket.emit("message", messageDetail);
      checkPageStatus(message, currentUser);
      setMessage("");
    }
  };
  return (
    <div className="chat__footer">
      <form className="form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onFocus={getInfo}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          onKeyDown={handleTyping}
        />
        <button className="sendBtn">SEND</button>
      </form>
    </div>
  );
};

export default ChatFooter;
