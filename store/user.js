import { createSlice } from "@reduxjs/toolkit";

// import moment from "moment";
// Combing the two functions createAction and createReducer into one
// let lastId = 0;
 
const user = createSlice({
  name: "user",
  initialState: {
    loading: false,
    profile: {},
    postIds:{},
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
    userPostsIds:(user,action)=>{
      user.postIds = action.payload;
    },
    userPosts:(user,action)=>{
      user.posts = action.payload;
   },
    addNewPost: (user, action) => {
      user.posts = [...user.posts, action.payload];
    },
    removePost: (user, action) => {
      // user.posts = [...user.posts, action.payload];
      const _id = action.payload;
      const newPosts = user.posts.filter(function(post){return post._id != _id})
      user.posts = newPosts;
    },
    updatePost: (user, action) => {
      // user.posts = [...user.posts, action.payload];
      const _id = action.payload;
      const postIndex = user.posts.findIndex(x=>x._id== _id)
      // const newPosts = user.posts.filter(function(post){return post._id != _id})
      // user.posts[postIndex]= action.payload;
    },
    // deletePost:(user,action)=>{
    //   const posts = user.posts.filter(id=>action.payload);
    //   // user.posts = [...user.posts,]
    // }
  },
});
 
// console.log(slice);
 
const {
  requestProfile,
  requestProfileFailed,
  requestProfileSuccess,
  removeData,
  addNewPost,
  userPostsIds,
  userPosts,
  removePost,
  updatePost
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

export const setUserPosts =(posts) =>({
  type:userPosts.type,
  payload: posts,
});

export const setUserPostIds=(posts)=>({
  type:userPostsIds.type,
  payload: posts,
})
export const addPost = (postData) => ({
  type: addNewPost.type,
  payload: postData,
});

export const deletePost = (postId) => ({
  type: removePost.type,
  payload: postId,
});


export const editPost = (postId) => ({
  type: updatePost.type,
  payload: postId,
});

// export const getProfileData = ({ email }) => {
//   const result = userAPI.getProfile(email);
//   if (!result.ok) console.log("Result not Okay", result.data);
//   const dispatch = useDispatch();
//   dispatch({
//     type: requestProfileSuccess.type,
//     payload: result.data,
//   });
// };
 
