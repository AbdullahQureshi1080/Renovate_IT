// Native Imports
import 'react-native-gesture-handler';
import React from 'react';
import { View,Text,ScrollView,Image, ImageBackground, Dimensions} from 'react-native';
import { Button,List } from 'react-native-paper';
import MaterialComunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo';

// Styles Imports
import ScreenStyles from '../../styles/ScreenStyles'

// Components
import ProfessionalAvator from '../../components/ProfessionalAvatar';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import TabNavigatorStyle from '../../styles/TabNavigatorStyle';
import InfoCard from '../../components/Card/InfoCard';
import ProfileEditScreen from './ProfileEditScreen';

const Tab = createMaterialTopTabNavigator();

const posts = () =>{
    return(
        <View>
            <Text>Posts will be here</Text>
        </View>
    );
}
const projects = () =>{
    return(
        <View>
            <Text>Projects will be here</Text>
        </View>
    );
}
const userProjects = () =>{
    return(
        <Tab.Navigator tabBarOptions = {TabNavigatorStyle.userProjectsTab} >
            <Tab.Screen name = "Projects" component={projects}/>
            <Tab.Screen name = "Posts" component={posts}/>
        </Tab.Navigator>
    )
}


const display = () =>{
    return(
        <View>
            <Text>Something to display</Text>
        </View>
    )
}

const userAbout = () =>{
    return(
        <ScrollView>
            <View style={{flex:1, flexDirection:"row", justifyContent:"space-between"}}>
                <InfoCard subtitle="Thumb-Ups" value={300} />
                <InfoCard subtitle="Following" value={50} />
                <InfoCard subtitle="Followers" value={10} />
            </View>
            <View>
                <View style = {ScreenStyles.userprofileScreen.userAbout}>
                    <Text style = {ScreenStyles.userprofileScreen.userAbout.userAboutTitle}>Location</Text>
                    <Text><Entypo name="location-pin" size={18}/>Location</Text>
                </View>
                <View style = {ScreenStyles.userprofileScreen.userAbout}>
                    <Text style = {ScreenStyles.userprofileScreen.userAbout.userAboutTitle}>Job Title</Text>
                    <Text>Job Title</Text>
                </View>
                <View style = {ScreenStyles.userprofileScreen.userAbout}>
                    <Text style = {ScreenStyles.userprofileScreen.userAbout.userAboutTitle}>About</Text>
                    <Text>About</Text>
                </View>
            </View>
        </ScrollView>
    );
}

const logout = () =>{
    return(
        <View>
            {console.log("logout")}
        </View>
    );
}


const UserProfileScreen = ({navigation}) =>{
return(
    <ScrollView style={ScreenStyles.userprofileScreen}>
        <View> 
            <View style = {{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                <Button 
                    icon={()=> <MaterialComunityIcons name="logout" size={25} color="#1B262C"/>} 
                    onPress={logout}/>        
                <Text style={{width:Dimensions.get('window').width/1.6}}></Text>
                <Button 
                    icon={()=> <MaterialComunityIcons name="account-edit" size={30} 
                    color="#1B262C"/>}
                    onPress={()=>navigation.navigate("Edit Profile")}/>
           </View>
        </View>
        <View>
            <ProfessionalAvator name="Abdul Karim" title=" Interior Designer" style={profileAvatar} disabled={true} size={90}/>
            </View>
        <View>
            <Tab.Navigator  
               tabBarOptions = {TabNavigatorStyle.userProfileTab}>
                   <Tab.Screen name = "Projects" component = {userProjects}/>
                   <Tab.Screen name = "About" component = {userAbout}/>
                   <Tab.Screen name = "Remote Firm" component = {display}/>
                   <Tab.Screen name = "Design a room" component = {display}/>
               </Tab.Navigator>
           </View>
    </ScrollView>
);

}

const profileAvatar = {
    border:"none",
    marginVertical:15,
    alignItems: 'center',
    nameText : {
        fontSize : 18,
        marginTop : 5,
        color:"#495464",
        fontFamily: 'Poppins-Bold',
    },
    titleText : {
        fontSize : 16,
        fontWeight:"normal",
        color:"#495464",
        fontFamily: 'Poppins-Medium',
    }
}


export default UserProfileScreen;