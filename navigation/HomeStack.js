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

const Stack = createStackNavigator();


const searchBar = ()=>{
  return(
    <SearchBar placeholder = "Search"/>
  )
}
const HomeStack = () => {

    return(
        <Stack.Navigator 
          initialRouteName="Home"
          >
            <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{
              header:searchBar ,
              headerTitle: false,
              headerStyle:{
                marginHorizontal:20,
                marginTop:20,
              },
              
            }}
            />
            <Stack.Screen name="Project Details" component={ProjectDetailsScreen}
           />   
            <Stack.Screen name="Post Details" component={PostDetailsScreen} />  
            <Stack.Screen name="All Professionals" component={AllProfessionals}
             options={({ route }) => ({ title: route.params.title })}
            />  
        </Stack.Navigator>
    );
}


const styles = StyleSheet.create({
  cardDistance:{
    marginBottom:10,
  }
})

export default HomeStack;