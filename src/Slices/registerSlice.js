import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  registerID: "",
  registerName: "",
  registerPassword: "",
  registerErrorMsg: "",
};

export const registerSlice = createSlice({
  name: "register",
  initialState: { ...initialState },
  reducers: {
    inputRegisterID: function (state, action) {
      state.registerID = action.payload;
    },
    inputRegisterName: function (state, action) {
      state.registerName = action.payload;
    },
    inputRegisterPassword: function (state, action) {
      state.registerPassword = action.payload;
    },
    logRegisterErrorMessage: function (state, action) {
      state.registerErrorMsg = action.payload;
    },
  },
});
export const {
  inputRegisterID,
  inputRegisterName,
  inputRegisterPassword,
  logRegisterErrorMessage,
} = registerSlice.actions;
export default registerSlice.reducer;
