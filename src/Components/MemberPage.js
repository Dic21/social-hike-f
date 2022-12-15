import React, { useEffect, useState } from "react";

// import {inputRegisterID,
//     inputRegisterName,
//     inputRegisterPassword,
//     logRegisterErrorMessage} 
//     from "../src/Slices/registerSlice";


// const {
//     username,
//     id,
//     registertime,
//     host
// } = memberDetail;







function MemberPage() {
    const [memberList, setMemberList] = useState(null);
    useEffect(() => {
        getDate();
    }, [])

    function getDate() {
        fetch(`/member-list`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            method: "GET",
        })
            .then((res) => res.json())
            .then((data) => {
                setMemberList(data[0])
                console.log(data[0])
            });

// if(memberList.length>0){

//     console.log(memberList);
// }


        // fetch('/member-list'), {
        //     headers: {
        //         "Content-Type": "application/json",
        //         Authorization: `Bearer ${localStorage.getItem("token")}`,
        //     },
        //     method: "GET"
        // }
        //     .then((response) => response.json())
        //     .then((data) => {

        //         setMemberList(data)
        //         console.log(data)
        //     });
        // console.log(data[0].id);
    }


    return (
        <div className="member-nav">
            <a href="">  memberinfo   </a>
            <a href="">  otheractivity  </a>
            <h2> member info</h2>
            <ul>
                <li>username : {memberList?memberList.username:null}</li>
                <li>usernId : {memberList?memberList.id:null}</li>
            </ul>

            <h2>record</h2>
            <ul>
                <li>joined-actitiy</li>
                host-fromevent
            </ul>
        </div>
    )
}

export default MemberPage;
