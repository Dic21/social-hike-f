import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  eventName: "",
  maxMember: "",
  startTime: "",
  hikingTime: "",
  startPoint: { x: 0, y: 0 },
  endPoint: { x: 0, y: 0 },
  distance: "",
  hikingTrailID: "",
  hikingTrailDetail: "",
  description: "",
  difficulty: "",
  joinedMember: {},
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
    inputHikingTime: function (state, action) {
      state.hikingTime = action.payload;
    },
    inputStartTime: function (state, action) {
      state.startTime = action.payload;
    },
    inputStartPoint: function (state, action) {
      state.startPoint = action.payload;
    },
    inputEndPoint: function (state, action) {
      state.endPoint = action.payload;
    },
    inputDistance: function (state, action) {
      state.distance = action.payload;
    },
    inputDescription: function (state, action) {
      state.description = action.payload;
    },
    selectHikingTrail: function (state, action) {
      state.hikingTrailID = action.payload;
    },
    selectDifficulty: function (state, action) {
      state.difficulty = action.payload;
    },
    logHikingTrailDetail: function (state, action) {
      state.hikingTrailDetail = action.payload;
    },
    logJoinedMember: function (state, action) {
      state.joinedMember = action.payload;
    },
  },
});

export const {
  inputEventName,
  inputMaxMember,
  inputHikingTime,
  inputStartTime,
  inputStartPoint,
  inputEndPoint,
  inputDistance,
  inputDescription,
  selectDifficulty,
  selectHikingTrail,
  logHikingTrailDetail,
  logJoinedMember,
} = eventSlice.actions;

export default eventSlice.reducer;
