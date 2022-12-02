import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {showList} from "../Slices/placeSlice";
import {Link} from 'react-router-dom';
import placeStyle from '../Place.module.css';


const HikingTrails = () => {
  const {list} = useSelector((state)=>{return state.place});
  const dispatch = useDispatch();
  let placeList = [];
  useEffect(()=>{
    fetchData();
  },[])

  const fetchData = ()=>{
    fetch("/places").then(resData=>resData.json()).then((data)=>{
      placeList = data.place;
      dispatch(showList(placeList));
    })
  }

  return (
    <div>
      <h2>HikingTrails</h2>
      <div className={placeStyle.selection}>
      {list.map((item)=>{
        return (
          <Link key={item.name} to={`/place/${item.id}`} className={placeStyle.linkbox}>
                <div className={placeStyle.imgcontainer}>
                  <div className={placeStyle.box} id={placeStyle[item.id]}></div>
                  <div className={placeStyle.textbox}></div>
                </div>
                <div className={placeStyle.para}>
                  <div className={placeStyle.title}>{item.chi_name}</div>
                  <div className={placeStyle.small}>{item.name}</div>
                  <div className={placeStyle.small}>可參加活動: {item.num? item.num:0}</div>
                </div>
          </Link>)

      })}
      </div>

    </div>


    
  );
};

export default HikingTrails;
