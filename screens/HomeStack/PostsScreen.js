// Native Imports
import 'react-native-gesture-handler';
import React,{useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';

// Components Imports
import PostCard from '../../components/Card/PostCard';
import {postsDummyData} from '../../assets/DummyData';
import dataAPI from '../../api/data';
import useApi from '../../hooks/useApi';



const Posts = ({navigation}) =>{
   const [posts,setPosts]=useState([]);
   const dataApi = useApi(dataAPI.getAllPosts)
   const allPosts = async()=>{
      const posts = await dataApi.request();
      if(!posts.ok){
      return (
         <View>
            <Text>Error Retreving Posts</Text>
         </View>
      )
   }
      else{
         setPosts(posts.data)
         console.log(posts.data);
      }
      // return
   }
   useEffect(()=>{allPosts()},[])
   
return(
   <View>
      <FlatList 
      data = {posts}
      renderItem = {(item) => (
      <PostCard 
       key = {item.item._id}
       title = {item.item.title}
       creator = {item.item.creator}
       description = {item.item.description}
       budget = {item.item.budget}
       onPress = {()=>navigation?.push('Post Details',
       {item : item.item},
         )}
      />
      )}
      />
   </View>
);
}


export default Posts;