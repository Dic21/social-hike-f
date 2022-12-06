import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginID: "",
  loginPassword: "",
  loginErrorMsg: "",
  isLogin: localStorage.getItem("token") !== null ? true : false,
};

export const loginSlice = createSlice({
  name: "login",
  initialState: { ...initialState },
  reducers: {
    inputLoginID: function (state, action) {
      state.loginID = action.payload;
    },
    inputLoginPassword: function (state, action) {
      state.loginPassword = action.payload;
    },
    logLoginErrorMessage: function (state, action) {
      state.loginErrorMsg = action.payload;
    },
    logIsLogin: function (state, action) {
      state.isLogin = action.payload;
    },
  },
});

export const {
  inputLoginID,
  inputLoginPassword,
  logLoginErrorMessage,
  logIsLogin,
} = loginSlice.actions;

export default loginSlice.reducer;
