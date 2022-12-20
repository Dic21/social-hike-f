import React, { useEffect, useState } from "react";
import PageStlyle from "../MemberPage.module.css";

function MemberPage(){
  const [Member , setMember]= useState(null);
  const [HistoryList ,setHistoryList]= useState(null);

  useEffect(()=>{
    getMember();
    getHistory();
  },[]);

  function getMember(){
    fetch("/get-current-user",{
      headers:{
        "Content-Type": "application/json",
         Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      method :"GET"
    })
    .then((res)=>res.json())
    .then((data)=>{
      setMember(data.user)
    });
  }
  function getHistory(){
    fetch("/member-record",{
      headers:{
        "Content-Type":"application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      method : "GET"
    })
    .then((res)=>res.json())
    .then((data)=>{
      setHistoryList(data.eventInfo)
    })
  };

  function handleOnClick(item){
    fetch(`/event/${item}/member`,{
      headers :{
        "Content-Type":"application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      method:"Delete"
    })
    .then((res)=>res.json())
    .then((data)=>{
      console.log(data)
      console.log(item)
      getHistory();
    })
  }


  return (
    <div>
      <h2 className={PageStlyle.pagetitle}>member info</h2>
        <p className={PageStlyle.subtitle}>Hi!{Member ? Member.user : null}</p>
      
        <div className={PageStlyle.wrapper}>
          <div className={PageStlyle.whitebox}>
            <h2 className={PageStlyle.whiteboxtitle}>Member info</h2>
            <div className={PageStlyle.detailbox}>
              <div>
                <p>username</p>
                <p>{Member ? Member.user : null}</p>
              </div>

              <div>
                <p>usernId</p>
                <p>{Member ? Member.userId : null}</p>

              </div>
            </div>

          </div>
        </div>

        <div className={PageStlyle.wrapper}>
          <div className={PageStlyle.whitebox}>
            <h2 className={PageStlyle.whiteboxtitle}>record</h2>

        <div className={PageStlyle.activityBox}>
          joined-activity
          {HistoryList ? HistoryList.map((item) => {
            return (
              <div key={item.event_id}>
                <div >
                  <li>event-name: {item.event_name} </li>
                  <li> event-Id: {item.event_id}</li>
                    <button onClick={()=>{handleOnClick(item.event_id)}}>Delete</button>
                </div>
              </div>)
          }) : null

        }</div>
      </div>
      </div>
    </div>
  );
}


export default MemberPage;
