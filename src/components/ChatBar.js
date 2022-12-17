import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
    <div className="chat__sidebar">
      <h2>Open Chat</h2>
      <div>
        <h4 className="chat__header">ACTIVE USERS</h4>
        <div className="chat__users">
          {users.map((user) => (
            <p key={user.socketID}>{user.currentUser}</p>
          ))}
        </div>
      </div>
      <button onClick={handleClick}>Show Participants location</button>
    </div>
  );
};

export default ChatBar;
