import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {showDetails} from "../Slices/placeSlice";
import {Link, useParams} from 'react-router-dom';
import placeStyle from '../Place.module.css';


const HikingTrailsDetail = () => {
  const { details } = useSelector((state)=>{return state.place});

  const { placeId } = useParams();
  const dispatch = useDispatch();
  let info, eventData;
  useEffect(()=>{
    fetchData();
  }, [])

  const fetchData = ()=>{
    fetch(`/place/${placeId}`).then(resData=>resData.json()).then((data)=>{
      info = data.info[0];
      eventData = data.event;
      let details= {
        info,
        eventData
      }
      dispatch(showDetails(details));
      console.log(details);
    })
  }



  if(!details){
    return <div>Loading...</div>
  }
  return (
    <div>
      <div className={placeStyle.banner} >
        <div id={placeStyle[details.info.id]}>   
          {/* <div>{details && details.name}</div> */}   
          <h3>{details.info.chi_name}</h3>
          <div>{details.info.description}</div>
        </div>
      </div>

      <div className={placeStyle.detailcontainer}>
        <div className={placeStyle.left}>
          <div className={placeStyle["event-headline"]}>
            <div className={placeStyle.mediumtitle}>活動</div>
            
            <span className={placeStyle["event-headline-right"]}>
              <span className={placeStyle.createbtn}>建立活動</span>
              正在開放的活動: {details.info.num? details.info.num: 0}
            </span>
          </div>
          <div className={placeStyle['event-container']}>          
            {details.eventData.length>=1? details.eventData.map((event)=>{
              return (
                <div className={placeStyle.eventbox} key={event.id}>
                  <h5>🏞️{event.event_name}</h5>
                  <span>詳情</span>
                  <div>領隊:{event.host}</div>
                  <div>難度:{event.difficulty}</div>
                  <div>日期:{event.event_start_time}</div>
                  <div>行程描述:{event.description}</div>
                </div>)
            }):<div>Currently no available event</div>}
          </div>
        </div>

        <div className={placeStyle.right}>
          <div>
            <Comment/>
          </div>
        </div>
      </div>
    </div>
  );
};


const Comment = ()=>{
  return(
    <div>
      評論
    </div>
  )
}

export default HikingTrailsDetail;
