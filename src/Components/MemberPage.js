import React, { useEffect, useState } from "react";

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
    fetch("/join-record",{
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
      getHistory();
    })
  }


  return (
    <div className="member-nav">
      <h2> member info</h2>
      <ul>
        <li>username : {Member ? Member.user : null}</li>
        <li>usernId : {Member ? Member.userId : null}</li>
      </ul>

      <h2>record</h2>

      <div>joined-actitiy{
        HistoryList ? HistoryList.map((item) => {
          return (
            <div key={item.event_id}>
              <li>event-name: {item.event_name}  event-Id: {item.event_id}
                <button onClick={()=>{handleOnClick(item.event_id)}}>Delete</button>
              </li>
            </div>)
        }) : null
      }</div>

    </div>
  );
}


export default MemberPage;