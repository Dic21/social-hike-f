import "./App.css";
import { Route, Routes, Navigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Event from "./Components/Event";
import EventDetail from "./Components/EventDetail";
import Login from "./Components/Login";
import Register from "./Components/Register";
import HikingTrails from "./Components/HikingTrails";
import HikingTrailsDetail from "./Components/HikingTrailsDetail";
import ChatPage from "./Components/ChatPage";
import socketIO from "socket.io-client";
import loginImage from "./Images/login.svg";
import Home from "./Components/Home";
import { useEffect, useState } from "react";
import { logIsLogin } from "./Slices/loginSlice";
import { useDispatch } from "react-redux";
import MemberPage from "./Components/MemberPage";

const socket = socketIO.connect();

function Protected(props) {
  return props.loggedIn ? (
    props.children
  ) : (
    <Navigate to="/login" replace={true} />
  );
}

function IsLoggedIn(props) {
  return props.loggedIn ? <Navigate to="/" replace={true} /> : props.children;
}

function Nav() {
  const [currentUser, setCurrentUser] = useState("");
  const { isLogin } = useSelector((state) => {
    return state.login;
  });

  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logIsLogin(false));
    setCurrentUser("");
  };

  const getCurrentUser = async () => {
    await fetch(`/get-current-user`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      method: "GET",
      // body: JSON.stringify({
      //   eventId: 4,
      // }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setCurrentUser(data.user.user);
      });
    // console.log(id);
    // console.log(currentUser);
  };

  getCurrentUser();

  return (
    <nav>
      <Link to="/">主頁</Link>
      <span className="dropdown">
        <span>推薦地點</span>
        <div className="dropdown-content">
          <div>
            <Link to="/place/p01">港島徑</Link>
          </div>
          <div>
            <Link to="/place/p02">鳳凰徑</Link>
          </div>
          <div>
            <Link to="/place/p03">衛奕信徑</Link>
          </div>
          <div>
            <Link to="/place/p04">麥理浩徑</Link>
          </div>
        </div>
      </span>

      <span className="navright">
        {!isLogin ? (
          <>
            <Link to="/login">
              <span>
                <img src={loginImage} alt="login" /> 登入
              </span>
            </Link>
            <Link to="/register">
              <span>註冊</span>
            </Link>
          </>
        ) : (
          <>
             <span>歡迎回來 {currentUser}</span>
            <Link to="/member">
              <span>member</span>
            </Link>

            <Link to="/login">
              <span onClick={handleLogout}>登出</span>
            </Link>
          </>
        )}
      </span>
    </nav>
  );
}

function App() {
  const { isLogin } = useSelector((state) => {
    return state.login;
  });

  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<HikingTrails />} />

        <Route
          path="/login"
          element={
            <IsLoggedIn loggedIn={isLogin}>
              <Login />
            </IsLoggedIn>
          } />


        <Route
          path="/register"
          element={
            <IsLoggedIn loggedIn={isLogin}>
              <Register />
            </IsLoggedIn>
          }
        />

        <Route
          path="/event"
          element={
            <Protected loggedIn={isLogin}>
              <Event />
            </Protected>
          }
        />

        <Route
          path="/member"
          element={
            <Protected loggedIn={isLogin}>
              <MemberPage />
            </Protected>
          }
        />

        <Route
          path="/home"
          element={
              <Home />
          }
        />



        <Route
          path="/event/:eventId/detail"
          element={<EventDetail socket={socket} />}
        />

        <Route path="/place/:placeId" element={<HikingTrailsDetail />} />
        <Route path="/place/:placeId" element={<HikingTrailsDetail />} />
        {/* <Route path="/chat/home" element={<Home socket={socket} />}></Route> */}
        <Route
          path="/chat/:eventID"
          element={<ChatPage socket={socket} />}
        ></Route>
      </Routes>


      {/* <Routes>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/create-event" element={
          <Protected>
            <Event/>
          </Protected>}>
        </Route>
        <Route path="/place" element={<HikingTrails/>}>
          {/* <Route path=":placeId" element={<HikingTrailsDetail/>}/> */}
      {/* </Route>
        <Route path="/place/:placeId" element={<HikingTrailsDetail/>}/> */}{" "}
    </div>
  );
}

export default App;
