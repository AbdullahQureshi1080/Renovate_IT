import client from './client';

// Auth -----------------------------------
const register = (firstname, lastname, email, password) =>
  client.post('user/register', {
    firstname,
    lastname,
    email,
    password,
  });

// Profile -----------------------------------
const updateProfessionalProfile = (
  email,
  firstname,
  lastname,
  about,
  location,
  jobtitle,
  jobcategory,
  image,
  profileStatus,
) =>
  client.post('profile/updateProfile', {
    email,
    firstname,
    lastname,
    about,
    location,
    jobtitle,
    jobcategory,
    image,
    profileStatus,
  });

const updateNormalProfile = (
  email,
  firstname,
  lastname,
  image,
  profileStatus,
) =>
  client.post('profile/updateNormalProfile', {
    email,
    firstname,
    lastname,
    image,
    profileStatus,
  });

const getProfile = (userId) =>
  client.post('profile/getProfile', {
    userId,
  });

const userProfile = async (userId) => {
  // console.log(email);
  const result = await getProfile(userId);
  if (!result.ok) {
    console.log('API call failed', result.data);
    return;
  }
  return result.data;
};

// Posts -----------------------------------

const createPost = (email, title, description, budget, images, documents) =>
  client.post('posts/newPost', {
    email,
    title,
    description,
    budget,
    images,
    documents,
  });

const updatePost = (id, title, description, budget, images, documents) =>
  client.post('posts/updatePost', {
    id,
    title,
    description,
    budget,
    images,
    documents,
  });
const deletePost = (email, id) => client.post('posts/deletePost', {email, id});

const getUserPosts = (email) =>
  client.post('posts/getUserPosts', {
    email,
  });
const userPosts = async (email) => {
  const result = await getUserPosts(email);
  if (!result.ok) {
    console.log('API call failed', result.data);
    return;
  }
  return result.data;
};

const offerNewBid = (bidderId, postId, message, bidAmount,bidCategory,bidTime) =>
  client.post('posts/offerBid', {
    bidderId,
    postId,
    message,
    bidAmount,
    bidCategory,
    bidTime
  });

const acceptBid = (bidId, postId) =>
  client.post('posts/acceptBid', {
    bidId,
    postId,
  });

const rejectBid = (bidId, postId) =>
  client.post('posts/rejectBid', {
    bidId,
    postId,
  });

const withdrawBid = (userId, postId, bidId) =>
  client.post('posts/withdrawUserBid', {
    userId,
    postId,
    bidId,
  });

const getPostBids = (postId) =>
  client.post('posts/getPostBids', {
    postId,
  });

//  Project ----------------------

const createProject = (email, title, description, category, data) =>
  client.post('projects/newProject', {
    email,
    title,
    description,
    category,
    data,
  });

const deleteProject = (email, id) =>
  client.post('projects/deleteProject', {email, id});

const updateProject = (id, title, description, category, data) =>
  client.post('projects/updateProject', {
    id,
    title,
    description,
    category,
    data,
  });

const getUserProjects = (email) =>
  client.post('projects/getUserProjects', {
    email,
  });

const userProjects = async (email) => {
  const result = await getUserProjects(email);
  if (!result.ok) {
    console.log('API call failed', result.data);
    return;
  }
  return result.data;
};

const likeProject = (userId, projectId, liked) =>
  client.post('projects/likeProject', {
    userId,
    projectId,
    liked,
  });

const getLikes = (userId, projectId, liked) =>
  client.post('projects/getLIkes', {
    userId,
    projectId,
    liked,
  });

// Chats --------------------------------
const createChat = (senderEmail, recieverEmail, chatId) =>
  client.post('chats/createChat', {
    senderEmail,
    recieverEmail,
    chatId,
  });

const deleteChat = (senderEmail, recieverEmail, chatId) =>
  client.post('chats/deleteChat', {
    senderEmail,
    recieverEmail,
    chatId,
  });

const getChatIds = (email) =>
  client.post('chats/getChatIds', {
    email,
  });

// Remote Firms ---------------------------

const createFirm = (email, title, description, members) =>
  client.post('remoteFirm/createFirm', {
    email,
    title,
    description,
    members,
  });

const getUserFirms = (email) =>
  client.post('remoteFirm/getUserFirms', {
    email,
  });

const getAllFirms = () => client.get('remoteFirm/getAllFirms');

// const userFirmIds = async (email) => {
//   // const allFirms = await getAllFirms();
//   const userFirms = await getUserFirms(email);
//   if (!userFirms.ok && !allFirms.ok) {
//     console.log('User Firms API call failed', userFirms.data);
//     console.log('All Firms API call failed', allFirms.data);
//     return;
//   }
//   if (userFirms.data.length == 0) {
//     console.log('User Firms in user api', userFirms.data);
//     return;
//   } else {
//     const firms = allFirms.data.filter((firm) => {
//       return firm._id == userFirms[0];
//     });
//     return firms;
//   }
// };

const createNote = (firmId, note, email, images, documents) =>
  client.post('remoteFirm/createNote', {
    email,
    note,
    firmId,
    images,
    documents,
  });

const updateNote = (email, noteId, firmId, note, images, documents) =>
  client.post('remoteFirm/updateNote', {
    email,
    noteId,
    firmId,
    note,
    images,
    documents,
  });

const getNotes = (firmId) => client.post('remoteFirm/getNotes', {firmId});

const deleteNote = (email, noteId, firmId) =>
  client.post('remoteFirm/deleteNote', {
    email,
    noteId,
    firmId,
  });

const deleteFirm = (email, firmId, members) =>
  client.post('remoteFirm/deleteFirm', {email, firmId, members});

const deleteFirmMember = (firmId, memberId) =>
  client.post('remoteFirm/removeMember', {firmId, memberId});

const addFirmMember = (firmId, memberId) =>
  client.post('remoteFirm/addNewMember', {firmId, memberId});

const updateFirmData = (firmId, title, description) =>
  client.post('remoteFirm/updateFirm', {firmId, title, description});

const saveItem = (userId, image, type) =>
  client.post('save/save', {userId, image, type});
const unSaveItem = (userId, itemId) =>
  client.post('save/unSave', {userId, itemId});
const getSavedItems = (userId) => client.post('save/getSavedItems', {userId});

const getUserNotifications = (userId) =>
  client.post('notifications/getNotifications', {userId});

export default {
  register,
  updateProfessionalProfile,
  updateNormalProfile,
  userProfile,
  createPost,
  userPosts,
  deletePost,
  updatePost,
  offerNewBid,
  acceptBid,
  rejectBid,
  withdrawBid,
  getPostBids,
  createProject,
  deleteProject,
  updateProject,
  userProjects,
  likeProject,
  createChat,
  deleteChat,
  getChatIds,
  createFirm,
  getUserFirms,
  getAllFirms,
  createNote,
  getNotes,
  deleteNote,
  deleteFirm,
  addFirmMember,
  deleteFirmMember,
  updateFirmData,
  updateNote,
  getLikes,
  saveItem,
  unSaveItem,
  getSavedItems,
  getUserNotifications,
};
