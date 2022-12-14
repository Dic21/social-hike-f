import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { logHikingTrailDetail, logJoinedMember } from "../Slices/eventSlice";
import { logCurrentUser } from "../Slices/chatSlice";
import moment from "moment";
import "moment/locale/zh-hk";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Polyline,
} from "react-leaflet";

const EventDetail = ({ socket }) => {
  // const [currentUser, setCurrentUser] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { hikingTrailDetail, joinedMember } = useSelector((state) => {
    return state.event;
  });
  const { currentUser } = useSelector((state) => {
    return state.chat;
  });

  const { eventId } = useParams();
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

  const handleJoinEvent = async () => {
    await fetch(`/get-current-user`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      method: "GET",
      // body: JSON.stringify({
      //   eventId: 4,
      // }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // setCurrentUser(data.user);
        dispatch(logCurrentUser(data.user.user));
        // console.log(typeof eventID);
        console.log(currentUser);
        // console.log("JOIN", eventID);
        socket.emit("newUser", {
          currentUser: data.user.user,
          socketID: socket.id,
        });
        socket.emit("join", eventID);
      });
    // console.log(id);
    // console.log(currentUser);

    navigate(`/chat/${eventID}`);
  };

  const getEnrolledMember = () => {
    // console.log(hikingTrailID);

    fetch(`/join-record`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        eventId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.success) {
          dispatch(logJoinedMember(data));
          console.log(data);
        } else {
          console.log("Cannot get data!");
        }
      });
  };

  useEffect(() => {
    getEventDetail();
    getEnrolledMember();
  }, []);

  const {
    event_name: event,
    id: eventID,
    host,
    place_id,
    difficulty,
    description,
    start_location: start,
    end_location: end,
    event_start_time: startTime,
    maxnum_teammate: max,
  } = hikingTrailDetail;

  const localStartTime = moment(startTime).format("YYYY-MM-DD HH:mm:ss");
  // const date = localStartTime?.split(":")[0].slice(0, 10);
  const date = localStartTime?.slice(0, 10);
  const hour = localStartTime?.split(" ")[1].split(":")[0];
  const minutes = localStartTime?.split(" ")[1].split(":")[1];
  const time = `${hour}:${minutes}`;
  //   console.log(joinedMember.length, max);
  //   console.log(joinedMember.length > max);

  const polyline = [
    [start?.x, start?.y],
    [end?.x, end?.y],
  ];

  let defaultMapPosition;

  //   if (place_id === "p01") {
  //     defaultMapPosition = [22.27463, 114.14907];
  //   } else if (place_id === "p02") {
  //     defaultMapPosition = [22.26405, 113.99998];
  //   } else if (place_id === "p03") {
  //     defaultMapPosition = [22.22709, 114.20714];
  //   } else if (place_id === "p04") {
  //     defaultMapPosition = [22.39651, 114.32681];
  //   } else {
  //     defaultMapPosition = [22.3128786, 114.2115803];
  //   }
  return (
    <div style={{ backgroundColor: "orangered", width: "500px" }}>
      <h1>{event}</h1>

      {start ? (
        <MapContainer
          center={start ? [start?.x, start?.y] : [22.3128786, 114.2115803]}
          zoom={15}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {start ? <Marker position={[start?.x, start?.y]}></Marker> : null}
          {start ? <Marker position={[end?.x, end?.y]}></Marker> : null}

          {start ? (
            <Polyline pathOptions={{ color: "red" }} positions={polyline} />
          ) : null}
        </MapContainer>
      ) : (
        <div>Cannot load map! Insufficient Data</div>
      )}

      <h5>日期:{date}</h5>
      <h5>時間:{time}</h5>

      <h5>難度:{difficulty}</h5>
      <h5>最多人數: {max}</h5>

      <button
        onClick={handleJoinEvent}
        disabled={joinedMember.length > max ? true : false}
      >
        加入活動
      </button>
      {joinedMember.length > max ? <p>抱歉，此活動已滿</p> : null}
    </div>
  );
};

export default EventDetail;
