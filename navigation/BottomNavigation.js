// Native Imports
import 'react-native-gesture-handler';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

// Screen Imports
import HomeStack from './HomeStack';
import StoreStack from './StoreStack';
import ChatStack from './ChatStack';
import CreateStack from './CreateStack';
import ProfileStack from './ProfileStack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

const Tab = createBottomTabNavigator();
 
const BottomNavigation = () =>{
   
    return ( 
        <Tab.Navigator
        initialRouteName="AppHome"        
        tabBarOptions={{
          activeTintColor: '#1b262c',
          // inactiveTintColor:'#495465',
          showLabel:false,
          style:{
            backgroundColor:'#F4F4F2'
          },
        }}
      >
        <Tab.Screen
          name="AppHome"
        //   The Main Home Screen ------ From App Stack All Screen availale from that stack navigator
          component={HomeStack}
          options = {({route,navigation})=>({
          tabBarLabel: 'AppHome',
            tabBarIcon: ({ color, size }) => (
             <MaterialCommunityIcons name="home" color={color} size={35} />
            ),
          tabBarVisible: ((route) => {
            let routeName = getFocusedRouteNameFromRoute(route) ?? 'AppHome';
            console.log(routeName);
            if (routeName === 'AppHome') return true;
            else return false;
          })(route),
        })}
        />
        <Tab.Screen
          name="Store"
        //   From Store Stack Screen will be avaible 
          component={StoreStack}
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
          component={CreateStack}
          options={({route})=>({
            tabBarLabel: 'Add',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="plus-circle" color={color} size={35} />
            ),
            tabBarVisible: ((route) => {
              let routeName = getFocusedRouteNameFromRoute(route) ?? ('Add'||"Options");
              console.log(routeName);
              if (routeName === 'Add' ||routeName === 'Options') return true;
              else return false;
            })(route),
          })}
        />
        <Tab.Screen
          name="Chats"
        //   Chat Stack all screens 
          component={ChatStack}
          options = {({route})=>({
            tabBarLabel: 'Chats',
              tabBarIcon: ({ color, size }) => (
               <Entypo name="chat" color={color} size={35} />
              ),
            tabBarVisible: ((route) => {
              let routeName = getFocusedRouteNameFromRoute(route) ?? ('Chats'||"Chat");
              console.log(routeName);
              if (routeName === 'Chats' ||routeName === 'Chat') return true;
              else return false;
            })(route),
          })}
          
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
            tabBarVisible: ((route) => {
              let routeName = getFocusedRouteNameFromRoute(route) ?? ('Profile' || "User Profile");
              console.log(routeName);
              if (routeName == 'Profile' || routeName ==="User Profile") return true;
              else return false;
            })(route),
          })}
        />
      </Tab.Navigator>
    );
  }

    
  export default BottomNavigation;