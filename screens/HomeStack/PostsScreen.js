// Native Imports
import 'react-native-gesture-handler';
import React,{useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import {useSelector} from 'react-redux';

// Components Imports
import PostCard from '../../components/Card/PostCard';
// import {postsDummyData} from '../../assets/DummyData';
import dataAPI from '../../api/data';
import useApi from '../../hooks/useApi';
import { setAppPosts } from '../../store/data';
// import { getFocusedRouteNameFromRoute } from '@react-navigation/native';



const Posts = ({navigation,route}) =>{
   // console.log(routeName);
//   const routeName = getFocusedRouteNameFromRoute(route);
   // const [AllPosts,setAllPosts]=useState([]);
   // const [counterCheck,setCounterCheck]=useState(0);
   // const dataApi = useApi(dataAPI.getAllPosts)
   const state = useSelector(state=>state);
   const posts = state.entities.data.posts;
   
   useEffect(()=>{
      // setCounterCheck(counterCheck+1)
      // const allPosts = async()=>{
      //    const posts = await dataApi.request();
      //    if(!posts.ok) return console.log("No Posts")
      //       setAllPosts(posts.data)
      //       setAppPosts(posts.data);
      //    }
      //    allPosts();
   },[])
   
return(
   <View>
      <FlatList 
      data = {posts}
      renderItem = {({item}) => (
      <PostCard 
       key = {item._id}
       title = {item.title}
       creator = {item.creator}
       description = {item.description}
       budget = {item.budget}
       onPress = {()=>navigation?.push('Post Details',
       {item : item},
         )}
      />
      )}
      />
   </View>
);
}


export default Posts;