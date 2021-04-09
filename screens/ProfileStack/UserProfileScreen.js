// Native Imports
import 'react-native-gesture-handler';
import React,{useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { View,Text,ScrollView,Image, ImageBackground, Dimensions, SafeAreaView} from 'react-native';
import { Button,List } from 'react-native-paper';
import MaterialComunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useFocusEffect } from '@react-navigation/native';

// Styles Imports
import ScreenStyles from '../../styles/ScreenStyles'

// Components
import ProfessionalAvator from '../../components/ProfessionalAvatar';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import TabNavigatorStyle from '../../styles/TabNavigatorStyle';


// Auth Imports
import useAuth from '../../auth/useAuth';
import useApi from '../../hooks/useApi';
import userAPI from '../../api/user';

// Screen Imports
import UserProjectsScreen from './UserProjectsScreen';
import UserPostsScreen from './UserPostsScreen';
import AboutUser from './AboutScreen';
import { setUserData } from '../../store/auth';
import { setProfileData } from '../../store/user';
import RemoteFirmScreen from './RemoteFirmScreen';
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

const UserProfileScreen = ({navigation,route}) =>{
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const userId = state.entities.auth.data._id;
    const profile = state.entities.user.profile;
    const allUsers = state.entities.data.allusers;
    const [userProfile,setUserProfile] = useState(null);
    const [checkId,setCheckId] = useState(false);

    const profileApi = useApi(userAPI.userProfile);
    
    
    
    useEffect(()=>{
    console.log("Avator Data from All Professional",route?.params);
    console.log("All Users of the App",allUsers)
    const updateAuthData = {email:profile.email,firstname:profile.firstname,lastname:profile.lastname,_id:userId}
    dispatch(setUserData(updateAuthData));

   
            if(route.params._id == profile._id) {
                setCheckId(false);
                setUserProfile(profile)
            }
            else{
                if(route.params._id !== profile._id){
                    setCheckId(true);
                    setUserProfile(route.params.user);
                } 
            }
        
},[route.params._id])

const getImageUri=()=>{
    if(userProfile){
        return userProfile.image;
    }
    else{
        return false;
    }
}
// console.log(profile.image)
    const imgUri = getImageUri();
    const {logOut} = useAuth(navigation);
    // console.log(imgUri);

    if(userProfile === null){
        return <View/>
    }
return(
    <ScrollView style={ScreenStyles.userprofileScreen}>
        {!checkId?
        (
            <View style={{marginHorizontal:0}}> 
            <View style = {{display:"flex", flexDirection:"row", justifyContent:"space-between",}}>
                <Button 
                    icon={()=> <MaterialComunityIcons name="logout" size={30} color="#1B262C"/>} 
                    onPress={logOut}/>        
                <Button 
                    icon={()=> <MaterialComunityIcons name="account-edit" size={30} 
                    color="#1B262C"/>}
                    onPress={()=>navigation.navigate("Edit Profile",{profile:profile})}
                    />
           </View>
        </View>
        )
        :
        (
        <View/>
        )
        }
        <View>
            <ProfessionalAvator 
            imageUri={imgUri}
            name={(userProfile.firstname == undefined && userProfile.lastname == undefined)?userProfile.name:`${userProfile.firstname} ${userProfile.lastname}`}
            title = {userProfile.jobtitle} 
            email={userProfile.email} 
            style={profileAvatar} 
            disabled={true} 
            size={90}
            placeholdertext={"Update profile to set title"}
            />
            </View>
        <View>
            <Tab.Navigator  
               tabBarOptions = {TabNavigatorStyle.userProfileTab}>
                   <Tab.Screen name = "About" component = {AboutUser} initialParams={userProfile}/>
                   <Tab.Screen name = "Projects" component = {UserProjects}/>
                   <Tab.Screen name = "Remote Firm" component = {RemoteFirmScreen}/>
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