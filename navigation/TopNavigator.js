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

   const Professionals = () =>{
    return( 
    <View>
         <Text style = {{justifyContent: 'center',}}>Professionals</Text>
     </View>
    )} 

const TopNavigator = () =>{
return(
    <Tab.Navigator
        initialRouteName = {Projects}
        tabBarOptions = {{
            showIcon: true,
            showLabel: false,
            style : {
                height:60,
            }
        }}
    >
        {/* Screens for the tab  top  navigations 
        1.Projects
            1.Projects
            2.Posts
        2.Professionals
        */}
      <Tab.Screen 
        name="Projects" 
        component={Projects} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="newspaper-variant-multiple" color={color} size={35} />
           ),
      }} 
      />
      <Tab.Screen 
        name="Professionals" 
        component={Professionals} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-group" color={color} size={35} />
           ),
      }} 
      />
    </Tab.Navigator>
);
}

export default TopNavigator;