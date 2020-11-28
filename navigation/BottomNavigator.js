import 'react-native-gesture-handler';
import React from 'react';
// import { View, Text, StyleSheet,} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AppStack from './AppStack';
import StoreStackNav from './StoreStackNav';
import ChatStackNav from './ChatStackNav';
import CreateStackNav from './CreateStackNav';
import ProfileStack from './ProfileStack';
// import HomeScreen from '../screens/HomeScreen';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

const Tab = createBottomTabNavigator();
 
const BottomNav = () =>{
   
    return (
        <Tab.Navigator
        initialRouteName="Home"
        // options = {({route})=>({
        //   tabBarVisible: ((route) => {
        //     const routeName = getFocusedRouteNameFromRoute(route) ?? '';
        //     if (routeName == 'Home') {
        //       return true;
        //     }
        //     return false;
        //   })(route),
        // })}
        
        
        tabBarOptions={{
          activeTintColor: '#1b262c',
          showLabel:false,
          style:{
            backgroundColor:'#F4F4F2'
          },
        }}
      >
        <Tab.Screen
          name="Home"
        //   The Main Home Screen ------ From App Stack All Screen availale from that stack navigator
          component={AppStack}
          options = {({route})=>({
          tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
             <MaterialCommunityIcons name="home" color={color} size={35} />
            ),
          tabBarVisible: ((route) => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? '';
            if (routeName === 'Home') {
              return true;
            }
            else{return false;}
          })(route),
        })}
        />
        <Tab.Screen
          name="Store"
        //   From Store Stack Screen will be avaible 
          component={StoreStackNav}
          options={{
            tabBarLabel: 'Store',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="store" color={color} size={35} />
            ),
            
          }}
        />
        <Tab.Screen
          name="Add"
        //   Still have to figure out, how to do this
          component={CreateStackNav}
          options={{
            tabBarLabel: 'Add',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="plus-circle" color={color} size={35} />
            ),
          }}
        />
        <Tab.Screen
          name="Chats"
        //   Chat Stack all screens 
          component={ChatStackNav}
          options={{
            tabBarLabel: 'Chats',
            tabBarIcon: ({ color, size }) => (
              <Entypo name="chat" color={color} size={35} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
        //   Profile stack All screens
          component={ProfileStack}
          options = {({route})=>({
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="account-circle" color={color} size={35} />
              ), 
              // tabBarVisible: ((route) => {
              //   const routeName = getFocusedRouteNameFromRoute(route) ?? '';
              //   if (routeName === 'Profile') {
              //     return false;
              //   }
              //   else{return true;}
              // })(route),
            })}
        />
      </Tab.Navigator>
    );
  }

    
  export default BottomNav;