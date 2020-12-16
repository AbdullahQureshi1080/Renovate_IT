// Native Imports
import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {StyleSheet} from 'react-native';

// Supporting Imports

// Stack Screens
import BottomNav from './BottomNavigator';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import SplashScreen from '../screens/AppStack/SplashScreen';
import LoginScreen from '../screens/AppStack/LoginScreen';
import SignUpScreen from '../screens/AppStack/SignUpScreen';

const Stack = createStackNavigator();

const AppStack = () => {
    return(
        <Stack.Navigator 
          initialRouteName="SplashScreen"
          >
            <Stack.Screen 
            name="SplashScreen" 
            component={SplashScreen} 
            options={{
              headerShown:false ,
            }}
            />
            <Stack.Screen 
            name="Login" 
            component={LoginScreen}
            options={{
                headerShown:false ,
              }}
            />   
            <Stack.Screen 
            name="Sign Up" 
            component={SignUpScreen} 
            options={{
                headerShown:false ,
              }}
            />  
            <Stack.Screen 
            name="Home" 
            component={BottomNav}
            options={{
                headerShown:false ,
              }}
             />  
        </Stack.Navigator>
    );
}


const styles = StyleSheet.create({
  cardDistance:{
    marginBottom:10,
  }
})

export default AppStack;