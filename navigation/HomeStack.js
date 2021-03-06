// Native Imports
import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';

// Screen Imports
import HomeScreen from '../screens/HomeStack/HomeScreen';
import ProjectDetailsScreen from '../screens/HomeStack/ProjectDetailsScreen';
import SearchBar from '../components/SearchBar';
import PostDetailsScreen from '../screens/HomeStack/PostDetailsScreen';
import AllProfessionals from '../screens/HomeStack/AllProfessionals';

const Stack = createStackNavigator();

const searchBar = () => {
  return <SearchBar placeholder="Search" />;
};
const HomeStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="AppHome">
      <Stack.Screen
        name="AppHome"
        component={HomeScreen}
        options={{
          // header:searchBar ,
          headerShown: false,
          headerTitle: false,
          headerStyle: {
            marginHorizontal: 20,
            marginTop: 20,
          },
        }}
      />
      <Stack.Screen
        name="Project Details"
        component={ProjectDetailsScreen}
        navigation={navigation}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Post Details"
        component={PostDetailsScreen}
        navigation={navigation}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="All Professionals"
        component={AllProfessionals}
        navigation={navigation}
        // options={}
        options={({route}) => ({title: route.params.title, headerShown: false})}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  cardDistance: {
    marginBottom: 10,
  },
});

export default HomeStack;
