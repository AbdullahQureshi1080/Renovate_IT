import 'react-native-gesture-handler';
import React from 'react';
// import {View, Text} from 'react-native';
import {
   Card,
   Title,
   Paragraph,
   List,
 } from 'react-native-paper';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import TabNavigatorStyle from '../styles/TabNavigatorStyle';
// import ProjectCard from '../components/ProjectCard';
// const Tab = createMaterialTopTabNavigator();



const title = "Hi, Boss";
const content = "This is attempt at working with react native paper and react native core";


const ProjectDetailsScreen = () =>{
   return (
      <List.Section>
        <List.Subheader>{title}</List.Subheader>
        <List.Item title={content} />
      </List.Section>
    );
   }

export default ProjectDetailsScreen;