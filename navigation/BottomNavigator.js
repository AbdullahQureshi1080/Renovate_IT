import 'react-native-gesture-handler';
import React from 'react';
import { View, Text, StyleSheet,} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AppStackNav from './AppStackNav';
import StoreStackNav from './StoreStackNav';
import ChatStackNave from './ChatStackNav';
import CreateStackNav from './CreateStackNav';
import ProfileStackNav from './ProfileStackNav';

const Tab = createBottomTabNavigator();

function Feed() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Feed!</Text>
      </View>
    );
  }
  
  function Profile() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Profile!</Text>
      </View>
    );
  }
  
  function Notifications() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Notifications!</Text>
      </View>
    );
  }
 
const BottomNav = () =>{
    return (
        <Tab.Navigator
        initialRouteName="Home"
        tabBarOptions={{
          activeTintColor: '#1b262c',
        //   activeBackgroundColor: '#222831',
          showLabel:false,
          style:{
              backgroundColor:'#F4F4f2'
          }
        }}
      >
        <Tab.Screen
          name="Home"
        //   The Main Home Screen ------ From App Stack All Screen availale from that stack navigator
          component={AppStackNav}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
             <MaterialCommunityIcons name="home" color={color} size={35} />
            ),
          }}
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
          component={ChatStackNave}
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
          component={ProfileStackNav}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="account-circle" color={color} size={35} />
              ), 
          }}
        />
      </Tab.Navigator>
    );
  }


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
  });
  
  
  export default BottomNav;