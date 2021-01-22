import { createSlice } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { apiCallBegan, LOGIN_URL, REGISTER_URL } from "./api";
// import authAPI from "../api/auth";
// import auth from "../api/auth";
// import moment from "moment";
// Combing the two functions createAction and createReducer into one
// let lastId = 0;

const auth = createSlice({
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
    signout: (auth, action) => {
      auth.token = null;
      auth.data = {};
      
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
  signout,
} = auth.actions;
export default auth.reducer;

// Action Creators

// ()=>{} signature function



export const userVerify = (user) => ({
  type: authenticatedUser.type,
  payload: user,
});

export const assignUserData = (user) => ({
  type: userRegistration.type,
  payload: user,
});


export const logout = () => ({
  type: signout.type,
  // payload: user,
});


// export const userAuthentication = (user) =>
//   apiCallBegan({
//     url: LOGIN_URL,
//     method: "post",
//     data: user,
//     onStart: loginRequest.type,
//     onSuccess: authenticatedUser.type,
//     onError: loginRequestFailed.type,
//   });

// export const registerUser = (userData) =>
//   apiCallBegan({
//     url: REGISTER_URL,
//     method: "post",
//     data: userData,
//     onStart: registerRequest.type,
//     onSuccess: userRegistration.type,
//     onError: registerRequestFailed.type,
//   });