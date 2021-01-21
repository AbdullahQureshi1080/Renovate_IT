import { createSlice } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { apiCallBegan, LOGIN_URL, REGISTER_URL } from "./api";
import authAPI from "../api/auth";
import auth from "../api/auth";
// import moment from "moment";
// Combing the two functions createAction and createReducer into one
// let lastId = 0;

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    loading: false,
    userId: "",
    // lastFetch: null,
    data: {},
  },
  reducers: {
    // actions => action handlers

    authenticate: (auth, action) => {
      auth.loading = true;
      auth.token = action.payload;
    },

    loginRequestFailed: (auth, action) => {
      auth.loading = false;
    },
    loginRequest: (auth, action) => {
      auth.loading = true;
    },

    authenticatedUser: (auth, action) => {
      auth.token = action.payload;
      auth.loading = false;
    },
    registerRequestFailed: (auth, action) => {
      auth.loading = false;
    },
    registerRequest: (auth, action) => {
      auth.loading = true;
    },
    userRegistration: (auth, action) => {
      auth.data = action.payload;
      auth.loading = false;
    },
    logout: (auth, action) => {
      auth.token = null;
    },
  },
});

// console.log(slice);

const {
  loginRequestFailed,
  loginRequest,
  authenticatedUser,
  registerRequest,
  registerRequestFailed,
  userRegistration,
  authenticate,
  logout,
} = auth.actions;
export default auth.reducer;

// Action Creators

// ()=>{} signature function

// export const userAuthentication = (user) =>
//   apiCallBegan({
//     url: LOGIN_URL,
//     method: "post",
//     data: user,
//     onStart: loginRequest.type,
//     onSuccess: authenticatedUser.type,
//     onError: loginRequestFailed.type,
//   });

export const userVerify = (user) => ({
  type: authenticatedUser.type,
  payload: user,
});

export const assignUserData = (user) => ({
  type: userRegistration.type,
  payload: user,
});

// export const registerUser = (userData) =>
//   apiCallBegan({
//     url: REGISTER_URL,
//     method: "post",
//     data: userData,
//     onStart: registerRequest.type,
//     onSuccess: userRegistration.type,
//     onError: registerRequestFailed.type,
//   });
