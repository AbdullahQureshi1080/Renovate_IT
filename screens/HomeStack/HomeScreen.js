// Native Imports
import 'react-native-gesture-handler';
import React,{ useEffect } from 'react';
import {useDispatch,useSelector} from "react-redux";
import TopNavigator from '../../navigation/TopNavigator';
import { setUserPosts } from '../../store/user';

const HomeScreen = ({navigation}) =>{
 const dispatch = useDispatch();
 const state = useSelector(state=>state);
 const posts = state.entities.data.posts;
 const userPostsIdObjs = state.entities.user.postIds;
 console.log(userPostsIdObjs);
 const  userPostIds = userPostsIdObjs.map(({ id }) => id);
 console.log("Ids",userPostIds);
 console.log("All",posts);
 // const _id = action.payload;
 // const userPosts = posts.filter(function(post){return post._id != _id})
const userPosts = posts.filter((post) => userPostIds.includes(post._id))
 console.log("UserPosts",userPosts);
 useEffect(()=>{
     dispatch(setUserPosts(userPosts));
 },[])
return(
    <TopNavigator/>
);

}

export default HomeScreen;