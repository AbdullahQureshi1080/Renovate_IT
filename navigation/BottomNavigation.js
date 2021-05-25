// Native Imports
import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

// Screen Imports
import HomeStack from './HomeStack';
import StoreStack from './StoreStack';
import ChatStack from './ChatStack';
import CreateStack from './CreateStack';
import ProfileStack from './ProfileStack';
import {
  getFocusedRouteNameFromRoute,
  useFocusEffect,
} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const Tab = createBottomTabNavigator();

const BottomNavigation = ({navigation}) => {
  const state = useSelector((state) => state);
  const userId = state.entities.auth.data._id;

  return (
    <Tab.Navigator
      initialRouteName="AppHome"
      tabBarOptions={{
        activeTintColor: '#1b262c',
        // inactiveTintColor:'#495465',
        showLabel: false,
        style: {
          backgroundColor: '#F4F4F2',
          // marginTop:1000,
        },
      }}
    >
      <Tab.Screen
        name="AppHome"
        //   The Main Home Screen ------ From App Stack All Screen availale from that stack navigator
        component={HomeStack}
        listeners={({navigation}) => ({
          tabPress: (event) => {
            event.preventDefault();
            navigation.navigate('AppHome', {
              screen: 'AppHome',
              // params: {_id: userId},
            });
          },
        })}
        options={({route, navigation}) => ({
          tabBarLabel: 'AppHome',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="home" color={color} size={35} />
          ),
          tabBarVisible: ((route) => {
            let routeName = getFocusedRouteNameFromRoute(route) ?? 'AppHome';
            console.log(routeName);
            if (routeName === 'AppHome') return true;
            else return false;
          })(route),
        })}
        navigation={navigation}
      />
      <Tab.Screen
        name="Store"
        //   From Store Stack Screen will be avaible
        component={StoreStack}
        options={({route}) => ({
          tabBarLabel: 'Store',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="store" color={color} size={35} />
          ),
          tabBarVisible: ((route) => {
            let routeName =
              getFocusedRouteNameFromRoute(route) ?? ('Store' || 'Store Home');
            console.log(routeName);
            if (routeName === 'Store' || routeName === 'Store Home')
              return true;
            else return false;
          })(route),
        })}
        navigation={navigation}
      />
      <Tab.Screen
        name="Add"
        //   Still have to figure out, how to do this
        component={CreateStack}
        options={({route}) => ({
          tabBarLabel: 'Add',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="plus-circle"
              color={color}
              size={35}
            />
          ),
          tabBarVisible: ((route) => {
            let routeName =
              getFocusedRouteNameFromRoute(route) ?? ('Add' || 'Options');
            console.log(routeName);
            if (routeName === 'Add' || routeName === 'Options') return true;
            else return false;
          })(route),
        })}
        navigation={navigation}
      />
      <Tab.Screen
        name="Chats"
        //   Chat Stack all screens
        component={ChatStack}
        options={({route}) => ({
          tabBarLabel: 'Chats',
          tabBarIcon: ({color, size}) => (
            <Entypo name="chat" color={color} size={35} />
          ),
          tabBarVisible: ((route) => {
            let routeName =
              getFocusedRouteNameFromRoute(route) ?? ('Chats' || 'Chat');
            console.log(routeName);
            if (routeName === 'Chats' || routeName === 'Chat') return true;
            else return false;
          })(route),
        })}
        navigation={navigation}
      />
      <Tab.Screen
        name="Profile"
        //   Profile stack All screens
        component={ProfileStack}
        listeners={({navigation}) => ({
          tabPress: (event) => {
            event.preventDefault();
            navigation.navigate('Profile', {
              screen: 'User Profile',
              params: {_id: userId},
            });
          },
        })}
        options={({route}) => ({
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="account-circle"
              color={color}
              size={35}
            />
          ),
          tabBarVisible: ((route) => {
            let routeName =
              getFocusedRouteNameFromRoute(route) ??
              ('Profile' || 'User Profile' || 'Other User');
            console.log(routeName);
            if (
              routeName == 'Profile' ||
              routeName === 'User Profile' ||
              routeName === 'Other User'
            )
              return true;
            else return false;
          })(route),
        })}
        navigation={navigation}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
