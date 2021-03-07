import client from "./client";

const getAllPosts = () => client.get("posts/getAllPosts");
const getAllProjects = () => client.get("projects/getAllProjects");
const getAllUsers = (email) => client.post("user/getAllUsers",{email});
 
// const commentOnProject 
const commentOnProject = (userId, projectId, value) =>
client.post("projects/commentOnProject", {
    userId,
    projectId,
    value,
});

export default {
    commentOnProject,
    getAllPosts,
    getAllProjects,
    getAllUsers,
}