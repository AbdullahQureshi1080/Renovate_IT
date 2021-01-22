// Native Imports
import 'react-native-gesture-handler';
import React from 'react';
import {View, Text,FlatList} from 'react-native';
import {useSelector} from 'react-redux';
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TabNavigatorStyle from '../../styles/TabNavigatorStyle';

// Components Imports
import ProjectCard from '../../components/Card/ProjectCard';
import Posts from './PostsScreen';
import {projectsDummyData} from '../../assets/DummyData';

const Tab = createMaterialTopTabNavigator();


const Projects = ({navigation}) =>{
   // const state = useSelector((state) => state);
   // const user = state.entities.auth.data;
   // console.log(user);
return(
   <View>
      <FlatList 
      data = {projectsDummyData}
      renderItem = {(item) => (
      <ProjectCard 
       key = {item.item.key}
       title = {item.item.title}
       name = {item.item.name}
       profileImage = {item.item.profileImage}
       likes = {item.item.likes}
      //  cover = {}
       onPress = {()=>navigation?.push('Project Details',
         {item : item.item},
         )}
      />
      )}
      />
   </View>
);
}


const ProjectsScreen = () =>{
   return( 
      <Tab.Navigator
      initialRouteName = {Projects}
      tabBarOptions = {TabNavigatorStyle.subTabBarStyle}>
         <Tab.Screen 
            name = "Projects"
            component = {Projects}
         />
         <Tab.Screen 
            name = "Posts"
            component = {Posts}
         />
      </Tab.Navigator>
   );
}

export default ProjectsScreen;