import 'react-native-gesture-handler';
import React from 'react';
import { View,Text,ScrollView,Image, ImageBackground, Dimensions} from 'react-native';
import { Button } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ScreenStyles from '../styles/ScreenStyles'
import ProfessionalAvator from '../components/ProfessionalAvatar';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import TabNavigatorStyle from '../styles/TabNavigatorStyle';


const Tab = createMaterialTopTabNavigator();


const display = () =>{
    return(
        <View>
            <Text>Something to display</Text>
        </View>
    )
}

const UserProfileScreen = () =>{
return(
    <ScrollView style={ScreenStyles.userprofileScreen}>
        <View  > 
            <View style = {{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
            <Button icon={()=> <Ionicons name="md-settings" size={25} color="#1B262C"/>}/>
            <Button icon={()=> <MaterialIcons name="more-vert" size={30} color="#1B262C"/>}/>
           </View>
        </View>
        <View style = {{
            alignSelf:"center", 
            justifyContent:"center", 
            alignItems:"center", 
            alignContent:"center",
            marginLeft:50,
            marginVertical:15,
            }}>
           <ProfessionalAvator name="Abdul Karim" title=" Interior Designer" />
           </View>
           <View>
               <Tab.Navigator  
               tabBarOptions = {TabNavigatorStyle.userProfileTab}>
                   <Tab.Screen name = "Projects" component = {display}/>
                   <Tab.Screen name = "About" component = {display}/>
                   <Tab.Screen name = "Remote Firm" component = {display}/>
                   <Tab.Screen name = "Design a room" component = {display}/>
               </Tab.Navigator>
           </View>
    </ScrollView>
);

}

export default UserProfileScreen;