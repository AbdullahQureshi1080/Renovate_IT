import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View,TouchableOpacity,StyleSheet,Text} from 'react-native';
import HomeScreen  from '../screens/HomeScreen';
import ProjectDetailsScreen  from '../screens/ProjectDetailsScreen';
import SearchBar from '../components/SearchBar';
import PostDetailsScreen from '../screens/PostDetailsScreen';
import BottomNav from './BottomNavigator';
import AllProfessionals from "../screens/AllProfessionals"; 
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';

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