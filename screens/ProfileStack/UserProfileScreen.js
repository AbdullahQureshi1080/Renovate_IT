// Native Imports
import 'react-native-gesture-handler';
import React,{useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { View,Text,ScrollView,Image, ImageBackground, Dimensions} from 'react-native';
import { Button,List } from 'react-native-paper';
import MaterialComunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

// Styles Imports
import ScreenStyles from '../../styles/ScreenStyles'

// Components
import ProfessionalAvator from '../../components/ProfessionalAvatar';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import TabNavigatorStyle from '../../styles/TabNavigatorStyle';


// Auth Imports
import useAuth from '../../auth/useAuth';


// Screen Imports
import UserProjectsScreen from './UserProjectsScreen';
import UserPostsScreen from './UserPostsScreen';
import AboutUser from './AboutScreen';
import { setUserData } from '../../store/auth';
// import { useEffect } from 'react';



const Tab = createMaterialTopTabNavigator();


const UserProjects = () =>{
    return(
        <Tab.Navigator tabBarOptions = {TabNavigatorStyle.userProjectsTab} >
            <Tab.Screen name = "Projects" component={UserProjectsScreen}/>
            <Tab.Screen name = "Posts" component={UserPostsScreen}/>
        </Tab.Navigator>
    )
}

const display = () =>{
return(
    <View><Text>Somthing to Display</Text></View>
);
}

const UserProfileScreen = ({navigation}) =>{
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const userId = state.entities.auth.data._id;
    const profile = state.entities.user.profile;
    console.log(profile);
    const getImageUri=()=>{
        if(profile){
            return profile.image;
        }
        else{
            return false;
        }
    }
    // const getProfileData=()=>{
    //     if(profile){
    //         return profile
    //     }
    //     else{
    //         const {email,firstname,lastname,_id} = "";
    //         return (email,firstname,lastname,_id)
    //     }
    // }
useEffect(()=>{
    // const profile = getProfileData();
    const updateAuthData = {email:profile.email,firstname:profile.firstname,lastname:profile.lastname,_id:userId}
    dispatch(setUserData(updateAuthData));
},[])
// console.log(profile.image)
    const imgUri = getImageUri();
    const {logOut} = useAuth(navigation);
    console.log(imgUri);
return(
    <ScrollView style={ScreenStyles.userprofileScreen}>
        <View style={{marginHorizontal:0}}> 
            <View style = {{display:"flex", flexDirection:"row", justifyContent:"space-between",}}>
                <Button 
                    icon={()=> <MaterialComunityIcons name="logout" size={30} color="#1B262C"/>} 
                    onPress={logOut}/>        
                {/* <Text style={{width:Dimensions.get('window').width/1.6}}></Text> */}
                <Button 
                    icon={()=> <MaterialComunityIcons name="account-edit" size={30} 
                    color="#1B262C"/>}
                    onPress={()=>navigation.navigate("Edit Profile",{profile:profile})}
                    />
           </View>
        </View>
        <View>
            <ProfessionalAvator imageUri={imgUri}name={`${profile.firstname} ${profile.lastname}`} title = {profile.jobtitle} email={profile.email} style={profileAvatar} disabled={true} size={90}/>
            </View>
        <View>
            <Tab.Navigator  
               tabBarOptions = {TabNavigatorStyle.userProfileTab}>
                   <Tab.Screen name = "About" component = {AboutUser}/>
                   <Tab.Screen name = "Projects" component = {UserProjects}/>
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