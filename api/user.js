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
 
export default {
  register,
  updateProfile,
  userProfile,
  createPost,
  userPosts,
};
