import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Event from "./Components/Event";
import EventDetail from "./Components/EventDetail";
import Login from "./Components/Login";
import Register from "./Components/Register";
import HikingTrails from "./Components/HikingTrails";
import HikingTrailsDetail from "./Components/HikingTrailsDetail";

function Protected(props) {
  return props.loggedIn ? (
    props.children
  ) : (
    <Navigate to="/login" replace={true} />
  );
}

function App() {
  // const [loggedIn] = useSelector(function(state){return state.bank.loggedIn;});

  return (
    <div className="App">
      {/* <Login /> */}
      {/* <Event /> */}
      {/* <EventDetail /> */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/event"
          element={
            // <Protected>
            <Event />
            // </Protected>
          }
        ></Route>
        <Route path="/event/:eventId/detail" element={<EventDetail />} />

        <Route path="/place" element={<HikingTrails />}>
          {/* <Route path=":placeId" element={<HikingTrailsDetail/>}/> */}
        </Route>
        <Route path="/place/:placeId" element={<HikingTrailsDetail />} />
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
