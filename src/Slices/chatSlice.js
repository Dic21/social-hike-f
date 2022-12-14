import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  currentUser: "",
  messages: [],
  typingStatus: "",
  users: "",
};

export const chatSlice = createSlice({
  name: "chat",
  initialState: { ...initialState },
  reducers: {
    inputMessages: function (state, action) {
      //   console.log("abc", current(state.messages));
      //   state.messages = [...current(state.messages), action.payload];
      //   state.messages = action.payload;
      state.messages.push(action.payload);
    },
    logCurrentUser: function (state, action) {
      state.currentUser = action.payload;
    },
    logTypingStatus: function (state, action) {
      state.typingStatus = action.payload;
    },
    logActiveUsers: function (state, action) {
      state.users = action.payload;
    },
  },
});

export const {
  inputMessages,
  logCurrentUser,
  logTypingStatus,
  logActiveUsers,
} = chatSlice.actions;

export default chatSlice.reducer;
