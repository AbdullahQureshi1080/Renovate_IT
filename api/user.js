import client from "./client";
 

// Auth -----------------------------------
const register = (firstname, lastname, email, password) =>
  client.post("user/register", {
    firstname,
    lastname,
    email,
    password,
  });
 
  // Profile -----------------------------------
  const updateProfile = (email, firstname, lastname, about, location, jobtitle,jobcategory,image) =>
  client.post("profile/updateProfile", {
    email,
    firstname,
    lastname,
    about,
    location,
    jobtitle,
    jobcategory,
    image
  });

const getProfile = (email) =>
  client.post("profile/getProfile", {
    email,
  });
 
const userProfile = async (email) => {
  // console.log(email);
  const result = await getProfile(email);
  if (!result.ok) {
    console.log("API call failed", result.data);
    return;
  }
  return result.data;
};
 
// Posts -----------------------------------

const createPost = (email, title, description, budget, images, documents) =>
  client.post("posts/newPost", {
    email,
    title,
    description,
    budget,
    images,
    documents,
  });

  const updatePost = (id, title, description, budget, images, documents) =>
  client.post("posts/updatePost", {
    id,
    title,
    description,
    budget,
    images,
    documents,
  });
  const deletePost = (email,id) =>
  client.post("posts/deletePost", {email,id});

  const getUserPosts = (email) =>
  client.post("posts/getUserPosts", {
    email,
  });
  const userPosts = async (email)=>{
    const result = await getUserPosts(email);
    if (!result.ok) {
      console.log("API call failed", result.data);
      return;
    }
    return result.data;
  }
 

  //  Project ----------------------

  const createProject = (email,title, description,category,data) =>
  client.post("projects/newProject", {
    email,
    title,
    description,
    category,
    data,
  });
 
  const deleteProject = (email,id) =>
  client.post("projects/deleteProject", {email,id});

  const updateProject = (id, title, description,category,data) =>
  client.post("projects/updateProject", {
    id,
    title,
    description,
    category,
    data
  });


  const getUserProjects = (email) =>
  client.post("projects/getUserProjects", {
    email,
  });
  const userProjects = async (email)=>{
    const result = await getUserProjects(email);
    if (!result.ok) {
      console.log("API call failed", result.data);
      return;
    }
    return result.data;
  }
 
  const createChat = (senderEmail,recieverEmail,chatId)=>
  client.post("chats/createChat",{
    senderEmail,
    recieverEmail,
    chatId
  })

  const deleteChat =(senderEmail,recieverEmail,chatId)=>
  client.post("chats/deleteChat",{
    senderEmail,
    recieverEmail,
    chatId
  })

  
  const getChatIds =(email)=>
  client.post("chats/getChatIds",{
    email
  })

export default {
  register,
  updateProfile,
  userProfile,
  createPost,
  userPosts,
  deletePost,
  updatePost,
  createProject,
  deleteProject,
  updateProject,
  userProjects,
  createChat,
  deleteChat,
  getChatIds,
};
