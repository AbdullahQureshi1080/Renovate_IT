import { createSlice } from "@reduxjs/toolkit";

// import moment from "moment";
// Combing the two functions createAction and createReducer into one
// let lastId = 0;
 
const user = createSlice({
  name: "user",
  initialState: {
    loading: false,
    profile: {},
    posts:[],
  },
  reducers: {
    // actions => action handlers
 
    requestProfile: (user, action) => {
      user.loading = true;
    },
 
    requestProfileFailed: (user, action) => {
      user.loading = false;
    },
    requestProfileSuccess: (user, action) => {
      user.loading = true;
      user.profile = action.payload;
    },
    removeData:(user,action)=>{
      user.profile = null
    },
    addNewPost: (user, action) => {
      user.posts = [...user.posts, action.payload];
    },

  },
});
 
// console.log(slice);
 
const {
  requestProfile,
  requestProfileFailed,
  requestProfileSuccess,
  removeData,
  addNewPost,
} = user.actions;
export default user.reducer;
 
// Action Creators
 
// ()=>{} signature function

export const clearData=()=>({
  type:removeData.type,
}) 
 
export const setProfileData = (userData) => ({
  type: requestProfileSuccess.type,
  payload: userData,
});

export const addPost = (postData) => ({
  type: addNewPost.type,
  payload: postData,
})


// export const getProfileData = ({ email }) => {
//   const result = userAPI.getProfile(email);
//   if (!result.ok) console.log("Result not Okay", result.data);
//   const dispatch = useDispatch();
//   dispatch({
//     type: requestProfileSuccess.type,
//     payload: result.data,
//   });
// };
 
