import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logCurrentUser } from "../Slices/chatSlice";

const ChatBody = ({ typingStatus, lastMessageRef, socket }) => {
  const navigate = useNavigate();

  const { eventID } = useParams();

  const handleLeaveChat = () => {
    navigate(`/event/${eventID}/detail`); //TODO

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

  console.log(currentUser);
  console.log(messages);
  return (
    <>
      <header className="chat__mainHeader">
        <p>Hangout with Colleagues</p>
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
