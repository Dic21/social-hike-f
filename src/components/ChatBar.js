import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import chatStyle from "../Chat.module.css";
import GetLocation from "../Components/GetLocation";
import { logHikingTrailDetail } from "../Slices/eventSlice";

const ChatBar = ({ socket }) => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const { eventId } = useParams();
  // const { host } = useSelector((state) => {
  //   return state.chat;
  // });
  const { hikingTrailDetail } = useSelector((state) => {
    return state.event;
  });

  const handleClick = () => {
    navigate(`/event/${eventId}/joiner-location`);
  };

  useEffect(() => {
    socket.on("newUserResponse", (data) => setUsers(data));
  }, [socket, users]);

  console.log(users);

  const dispatch = useDispatch();
  // const getEventDetail = () => {
  //   fetch(`/event/${eventId}/detail`, {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     method: "GET",
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.success) {
  //         console.log(data);
  //         dispatch(logHikingTrailDetail(data.eventInfo[0]));
  //       } else {
  //         console.log("Cannot get data!");
  //       }
  //     });
  // };

  return (
    <div className={chatStyle.chat__sidebar}>
      <div>
        <h4 className={chatStyle.chat__header}>在線用戶</h4>
        <div className={chatStyle.chat__users}>
          {users.map((user) => {
            if (user.owner === hikingTrailDetail.host) {
              return <p key={user.socketID}>{user.currentUser} (HOST)</p>;
            } else {
              return <p key={user.socketID}>{user.currentUser}</p>;
            }
          })}
        </div>
      </div>
      <GetLocation />
      {/* <button onClick={handleClick}>顥示用戶實時位置</button> */}
    </div>
  );
};

export default ChatBar;
