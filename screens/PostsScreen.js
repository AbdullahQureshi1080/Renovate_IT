import 'react-native-gesture-handler';
import React from 'react';
import {View, Text, FlatList} from 'react-native';
import PostCard from '../components/PostCard';
import {postsDummyData} from '../assets/DummyData';

const title = "Hi, Boss";
const content = "This is attempt at working with react native paper and react native core";

const Posts = ({navigation}) =>{
return(
   <View>
      <FlatList 
      data = {postsDummyData}
      renderItem = {(item) => (
      <PostCard 
       key = {item.item.key}
       title = {item.item.title}
       description = {item.item.description}
       budget = {item.item.budget}
       onPress = {()=>navigation?.push('Post Details',
         title,
         content,
         )}
      />
      )}
      />
   </View>
);
}


export default Posts;