// Native Imports
import 'react-native-gesture-handler';
import React, {useEffect } from 'react';
import {useDispatch,useSelector} from "react-redux";
import { ImageBackground, StyleSheet,View } from 'react-native';

// Api Imports
import useApi from "../../hooks/useApi";
import userAPI from "../../api/user";
import dataAPI from "../../api/data";

// Component Imports
import ActivityIndicator from '../../components/ActivityIndicator';
import storage from '../../auth/storage';

// Redux-Store
import { loginUser, setUserData } from "../../store/auth";
import { setProfileData,setUserPosts,setUserPostIds } from '../../store/user';
import { setAppPosts } from '../../store/data';

const SplashScreen = ({navigation}) =>{
  const userApi = useApi(userAPI.userProfile);
  const appPostsApi = useApi(dataAPI.getAllPosts)
  const userPostsApi = useApi(userAPI.userPosts); 
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  console.log(state);
    useEffect(() => {
      const tryLogin = async () => {
        const userToken = await storage.getToken();
        const userData = await storage.getUser();
        if (!userToken) {
         navigation.navigate("Login");
          return;
        }
      const email = userData.email;
      console.log(email);
      const profileData = await userApi.request(email);
      const userPostsData = await userPostsApi.request(email);
      const appPosts = await appPostsApi.request();
      console.log(profileData);
       console.log(userPostsData)
      dispatch(loginUser(userToken));
      dispatch(setUserData(userData));
      dispatch(setProfileData(profileData));
      dispatch(setUserPostIds(userPostsData))
      
      dispatch(setAppPosts(appPosts.data))
        // console.log(state);
        navigation.navigate("Home");
      };
      tryLogin();
    }, []);
return(
    <View style={styles.container}>
        <ImageBackground source={require('../../assets/splashscreen.jpg')} style={styles.image}>
        <View style={styles.child}></View>
        <ActivityIndicator visible={true}/>
        </ImageBackground>
  </View>
);

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      backgroundColor:"#000000",
    //   marginHorizontal:20,
    },
    image: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center"
    },
    child: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        alignContent:"center",
        // alignSelf:"center",
      },
    text: {
      color: "white",
      fontSize: 42,
      fontWeight: "bold",
      textAlign: "center",
      backgroundColor: "#000000a0"
    }
  });
export default SplashScreen;