import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


const HikingTrails = () => {
  const dispatch = useDispatch();
  let placeList = [];
  useEffect(()=>{
    fetchData();
  },[])

  const fetchData = ()=>{
    fetch("/places").then(resData=>resData.json()).then((data)=>{
      placeList = data.place;
      console.log(placeList);
      dispatch();
    })
  }

  return (
    <div>
      <h2>HikingTrails</h2>
      {placeList.map((item)=>{
        return <div key={item.name}>{item.name}</div>
      })}


    </div>


    
  );
};

export default HikingTrails;
