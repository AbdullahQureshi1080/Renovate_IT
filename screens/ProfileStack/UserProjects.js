// Native Imports
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

// Component Imports
import AppText from '../../components/AppText';
import TabNavigatorStyle from '../../styles/TabNavigatorStyle';
import UserPostsScreen from './UserPostsScreen';
import UserProjectsScreen from './UserProjectsScreen';

const Tab = createMaterialTopTabNavigator();

export default function UserProjects({route}) {
  const user = route.params;
  console.log('User Email in User Projects TAB', user);
  return (
    <Tab.Navigator tabBarOptions={TabNavigatorStyle.userProjectsTab}>
      <Tab.Screen
        name="Projects"
        component={UserProjectsScreen}
        initialParams={user}
      />
      <Tab.Screen
        name="Posts"
        component={UserPostsScreen}
        initialParams={user}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
