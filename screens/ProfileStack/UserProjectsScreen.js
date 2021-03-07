import React from 'react'
import { StyleSheet, Text, View,FlatList } from 'react-native'
import { useSelector } from 'react-redux';
import AppButton from '../../components/AppButton';
import AppText from '../../components/AppText';
import ProjectCard from '../../components/Card/ProjectCard';

export default UserProjectsScreen =({navigation})=> {
    const state = useSelector(state=>state);
    const projects = state.entities.user.projects;

    return (
           projects.length === 0 ? (
            <View style={{flex:1, justifyContent:"center"}}>
                <AppText style={{alignSelf: 'center', fontSize:15,}}>You have no projects</AppText>
                <AppButton name="Create Project" onPress={()=>navigation.navigate("CreateProject")}/>
            </View>
            
            ) : (
                <View>
      <FlatList 
      data = {projects}
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
       onPress = {()=>navigation.navigate('Project Details',
         {item : item},
         )}
      />
      )}
      />
   </View>
                
            )     
    )
}

const styles = StyleSheet.create({})
