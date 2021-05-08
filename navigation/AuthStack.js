// Native Imports
import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {StyleSheet} from 'react-native';

// Supporting Imports

// Stack Screens
import BottomNavigation from './BottomNavigation';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import SplashScreen from '../screens/AuthStack/SplashScreen';
import LoginScreen from '../screens/AuthStack/LoginScreen';
import SignUpScreen from '../screens/AuthStack/SignUpScreen';

const Stack = createStackNavigator();

const AuthStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Sign Up"
        component={SignUpScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Home"
        component={BottomNavigation}
        options={{
          headerShown: false,
        }}
        navigation={navigation}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  cardDistance: {
    marginBottom: 10,
  },
});

export default AuthStack;
