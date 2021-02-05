import { createSlice } from "@reduxjs/toolkit";
// import { useDispatch, useSelector } from "react-redux";
import { apiCallBegan, LOGIN_URL, REGISTER_URL } from "./api";
import clearData from './user';

const auth = createSlice({
  name: "auth",
  initialState: {
    token: null,
    loading: false,
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

    loginRequestSuccess: (auth, action) => {
      auth.token = action.payload;
      auth.loading = false;
    },
    registerRequestFailed: (auth, action) => {
      auth.loading = false;
    },
    registerRequest: (auth, action) => {
      auth.loading = true;
    },
    registerRequestSuccess: (auth, action) => {
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
  loginRequestSuccess,
  registerRequestSuccess,
  registerRequest,
  registerRequestFailed,
  signout,
} = auth.actions;
export default auth.reducer;

// Action Creators

// ()=>{} signature function



export const loginUser = (user) => ({
  type: loginRequestSuccess.type,
  payload: user,
});

export const setUserData = (user) => ({
  type: registerRequestSuccess.type,
  payload: user,
});


export const logout = () => (
  {
  type: signout.type,
  // payload: user,
}
);


// export const userAuthentication = (user) =>
//   apiCallBegan({
//     url: LOGIN_URL,
//     method: "post",
//     data: user,
//     onStart: loginRequest.type,
//     onSuccess: loginRequestSuccess.type,
//     onError: loginRequestFailed.type,
//   });

// export const registerUser = (userData) =>
//   apiCallBegan({
//     url: REGISTER_URL,
//     method: "post",
//     data: userData,
//     onStart: registerRequest.type,
//     onSuccess: registerRequestSuccess.type,
//     onError: registerRequestFailed.type,
//   });