import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logCurrentUser } from "../Slices/chatSlice";
import { logHikingTrailDetail } from "../Slices/eventSlice";

const ChatBody = ({ typingStatus, lastMessageRef, socket }) => {
  const navigate = useNavigate();

  const { eventId } = useParams();

  const handleLeaveChat = () => {
    navigate(`/event/${eventId}/detail`); //TODO

    window.location.reload();
  };

  const dispatch = useDispatch();

  // socket.on("join-room-message", (message) => {
  //   console.log(message);
  // });
  // socket.on("room-brocast", (message) => {
  //   console.log(message);
  //   setJoinMessage(message);
  // });
  const { currentUser, messages } = useSelector((state) => {
    return state.chat;
  });
  // const [currentUser, setCurrentUser] = useState("");
  // const getInfo = async () => {
  //   await fetch(`/get-current-user`, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${localStorage.getItem("token")}`,
  //     },
  //     method: "GET",
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       // console.log(data);
  //       // console.log(data.user.user);
  //       dispatch(logCurrentUser(data.user.user));
  //       console.log(currentUser);
  //     });
  // };

  // useEffect(() => {
  //   getInfo();
  // }, []);

  const { hikingTrailDetail } = useSelector((state) => {
    return state.event;
  });
  const getEventDetail = () => {
    // console.log(hikingTrailID);
    // console.log(`hello`);

    fetch(`/event/${eventId}/detail`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log(data);
          dispatch(logHikingTrailDetail(data.eventInfo[0]));
        } else {
          console.log("Cannot get data!");
        }
      });
  };
  console.log(currentUser);
  console.log(messages);
  console.log(hikingTrailDetail.host);

  useEffect(() => {
    getEventDetail();
  }, []);
  return (
    <>
      <header className="chat__mainHeader">
        <p>Hangout with Colleagues</p>
        {currentUser === hikingTrailDetail.host ? (
          <div>
            <button className="walkie__btn" onClick={handleLeaveChat}>
              Start Stream
            </button>
            <button className="walkie__btn" onClick={handleLeaveChat}>
              Mute
            </button>
            <button className="walkie__btn" onClick={handleLeaveChat}>
              Unmute
            </button>
          </div>
        ) : (
          <div>
            {/* <audio autoplay id="video"></audio> */}
            <button className="walkie__btn" onClick={handleLeaveChat}>
              View Stream
            </button>
          </div>
        )}
        <button className="leaveChat__btn" onClick={handleLeaveChat}>
          LEAVE CHAT
        </button>
      </header>

      <div className="message__container">
        {messages.map((message) =>
          message.name === currentUser ? (
            <div className="message__chats" key={message.id}>
              <p className="sender__name">You</p>
              <div className="message__sender">
                <p>{message.text}</p>
              </div>
            </div>
          ) : (
            <div className="message__chats" key={message.id}>
              <p>{message.name}</p>
              <div className="message__recipient">
                <p>{message.text}</p>
              </div>
            </div>
          )
        )}

        {/* <p>{joinMesssage}</p> */}
        <div className="message__status">
          <p>{typingStatus}</p>
        </div>
        <div ref={lastMessageRef} />
      </div>
    </>
  );
};

export default ChatBody;
