import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Event from "./Components/Event";
import Login from "./Components/Login";
import HikingTrails from "./Components/HikingTrails";
import HikingTrailsDetail from "./Components/HikingTrailsDetail";

function Protected(props){
  return (
    props.loggedIn ? props.children: <Navigate to="/login" replace={true}/>
  )
}

function App() {
  // const [loggedIn] = useSelector(function(state){return state.bank.loggedIn;});

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/create-event" element={
          <Protected>
            <Event/>
          </Protected>}>
        </Route>
        <Route path="/place" element={<HikingTrails/>}>
          {/* <Route path=":placeId" element={<HikingTrailsDetail/>}/> */}

        </Route>
        <Route path="/place/:placeId" element={<HikingTrailsDetail/>}/>
        


      </Routes>
    </div>
  );
}

export default App;
