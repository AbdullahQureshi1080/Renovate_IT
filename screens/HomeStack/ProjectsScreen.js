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
// import {projectsDummyData} from '../../assets/DummyData';

const Tab = createMaterialTopTabNavigator();


const Projects = ({navigation}) =>{
   // const state = useSelector((state) => state);
   // const user = state.entities.auth.data;
   // console.log(user);
   const state = useSelector(state=>state);
   const projects = state.entities.data.projects;
   // console.log(projects[0].data.thumbnailImage.value)
return(
   <View>
      <FlatList 
      // data = {projects.sort(function(a,b){
      //    // Turn your strings into dates, and then subtract them
      //    // to get a value that is either negative, positive, or zero.
      //    return new Date(b.date) - new Date(a.date);
      //  })}
      data={projects}
      renderItem = {({item}) => (
      <ProjectCard 
      key = {item._id}
      title = {item.title}
      creator = {item.creator}
      description = {item.description}
      creatorImage = {item.creatorImage}
      coverImage={item.data.thumbnailImage.value}
      //  likes = {item.likes}
      //  cover = {}
       onPress = {()=>navigation?.push('Project Details',
         {item : item},
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