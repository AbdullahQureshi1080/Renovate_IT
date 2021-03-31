// Native Imports
import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import {View, Text,FlatList} from 'react-native';
import {useSelector} from 'react-redux';
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TabNavigatorStyle from '../../styles/TabNavigatorStyle';

// Components Imports
import ProjectCard from '../../components/Card/ProjectCard';
import Posts from './PostsScreen';
import SearchBar from '../../components/SearchBar';
// import {projectsDummyData} from '../../assets/DummyData';

import dataAPI from '../../api/data';
import useApi from '../../hooks/useApi';
import AppButton from '../../components/AppButton';
import AppText from '../../components/AppText';
import ErrorMessage from '../../components/AppForm/ErrorMessage';

const Tab = createMaterialTopTabNavigator();


const Projects = ({navigation}) =>{
   const [error,setError] = useState(null)
   const projectsApi = useApi(dataAPI.getAllProjects);
   // const state = useSelector((state) => state);
   // const user = state.entities.auth.data;
   // console.log(user);
   // const state = useSelector(state=>state);
   // const projects = state.entities.data.projects;
   const [projects,setProjects]=useState([]);
   const [refresh,setRefresh]=useState(false);
   
   // const [newProjects,setNewProjects]=useState(projects);
   // console.log(projects[0].data.thumbnailImage.value)
   const fetchProjects = async()=>{
      const result = await projectsApi.request();
      if(!result.ok){
         setError("Could not retrive projects at this moment, refresh. ")
         return;
      }
      setProjects(result.data);
   }

useEffect(()=>{
   fetchProjects();
   // const unsubscribe = fetchProjects();
   // return unsubscribe;
},[])

   // -----------------------------------------------------------------
   const handleSearch = (search) => {
      // console.log(route.params);
      if(search == ""){
        setProjects(projects);
        return
      }
      const searched = projects.filter(function (item) {
        return item.title.includes(search);
      })
      setProjects(searched)
    }; 


   //  const 
 
   const refreshProjects=()=>{
      if(projects !== []){
         setRefresh(true)
         fetchProjects();
         setRefresh(false);
      }
   }
   //  ----------------------------------------------------------------------

return(
   <View style={{flex:1,}}>
      <SearchBar placeholder = "Project search ...."  onChangeText={handleSearch}/>
      <FlatList 
      ListEmptyComponent ={
         () => (
            <View style={{flex:1, justifyContent:"center", alignItems:"center", alignSelf:"center"}}>
               <ErrorMessage error={error} visible={error}/>
               <AppText  style={{fontSize:14,}}>
                    No Projects 
               </AppText>
               <AppButton name="reload" onPress={fetchProjects}/>
            </View>
        )
      } 
      refreshing={refresh}
      onRefresh={refreshProjects}
      data={ projects.sort((a, b) => {return new Date(b.date) - new Date(a.date);         })}
      keyExtractor={(item, index) => index.toString()}
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