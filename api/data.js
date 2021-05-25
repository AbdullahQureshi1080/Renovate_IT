import client from './client';

const getAllPosts = () => client.get('posts/getAllPosts');
const getAllProjects = () => client.get('projects/getAllProjects');
const getAllUsers = (email) => client.post('user/getAllUsers', {email});
const getSpecificCategoryProfessional = (email, category) =>
  client.post('user/getSpecificCategoryProfessional', {
    email,
    category,
  });
const getProjectComments = (projectId) =>
  client.post('projects/getProjectComments', {projectId});
// const commentOnProject
const commentOnProject = (userId, projectId, value) =>
  client.post('projects/commentOnProject', {
    userId,
    projectId,
    value,
  });

export default {
  getProjectComments,
  commentOnProject,
  getAllPosts,
  getAllProjects,
  getAllUsers,
  getSpecificCategoryProfessional,
};
