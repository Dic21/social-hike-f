import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showList } from "../Slices/placeSlice";
import { Link } from "react-router-dom";
import placeStyle from "../Place.module.css";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const HikingTrails = () => {
  const { list } = useSelector((state) => {
    return state.place;
  });
  const dispatch = useDispatch();
  let placeList = [];
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch("/places")
      .then((resData) => resData.json())
      .then((data) => {
        placeList = data.place;
        dispatch(showList(placeList));
      });
  };

  let hikingTrail = [
    //TODO out in db
    {
      position: [22.27463, 114.14907],
      name: "港島徑",
      distance: 50,
      id: "p01",
    },
    {
      position: [22.26405, 113.99998],
      name: "鳳凰徑",
      distance: 70,
      id: "p02",
    },
    {
      position: [22.22709, 114.20714],
      name: "衞奕信徑",
      distance: 78,
      id: "p03",
    },
    {
      position: [22.39651, 114.32681],
      name: "麥理浩徑",
      distance: 100,
      id: "p04",
    },
  ];

  return (
    <div>
      <h2>HikingTrails</h2>
      <MapContainer
        center={[22.31463, 114.15907]}
        zoom={11}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {hikingTrail.map(({ position, name, distance, id }) => {
          return (
            <Marker key={name} position={position}>
              <Popup>
                <div style={{fontWeight: 600, fontSize: 20}}>{name}</div>
                <p>全長:{distance}公里</p>
                <button>
                  <Link to={`/place/${id}`}>查看正在舉行的活動</Link>
                </button>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
      <br></br>
      
      <div>
        <div className={placeStyle.recomtitle}>推薦地點</div>
        <div className={placeStyle.selection}>
          {list.map((item) => {
            return (
              <Link
                key={item.name}
                to={`/place/${item.id}`}
                className={placeStyle.linkbox}
              >
                <div className={placeStyle.imgcontainer}>
                  <div className={placeStyle.box} id={placeStyle[item.id]}></div>
                  <div className={placeStyle.textbox}></div>
                </div>
                <div className={placeStyle.para}>
                  <div className={placeStyle.title}>{item.chi_name}</div>
                  <div className={placeStyle.small}>{item.name}</div>
                  <div className={placeStyle.small}>
                    可參加活動: {item.num ? item.num : 0}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default HikingTrails;
