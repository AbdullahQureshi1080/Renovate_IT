import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View,TouchableOpacity,StyleSheet} from 'react-native';
import HomeScreen  from '../screens/HomeScreen';
import ProjectDetailsScreen  from '../screens/ProjectDetailsScreen';
import SearchBar from '../components/SearchBar';
import PostDetailsScreen from '../screens/PostDetailsScreen';

const Stack = createStackNavigator();


const AppStackNav = () => {
    return(
        <Stack.Navigator 
          initialRouteName="Home"
          screenOptions = {{
            headerStyle:{
            }
          }}
          >
            <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{
              header: SearchBar,
              headerTitle: false,
              headerStyle:{
                marginHorizontal:20,
                marginTop:20,
              }
            }}
            />
            <Stack.Screen name="ProjectDetails" component={ProjectDetailsScreen} />   
            <Stack.Screen name="PostDetails" component={PostDetailsScreen} />  
        </Stack.Navigator>
    );
}


const styles = StyleSheet.create({
  cardDistance:{
    marginBottom:10,
  }
})

export default AppStackNav;