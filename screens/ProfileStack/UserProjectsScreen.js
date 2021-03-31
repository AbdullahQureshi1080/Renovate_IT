import React, { useEffect, useState } from 'react';
import {View, Text,FlatList,StyleSheet} from 'react-native';
// import {useSelector} from 'react-redux';
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import TabNavigatorStyle from '../../styles/TabNavigatorStyle';

// Components Imports
import ProjectCard from '../../components/Card/ProjectCard';
// import Posts from './PostsScreen';
import SearchBar from '../../components/SearchBar';
// import {projectsDummyData} from '../../assets/DummyData';

import dataAPI from '../../api/data';
import useApi from '../../hooks/useApi';
import AppButton from '../../components/AppButton';
import AppText from '../../components/AppText';
import ErrorMessage from '../../components/AppForm/ErrorMessage';
import { useSelector } from 'react-redux';
export default UserProjectsScreen =({navigation,route})=> {
    const state = useSelector(state=>state);
    const userProjectsIdObjs = state.entities.user.projectIds;
    const  userProjectIds = userProjectsIdObjs.map(({ id }) => id);
//  const userProjects = projects.filter((project) => userProjectIds.includes(project._id))
//     const projects = state.entities.user.projects;
//     // const projects = route.params;

//     return (
//            projects.length === 0 ? (
//             <View style={{flex:1, justifyContent:"center"}}>
//                 <AppText style={{alignSelf: 'center', fontSize:15,}}>You have no projects</AppText>
//                 <AppButton name="Create Project" onPress={()=>navigation.navigate("CreateProject")}/>
//             </View>
            
//             ) : (
//                 <View>
//       <FlatList 
//       inverted
//       data = {projects}
//       keyExtractor={(item, index) => index.toString()}
//       renderItem = {({item}) => (
//       <ProjectCard 
//       key = {item._id}
//       title = {item.title}
//       creator = {item.creator}
//       description = {item.description}
//       creatorImage = {item.creatorImage}
//       coverImage={item.data.thumbnailImage.value}
//       //  likes = {item.likes}
//       //  cover = {}
//        onPress = {()=>navigation.navigate('Project Details',
//          {item : item},
//          )}
//       />
//       )}
//       />
//    </View>
                
//             )     
//     )
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
   const userProjects = result.data.filter((project) => userProjectIds.includes(project._id))
   setProjects(userProjects);
}

useEffect(()=>{
fetchProjects();
// const unsubscribe = fetchProjects();
// return unsubscribe;
},[])

// -----------------------------------------------------------------
// const handleSearch = (search) => {
//    // console.log(route.params);
//    if(search == ""){
//      setProjects(projects);
//      return
//    }
//    const searched = projects.filter(function (item) {
//      return item.title.includes(search);
//    })
//    setProjects(searched)
//  }; 


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
   {/* <SearchBar placeholder = "Project search ...."  onChangeText={handleSearch}/> */}
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

const styles = StyleSheet.create({})
