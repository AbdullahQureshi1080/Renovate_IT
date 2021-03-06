import {createSlice} from '@reduxjs/toolkit';

// import moment from "moment";
// Combing the two functions createAction and createReducer into one
// let lastId = 0;

const data = createSlice({
  name: 'data',
  initialState: {
    // loading: false,
    // profile: {},
    allusers: [],
    posts: [],
    projects: [],
    appThemeMode: false,
  },
  reducers: {
    // actions => action handlers
    dataAllUsers: (data, action) => {
      data.allusers = action.payload;
    },
    dataPosts: (data, action) => {
      data.posts = action.payload;
    },
    dataProjects: (data, action) => {
      data.projects = action.payload;
    },
    addNewPost: (data, action) => {
      data.posts = [...data.posts, action.payload];
    },
    updatePost: (data, action) => {
      // user.posts = [...user.posts, action.payload];
      const _id = action.payload._id;
      const postIndex = data.posts.findIndex((x) => x._id == _id);
      // const newPosts = user.posts.filter(function(post){return post._id != _id})
      data.posts[postIndex] = action.payload;
    },
    removePost: (data, action) => {
      // data.posts = [...data.posts, action.payload];
      const _id = action.payload;
      const newPosts = data.posts.filter(function (post) {
        return post._id != _id;
      });
      data.posts = newPosts;
    },
    addNewProject: (data, action) => {
      data.projects = [...data.projects, action.payload];
    },
    updateProject: (data, action) => {
      // user.posts = [...user.posts, action.payload];
      const _id = action.payload._id;
      // const _id = action.payload._id;
      const projectIndex = data.projects.findIndex((x) => x._id == _id);
      // const newProject= user.projects.filter(function(project){return project._id != _id})
      data.projects[projectIndex] = action.payload;
    },
    removeProject: (data, action) => {
      // data.posts = [...data.posts, action.payload];
      const _id = action.payload;
      const newProjects = data.projects.filter(function (project) {
        return project._id != _id;
      });
      data.projects = newProjects;
    },
    addComment: (data, action) => {
      const _id = action.payload.projectId;
      console.log('Project Id in Data Store', _id);
      const value = action.payload.value;
      console.log('Comment Value in Data Store', value);
      const projectIndex = data.projects.findIndex((x) => x._id == _id);
      console.log('Project Found in Data Store', projectIndex);
      data.projects[projectIndex].comments.push(value);
      console.log('Addded Comment', data.projects[projectIndex].comments);
    },
    appThemeSwitch: (data, action) => {
      data.appThemeMode = action.payload;
    },
  },
});

// console.log(slice);

export const {
  addNewPost,
  dataPosts,
  removePost,
  addNewProject,
  removeProject,
  dataProjects,
  updatePost,
  updateProject,
  dataAllUsers,
  addComment,
  appThemeSwitch,
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

export const setAllUsers = (users) => ({
  type: dataAllUsers.type,
  payload: users,
});

export const setAppPosts = (posts) => ({
  type: dataPosts.type,
  payload: posts,
});

export const setAppProjects = (projects) => ({
  type: dataProjects.type,
  payload: projects,
});

export const addDataPost = (postData) => ({
  type: addNewPost.type,
  payload: postData,
});

export const deleteAppPost = (postId) => ({
  type: removePost.type,
  payload: postId,
});

export const editAppPost = (postData) => ({
  type: updatePost.type,
  payload: postData,
});

export const addDataProject = (projectData) => ({
  type: addNewProject.type,
  payload: projectData,
});

export const deleteAppProject = (projectId) => ({
  type: removeProject.type,
  payload: projectId,
});

export const editAppProject = (projectId) => ({
  type: updateProject.type,
  payload: projectId,
});

export const addNewComment = (data) => ({
  type: addComment.type,
  payload: data,
});

export const switchThemeMode = (data) => ({
  type: appThemeSwitch.type,
  payload: data,
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
