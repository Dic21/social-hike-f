import React, { useEffect } from "react";
import length from "leaflet-geometryutil";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
  MapConsumer,
} from "react-leaflet";
import L from "leaflet";
import { Icon } from "leaflet";
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
        username: "jayjay",
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
        <span> Event name</span>
        <input
          type="text"
          onChange={(e) => {
            dispatch(inputEventName(e.target.value));
          }}
        />
      </div>

      <div className="input-max-number">
        <span> Max Number</span>
        <input
          type="text"
          onChange={(e) => {
            dispatch(inputMaxMember(e.target.value));
          }}
        />
      </div>

      <div className="input-start-time">
        <span> Start Time</span>
        <input
          type="datetime-local"
          onChange={(e) => {
            console.log(e.target.value);
            dispatch(inputStartTime(e.target.value));
          }}
        />
      </div>

      <div className="input-hiking-time">
        <span> Hiking Time</span>
        <input
          type="text"
          onChange={(e) => {
            dispatch(inputHikingTime(e.target.value));
          }}
        />
      </div>

      <div className="start-point">
        <span>Start Point: </span>
        <span>lat:{startPoint.x} </span>
        <span>lng:{startPoint.y}</span>
      </div>

      <div className="end-point">
        <span>End Point: </span>
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
        distance:{distance ? distance.toFixed(2) : null}m
      </div>

      <div className="select-place">
        <span>place:</span>
        <select
          name="place"
          id="place"
          onChange={(e) => {
            console.log(e.target.value);
            dispatch(selectHikingTrail(e.target.value));
          }}
        >
          <option value="">--Select Hiking Trail--</option>
          <option value="p01">Hong Kong Trail</option>
          <option value="p02">Lantau Trail</option>
          <option value="p03">Wilson Trail</option>
          <option value="p04">Maclehose Trail</option>
        </select>
      </div>

      <div className="input-description">
        <span> Description</span>
        <textarea
          placeholder="input description here"
          onChange={(e) => {
            dispatch(inputDescription(e.target.value));
          }}
        ></textarea>
      </div>

      <div className="select-difficulty">
        <span>Difficulty:</span>
        <select
          name="difficulty"
          id="difficulty"
          onChange={(e) => {
            dispatch(selectDifficulty(e.target.value));
          }}
        >
          <option value="">--Select Difficulty--</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <button onClick={handleCreateEvent}>Create event</button>

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
