import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useNavigate, useParams } from "react-router-dom";

const GetLocation = () => {
  const [position, setPosition] = useState(null);
  const [positionData, setPositionData] = useState([]);
  const { eventId } = useParams();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/chat/${eventId}`);
  };

  const addLocation = (coords) => {
    fetch(`/event/${eventId}/location`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      method: "POST",
      body: JSON.stringify({
        lat: coords.latitude,
        lng: coords.longitude,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  const getParticipantsCurrentLocation = () => {
    fetch(`/event/${eventId}/participants-current-location`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setPositionData(data.message);
      });
  };
  console.log(positionData);

  useEffect(() => {
    let timer = setInterval(() => {
      navigator.geolocation.getCurrentPosition((position) => {
        setPosition(position.coords);

        addLocation(position.coords);
        getParticipantsCurrentLocation();
      });
    }, 5000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div>
      <MapContainer
        center={[22.31463, 114.15907]}
        zoom={12}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {positionData.map((data, i) => {
          return (
            <Marker key={i} position={[data.location.x, data.location.y]}>
              <Popup>{data.name}</Popup>
            </Marker>
          );
        })}
      </MapContainer>
      {positionData.length === 0 ? <p>正在尋找你的位置...</p> : null}
      <button onClick={handleClick}>返回對話</button>
    </div>
  );
};

export default GetLocation;
