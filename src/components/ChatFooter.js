import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import checkPageStatus from "../utils/function";

const ChatFooter = ({ socket }) => {
  const [message, setMessage] = useState("");
  const { eventID } = useParams();
  const [currentUser, setCurrentUser] = useState("");
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
        setCurrentUser(data.user.user);
      });
  };

  useEffect(() => {
    getInfo();
  }, []);

  const handleTyping = (e) => {
    socket.emit("typing", `${currentUser} is typing`);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit("message", {
        text: message,
        name: currentUser,
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
        room: eventID,
      });
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
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleTyping}
        />
        <button className="sendBtn">SEND</button>
      </form>
    </div>
  );
};

export default ChatFooter;
