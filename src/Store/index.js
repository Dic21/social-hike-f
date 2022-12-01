import { configureStore } from "@reduxjs/toolkit";
import eventReducer from "../Slices/eventSlice";

export default configureStore({
  reducer: {
    event: eventReducer,
  },
});
