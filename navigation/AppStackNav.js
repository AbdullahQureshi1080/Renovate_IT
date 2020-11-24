import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View,TouchableOpacity,StyleSheet} from 'react-native';
import HomeScreen  from '../screens/HomeScreen';
import ProjectDetailsScreen  from '../screens/ProjectDetailsScreen';
import SearchBar from '../components/SearchBar';
import PostDetailsScreen from '../screens/PostDetailsScreen';
const Stack = createStackNavigator();

const AllProfessionals = () =>{
   return(
      <View>
         <Text>Hiya All Professionals will be here </Text>
      </View>
   );
}

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
            <Stack.Screen name="Project Details" component={ProjectDetailsScreen} />   
            <Stack.Screen name="Post Details" component={PostDetailsScreen} />  
            <Stack.Screen name="All Professionals" component={AllProfessionals} />  
        </Stack.Navigator>
    );
}


const styles = StyleSheet.create({
  cardDistance:{
    marginBottom:10,
  }
})

export default AppStackNav;