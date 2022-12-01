import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  eventName: "",
  maxMember: "",
  startTime: "",
  startPoint: { x: 0, y: 0 },
  endPoint: { x: 0, y: 0 },
  hikingTrail: "",
  description: "",
  difficulty: "",
};

export const eventSlice = createSlice({
  name: "event",
  initialState: { ...initialState },
  reducers: {
    inputEventName: function (state, action) {
      state.eventName = action.payload;
    },
    inputMaxMember: function (state, action) {
      state.maxMember = action.payload;
    },
    inputStartTime: function (state, action) {
      state.startTime = action.payload;
    },
    inputstartPointX: function (state, action) {
      state.startPoint.x = action.payload;
    },
    inputstartPointY: function (state, action) {
      state.startPoint.y = action.payload;
    },
    inputendPointX: function (state, action) {
      state.endPoint.x = action.payload;
    },
    inputendPointY: function (state, action) {
      state.endPoint.x = action.payload;
    },
    inputDescription: function (state, action) {
      state.description = action.payload;
    },
    selectHikingTrail: function (state, action) {
      state.hikingTrail = action.payload;
    },
    selectDifficulty: function (state, action) {
      state.difficulty = action.payload;
    },
  },
});

export const {
  inputEventName,
  inputMaxMember,
  inputStartTime,
  inputstartPointX,
  inputstartPointY,
  inputendPointX,
  inputendPointY,
  inputDescription,
  selectDifficulty,
  selectHikingTrail,
} = eventSlice.actions;

export default eventSlice.reducer;
