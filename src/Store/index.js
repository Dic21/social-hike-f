import { configureStore } from "@reduxjs/toolkit";
import eventReducer from "../Slices/eventSlice";
import placeReducer from "../Slices/placeSlice";

export default configureStore({
  reducer: {
    event: eventReducer,
    place: placeReducer
  },
});
