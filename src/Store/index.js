import { configureStore } from "@reduxjs/toolkit";
import eventReducer from "../Slices/eventSlice";
import loginReducer from "../Slices/loginSlice";
import registerReducer from "../Slices/registerSlice";
import placeReducer from "../Slices/placeSlice";

export default configureStore({
  reducer: {
    event: eventReducer,
    login: loginReducer,
    register: registerReducer,
    place: placeReducer
  },
});
