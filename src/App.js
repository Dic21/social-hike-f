import { Route, Routes } from "react-router-dom";
import "./App.css";
import Event from "./Components/Event";
import EventDetail from "./Components/EventDetail";
import Login from "./Components/Login";
import Register from "./Components/Register";
// import Login from "./Components/Login";

function App() {
  return (
    <div className="App">
      {/* <Login /> */}
      {/* <Event /> */}
      {/* <EventDetail /> */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/event" element={<Event />} />
        <Route path="/event/:eventId/detail" element={<EventDetail />} />
      </Routes>
    </div>
  );
}

export default App;
