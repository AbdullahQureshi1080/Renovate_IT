import client from "./client";
 
const register = (firstname, lastname, email, password) =>
  // console.log(firstname,lastname,email,password);
  client.post("user/register", {
    firstname,
    lastname,
    email,
    password,
  });
 
const updateProfile = (email, firstname, lastname, about, location, jobtitle,image) =>
  client.post("profile/updateProfile", {
    email,
    firstname,
    lastname,
    about,
    location,
    jobtitle,
    image
  });
const getProfile = (email) =>
  client.post("profile/getProfile", {
    email,
  });
 
const userProfile = async (email) => {
  console.log(email);
  const result = await getProfile(email);
  if (!result.ok) {
    console.log("API call failed", result.data);
    return;
  }
  return result.data;
};
 
const imageUpload = (imageSource,userId) => {
  client.post("profile/imageUpload", {
    imageSource,
    userId
  });
};
 
export default {
  register,
  updateProfile,
  imageUpload,
  userProfile,
};
