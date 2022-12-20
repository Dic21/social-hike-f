import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import chatStyle from "../Chat.module.css";
import GetLocation from "../Components/GetLocation";

const ChatBar = ({ socket }) => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const { eventId } = useParams();

  const handleClick = () => {
    navigate(`/event/${eventId}/joiner-location`);
  };

  useEffect(() => {
    socket.on("newUserResponse", (data) => setUsers(data));
  }, [socket, users]);

  console.log(users);

  return (
    <div className={chatStyle.chat__sidebar}>
      <h2 style={{ color: "red", fontSize: "50px" }}>小行書</h2>
      <div>
        <h4 className="chat__header">ACTIVE USERS</h4>
        <div className="chat__users">
          {users.map((user) => (
            <p key={user.socketID}>{user.currentUser}</p>
          ))}
        </div>
      </div>
      <GetLocation />
      {/* <button onClick={handleClick}>顥示用戶實時位置</button> */}
    </div>
  );
};

export default ChatBar;
