import 'react-native-gesture-handler';
import React from 'react';
import {View, Text} from 'react-native';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import TabNavigatorStyle from '../styles/TabNavigatorStyle';
import PostCard from '../components/PostCard';
// const Tab = createMaterialTopTabNavigator();

const title = "Hi, Boss";
const content = "This is attempt at working with react native paper and react native core";

const Posts = ({navigation}) =>{
return(
   <View>
      <PostCard 
       title = "Architect Needed"
       description = "We need a expericence architect to make a house with a modern design concepts and space orientation"
       budget = "150000"
       onPress = {()=>navigation?.push('PostDetails',
         title,
         content,
         )}
      />
   </View>
);
}


export default Posts;