// import { createSlice } from "@reduxjs/toolkit";

// // import moment from "moment";
// // Combing the two functions createAction and createReducer into one
// // let lastId = 0;
 
// const user = createSlice({
//   name: "user",
//   initialState: {
//     loading: false,
//     profile: {},
//   },
//   reducers: {
//     // actions => action handlers
 
//     requestProfile: (user, action) => {
//       user.loading = true;
//     },
 
//     requestProfileFailed: (user, action) => {
//       user.loading = false;
//     },
//     requestProfileSuccess: (user, action) => {
//       user.loading = true;
//       user.profile = action.payload;
//     },
//   },
// });
 
// // console.log(slice);
 
// const {
//   requestProfile,
//   requestProfileFailed,
//   requestProfileSuccess,
// } = userSlice.actions;
// export default userSlice.reducer;
 
// // Action Creators
 
// // ()=>{} signature function
 
// // export const userVerify = (user) => ({
// //   type: authenticatedUser.type,
// //   payload: user,
// // });
 
// // export const assignUserData = (user) => ({
// //   type: userRegistration.type,
// //   payload: user,
// // });
 
// export const setProfileData = (userData) => ({
//   type: requestProfileSuccess.type,
//   payload: userData,
// });

// // export const getProfileData = ({ email }) => {
// //   const result = userAPI.getProfile(email);
// //   if (!result.ok) console.log("Result not Okay", result.data);
// //   const dispatch = useDispatch();
// //   dispatch({
// //     type: requestProfileSuccess.type,
// //     payload: result.data,
// //   });
// // };
 
