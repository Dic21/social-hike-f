import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Event from "./Components/Event";
import EventDetail from "./Components/EventDetail";
import Login from "./Components/Login";
import Register from "./Components/Register";
import HikingTrails from "./Components/HikingTrails";
import HikingTrailsDetail from "./Components/HikingTrailsDetail";
import ChatPage from "./Components/ChatPage";
import MemberPage from "./Components/MemberPage";
import Navbar from "./Components/Navbar";

import socketIO from "socket.io-client";

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

function App() {
  const { isLogin } = useSelector((state) => {
    return state.login;
  });

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HikingTrails />} />

        <Route
          path="/login"
          element={
            <IsLoggedIn loggedIn={isLogin}>
              <Login />
            </IsLoggedIn>
          }
        />

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
          path="/event/:eventId/detail"
          element={<EventDetail socket={socket} />}
        />

        <Route path="/place/:placeId" element={<HikingTrailsDetail />} />
        <Route path="/place/:placeId" element={<HikingTrailsDetail />} />

        <Route
          path="/chat/:eventId"
          element={
            <Protected loggedIn={isLogin}>
              <ChatPage socket={socket} />
            </Protected>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
