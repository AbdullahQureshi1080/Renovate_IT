import 'react-native-gesture-handler';
import React from 'react';
import {View, Text} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProjectsScreen from '../screens/ProjectsScreen';
import ProfessionalsScreen from '../screens/ProfessionalsScreen';

import TabNavigatorStyle from '../styles/TabNavigatorStyle';

const Tab = createMaterialTopTabNavigator();



const TopNavigator = () =>{
return(
    <Tab.Navigator
        initialRouteName = {ProjectsScreen}
        tabBarOptions = {TabNavigatorStyle.mainTabBarStyle}
    >
        {/* Screens for the tab  top  navigations 
        1.Projects
            1.Projects
            2.Posts
        2.Professionals
        */}
      <Tab.Screen 
        name="Projects" 
        component={ProjectsScreen} 
        
        options={{
         tabBarColor:"#495465",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="newspaper-variant-multiple-outline" color={color} size={25} />
           ),
      }} 
      /> 
      <Tab.Screen 
        name="Professionals" 
        component={ProfessionalsScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-group" color={color} size={25} />
           ),
      }} 
      />
    </Tab.Navigator>
);
}

export default TopNavigator;