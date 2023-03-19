/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: "",
  name: "",
  email: "",
  isLogin: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLogin = action.payload.isLogin || state.isLogin;
      state.userId = action.payload.userId || state.userId;
      state.name = action.payload.name || state.name;
      state.email = action.payload.email || state.email;
    },
    reset: (state) => {
      state.name = "";
      state.userId = "";
      state.email = "";
      state.isLogin = false;
    }
  },
});

export const { login, reset } = loginSlice.actions;

export default loginSlice.reducer;