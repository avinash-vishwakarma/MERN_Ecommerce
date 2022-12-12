import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
  user: {},
  isOtp: false,
  isChangePassword: false,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.isLogin = true;
      state.user = action.payload;
    },
    logout(state) {
      state.isLogin = false;
      state.user = null;
    },
    setOtp(state, action) {
      state.isOtp = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    setChangePassword(state, action) {
      state.isChangePassword = action.payload;
    },
  },
});

export const authActions = AuthSlice.actions;

export default AuthSlice.reducer;
