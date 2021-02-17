import client from "./client";

const getAllPosts = () => client.get("posts/getAllPosts");
 
export default {
    getAllPosts
}