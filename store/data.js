import { createSlice } from "@reduxjs/toolkit";

// import moment from "moment";
// Combing the two functions createAction and createReducer into one
// let lastId = 0;
 
const data = createSlice({
  name: "data",
  initialState: {
    // loading: false,
    // profile: {},
    posts:[],
  },
  reducers: {
    // actions => action handlers
 
    dataPosts:(data,action)=>{
      data.posts = action.payload;
   },
    addNewPost: (data, action) => {
      data.posts = [...data.posts, action.payload];
    },
    removePost: (data, action) => {
      // data.posts = [...data.posts, action.payload];
      const _id = action.payload;
      const newPosts = data.posts.filter(function(post){return post._id != _id})
      data.posts = newPosts;
    },
  },
});
 
// console.log(slice);
 
const {
  addNewPost,
  dataPosts,
  removePost
} = data.actions;
export default data.reducer;
 
// Action Creators
 
// ()=>{} signature function

// export const clearData=()=>({
//   type:removeData.type,
// }) 
 
// export const setProfileData = (dataData) => ({
//   type: requestProfileSuccess.type,
//   payload: dataData,
// });

export const setAppPosts =(posts) =>({
  type:dataPosts.type,
  payload: posts,
});

export const addPost = (postData) => ({
  type: addNewPost.type,
  payload: postData,
});

export const deleteAppPost = (postId) => ({
  type: removePost.type,
  payload: postId,
});

// export const getProfileData = ({ email }) => {
//   const result = dataAPI.getProfile(email);
//   if (!result.ok) console.log("Result not Okay", result.data);
//   const dispatch = useDispatch();
//   dispatch({
//     type: requestProfileSuccess.type,
//     payload: result.data,
//   });
// };
 
