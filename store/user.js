import { createSlice } from "@reduxjs/toolkit";

// import moment from "moment";
// Combing the two functions createAction and createReducer into one
// let lastId = 0;
 
const user = createSlice({
  name: "user",
  initialState: {
    loading: false,
    profile: {},
    postIds:[],
    projectIds:[],
    posts:[],
    projects:[],
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
    userProjectsIds:(user,action)=>{
      user.projectIds = action.payload;
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
      const _id = action.payload._id;
      const postIndex = user.posts.findIndex(x=>x._id== _id)
      // const newPosts = user.posts.filter(function(post){return post._id != _id})
      user.posts[postIndex]= action.payload;
    },
    userProjects:(user,action)=>{
      user.projects = action.payload;
   },
    addNewProject: (user, action) => {
      user.projects = [...user.projects, action.payload];
    },
    updateProject: (user, action) => {
      // user.posts = [...user.posts, action.payload];
      const _id = action.payload._id;
      const projectIndex = user.projects.findIndex(x=>x._id== _id)
      // const newProject= user.projects.filter(function(project){return project._id != _id})
      // user.projects[projectIndex]= action.payload;
    },
    removeProject: (user, action) => {
      // user.posts = [...user.posts, action.payload];
      const _id = action.payload;
      const newProjects = user.projects.filter(function(project){return project._id != _id})
      user.projects = newProjects;
    },
    addChat :(user,action)=>{
      const id = action.payload;
      user.profile.chats = [...user.profile.chats,id]; 
    }
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
  userProjectsIds,
  userPosts,
  removePost,
  updatePost,
  userProjects,
  addNewProject,
  removeProject,
  updateProject,
  addChat
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

export const setUserProjects =(projects) =>({
  type:userProjects.type,
  payload: projects,
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


export const editPost = (postData) => ({
  type: updatePost.type,
  payload: postData,
});


export const setUserProjectIds=(projectIds)=>({
  type:userProjectsIds.type,
  payload: projectIds,
})
export const addProject = (projectData) => ({
  type: addNewProject.type,
  payload: projectData,
});

export const deleteProject= (projectId) => ({
  type: removeProject.type,
  payload: projectId,
});



export const editProject = (projectId) => ({
  type: updateProject.type,
  payload: projectId,
});

export const createChat = (chatid)=>({
  type:addChat.type,
  payload:chatid,
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
 
