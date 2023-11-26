import { createSlice } from "@reduxjs/toolkit";

const initialLoginStatus = localStorage.getItem("id");

const loginStatusSlice = createSlice({
  name: "loginStatus",
  initialState: { isloggedIn: initialLoginStatus ? true : false },
  reducers: {
    login(state) {
      state.isloggedIn = true;
    },
    logout(state) {
      state.isloggedIn = false;
    },
  },
});

export const loginAction = loginStatusSlice.actions;

export default loginStatusSlice;
