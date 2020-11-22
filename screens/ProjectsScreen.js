import 'react-native-gesture-handler';
import React from 'react';
import {View, Text} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const Tab = createMaterialTopTabNavigator();

const Projects = () =>{
   return( 
   <View>
        <Text>Projects</Text>
    </View>
   )}

export default Projects;