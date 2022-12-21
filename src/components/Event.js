import React, { useEffect } from "react";
import length from "leaflet-geometryutil";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import L from "leaflet";

import {
  inputEventName,
  inputMaxMember,
  inputStartTime,
  inputStartPoint,
  inputEndPoint,
  inputDistance,
  inputHikingTime,
  inputDescription,
  selectDifficulty,
  selectHikingTrail,
} from "../Slices/eventSlice";

const Event = () => {
  const dispatch = useDispatch();

  const {
    eventName,
    maxMember,
    startTime,
    startPoint,
    endPoint,
    distance,
    hikingTrailID,
    description,
    hikingTime,
    difficulty,
  } = useSelector((state) => {
    return state.event;
  });

  const { isLogin } = useSelector((state) => {
    return state.login;
  });

  const navigate = useNavigate();

  const wayPoint = [];

  function MapComponent() {
    const map = useMapEvents({
      click: (e) => {
        if (wayPoint.length < 1) {
          const { lat, lng } = e.latlng;
          L.marker([lat, lng])
            .bindPopup(
              `<h4>Start Point</h4>
              <p>lat:${lat}</p>
              <p>lng:${lng}</p>`
            )
            .openPopup()
            .addTo(map);

          wayPoint.push({ lat, lng, latlng: e.latlng });
        } else if (wayPoint.length < 2) {
          const { lat, lng } = e.latlng;
          L.marker([lat, lng])
            .bindPopup(
              `<h4>End Point</h4>
              <p>lat:${lat}</p>
              <p>lng:${lng}</p>`
            )
            .openPopup()
            .addTo(map);
          wayPoint.push({ lat, lng, latlng: e.latlng });
          dispatch(inputStartPoint({ x: wayPoint[0].lat, y: wayPoint[0].lng }));
          dispatch(inputEndPoint({ x: wayPoint[1].lat, y: wayPoint[1].lng }));
        }

        if (wayPoint[0] && wayPoint[1]) {
          // draw the line between points
          L.polyline([wayPoint[0].latlng, wayPoint[1].latlng], {
            color: "red",
          }).addTo(map);

          let length = L.GeometryUtil.length(
            // map,
            [wayPoint[0].latlng, wayPoint[1].latlng]
          );
          dispatch(inputDistance(length));
          console.log(length);
        }
      },
    });
    return null;
  }

  const handleCreateEvent = () => {
    fetch("/event", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        eventName: eventName,
        placeId: hikingTrailID,
        maxNumOfTeamMember: maxMember,
        startTime: startTime,
        startPoint: startPoint,
        endPoint: endPoint,
        //  path: LINESTRING(1 1,2 3,4 8, -6 3),
        difficulty: difficulty,
        distance: 1, //TODO
        description: description,
        isFinish: false,
        hikingTime: hikingTime,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.success) {
          alert("Event created successfully!");

          navigate(`/event/${data.insertId}/detail`);
        } else {
          alert("Please enter all require info!");
        }
      });
  };

  if (!isLogin) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <div className="input-event-name">
        <span> 活動名稱</span>
        <input
          type="text"
          onChange={(e) => {
            dispatch(inputEventName(e.target.value));
          }}
        />
      </div>

      <div className="input-max-number">
        <span> 最多人數</span>
        <input
          type="text"
          onChange={(e) => {
            dispatch(inputMaxMember(e.target.value));
          }}
        />
      </div>

      <div className="input-start-time">
        <span> 活動日期</span>
        <input
          type="datetime-local"
          onChange={(e) => {
            console.log(e.target.value);
            dispatch(inputStartTime(e.target.value));
          }}
        />
      </div>

      <div className="input-hiking-time">
        <span> 預計步行時間</span>
        <input
          type="text"
          onChange={(e) => {
            dispatch(inputHikingTime(e.target.value));
          }}
        />
      </div>

      <div className="start-point">
        <span>起點: </span>
        <span>lat:{startPoint.x} </span>
        <span>lng:{startPoint.y}</span>
      </div>

      <div className="end-point">
        <span>終點: </span>
        <span>lat:{endPoint.x} </span>
        <span>lng:{endPoint.y}</span>
      </div>

      {/* <div className="input-start-point">
        <div className="input-start-point-x">
          <span> Start point X</span>
          <input
            type="text"
            value={wayPoint[0] ? wayPoint[0].lat : ""}
            onChange={(e) => {
              dispatch(inputstartPointX(e.target.value));
            }}
          />
        </div>
        <div className="input-start-point-x">
          <span> Start point Y</span>
          <input
            type="text"
            value={wayPoint[0]?.lng}
            onChange={(e) => {
              dispatch(inputstartPointY(e.target.value));
            }}
          />
        </div>
      </div>

      <div className="input-end-point">
        <div className="input-end-point-x">
          <span> End point X</span>
          <input
            type="text"
            onChange={(e) => {
              dispatch(inputendPointX(e.target.value));
            }}
          />
        </div>
        <div className="input-end-point-x">
          <span> End point Y</span>
          <input
            type="text"
            onChange={(e) => {
              dispatch(inputendPointY(e.target.value));
            }}
          />
        </div>
      </div> */}

      <div className="distance">
        路線長度:{distance ? distance.toFixed(2) : null}米
      </div>

      <div className="select-place">
        <span>路線:</span>
        <select
          name="place"
          id="place"
          onChange={(e) => {
            console.log(e.target.value);
            dispatch(selectHikingTrail(e.target.value));
          }}
        >
          <option value="">--請選擇路線--</option>
          <option value="p01">港島徑</option>
          <option value="p02">鳳凰徑</option>
          <option value="p03">衞奕信徑</option>
          <option value="p04">麥理浩徑</option>
        </select>
      </div>

      <div className="input-description">
        <span> 行程描述</span>
        <textarea
          onChange={(e) => {
            dispatch(inputDescription(e.target.value));
          }}
        ></textarea>
      </div>

      <div className="select-difficulty">
        <span>難度:</span>
        <select
          name="difficulty"
          id="difficulty"
          onChange={(e) => {
            dispatch(selectDifficulty(e.target.value));
          }}
        >
          <option value="">--請選擇難度--</option>
          <option value="easy">容易</option>
          <option value="medium">中等</option>
          <option value="hard">困難</option>
        </select>
      </div>
      <button onClick={handleCreateEvent}>建立活動</button>

      <MapContainer
        center={[22.3128786, 114.2115803]}
        zoom={15}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapComponent />
      </MapContainer>
    </div>
  );
};

export default Event;
