import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageStyle from "../MemberPage.module.css";

function MemberPage() {
  const [Member, setMember] = useState(null);
  const [HistoryList, setHistoryList] = useState(null);

  useEffect(() => {
    getMember();
    getHistory();
  }, []);

  function getMember() {
    fetch("/get-current-user", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setMember(data.user);
      });
  }
  function getHistory() {
    fetch("/member-record", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setHistoryList(data.eventInfo);
      });
  }

  function handleOnClick(item) {
    fetch(`/event/${item}/member`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      method: "Delete",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log(item);
        getHistory();
      });
  }

  return (
    <div>
      <h2 className={PageStyle.pagetitle}>會員資訊</h2>
      <p className={PageStyle.subtitle}>你好! {Member ? Member.user : null}</p>

      <div className={PageStyle.wrapper}>
        <div className={PageStyle.whitebox}>
          <h2 className={PageStyle.whiteboxTitle}>會員資訊</h2>
          <div className={PageStyle.detailbox}>
            <div>
              <p>用戶名稱</p>
              <p>{Member ? Member.user : null}</p>
            </div>

            <div>
              <p>用戶帳號</p>
              <p>{Member ? Member.userId : null}</p>
            </div>
          </div>
        </div>
      </div>

      <div className={PageStyle.wrapper}>
        <div className={PageStyle.whitebox2}>
          <h2 className={PageStyle.whiteboxTitle}>己報名活動</h2>

          <div className={PageStyle.activityBox}>
            <div className={PageStyle.activityWrapper}>
              {HistoryList
                ? HistoryList.map((item) => {
                    return (
                      <>
                        <div className={PageStyle.eventInfo}>
                          <Link
                            className={PageStyle.eventUrl}
                            to={`/event/${item.event_id}/detail`}
                            key={item.event_id}
                          >
                            <ul className={PageStyle.activityUl}>
                              <li>活動名稱: {item.event_name} </li>
                              <li>活動編號: {item.event_id}</li>
                            </ul>
                          </Link>
                          <button
                            className={PageStyle.activityBtn}
                            onClick={() => {
                              handleOnClick(item.event_id);
                            }}
                          >
                            離開活動
                          </button>
                        </div>
                      </>
                    );
                  })
                : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemberPage;
