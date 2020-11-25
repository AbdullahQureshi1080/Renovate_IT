import 'react-native-gesture-handler';
import React from 'react';
import {View, Text,FlatList} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TabNavigatorStyle from '../styles/TabNavigatorStyle';
import ProjectCard from '../components/ProjectCard';
import Posts from './PostsScreen';
import {projectsDummyData} from '../assets/DummyData';
const Tab = createMaterialTopTabNavigator();

// const title = "Hi, Boss";
// const content = "This is attempt at working with react native paper and react native core";



const Projects = ({navigation}) =>{
   // {console.log(projectsDummyData)}
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