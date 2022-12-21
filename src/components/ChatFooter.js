import React, { useState } from "react";
import { useParams } from "react-router-dom";
import checkPageStatus from "../utils/notification";
import { inputMessages, logCurrentUser } from "../Slices/chatSlice";
import { useSelector, useDispatch } from "react-redux";
import chatStyle from "../Chat.module.css";

const ChatFooter = ({ socket }) => {
  const { currentUser } = useSelector((state) => {
    return state.chat;
  });
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");

  const { eventId } = useParams();
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

  const getTime = () => {
    let hour = new Date().getHours();
    let minute = new Date().getMinutes();
    if (minute < 10) {
      minute = `0${minute}`;
    }

    const time = `${hour}:${minute}`;
    return time;
    // console.log(time);
  };

  const messageDetail = {
    text: message,
    name: currentUser,
    id: `${socket.id}${Math.random()}`,
    socketID: socket.id,
    room: eventId,
    time: getTime(),
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
    <div className={chatStyle.chat__footer}>
      <form className={chatStyle.form} onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="輸入訊息"
          className={chatStyle.message}
          value={message}
          onFocus={getInfo}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          onKeyDown={handleTyping}
        />
        <button className={chatStyle.sendBtn}>傳送</button>
      </form>
    </div>
  );
};

export default ChatFooter;
