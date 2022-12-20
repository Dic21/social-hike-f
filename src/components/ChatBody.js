import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logCurrentUser } from "../Slices/chatSlice";
import { logHikingTrailDetail } from "../Slices/eventSlice";
import chatStyle from "../Chat.module.css";

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
      <header className={chatStyle.chat__mainHeader}>
        <p>{hikingTrailDetail.event_name}行山團</p>
        {currentUser === hikingTrailDetail.host ? (
          <div>
            <button className={chatStyle.walkie__btn} onClick={handleLeaveChat}>
              開始實時對話
            </button>
            <button className={chatStyle.walkie__btn} onClick={handleLeaveChat}>
              靜音
            </button>
            <button className={chatStyle.walkie__btn} onClick={handleLeaveChat}>
              取消靜音
            </button>
          </div>
        ) : (
          <div>
            {/* <audio autoplay id="video"></audio> */}
            <button className={chatStyle.walkie__btn} onClick={handleLeaveChat}>
              收聽對講機
            </button>
          </div>
        )}
        <button className={chatStyle.leaveChat__btn} onClick={handleLeaveChat}>
          離開對話
        </button>
      </header>

      <div className={chatStyle.message__container}>
        {messages.map((message) =>
          message.name === currentUser ? (
            <div className={chatStyle.message__chats} key={message.id}>
              <p className={chatStyle.sender__name}>你</p>
              <div className={chatStyle.message__sender}>
                <p>{message.text}</p>
                <p>{message.time}</p>
              </div>
            </div>
          ) : (
            <div className={chatStyle.message__chats} key={message.id}>
              <p>{message.name}</p>
              <div className={chatStyle.message__recipient}>
                <p>{message.text}</p>
                <p>{message.time}</p>
              </div>
            </div>
          )
        )}

        <div className={chatStyle.message__status}>
          <p>{typingStatus}</p>
        </div>
        <div ref={lastMessageRef} />
      </div>
    </>
  );
};

export default ChatBody;
