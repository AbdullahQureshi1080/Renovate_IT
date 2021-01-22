// Native Imports
import 'react-native-gesture-handler';
import React, {useEffect } from 'react';
import {useDispatch,useSelector} from "react-redux";
import { ImageBackground, StyleSheet,View } from 'react-native';


// Component Imports
import ActivityIndicator from '../../components/ActivityIndicator';
import storage from '../../auth/storage';

// Redux-Store
import { userVerify, assignUserData } from "../../store/auth";

const SplashScreen = ({navigation}) =>{
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  console.log(state);
    // useEffect(() => {
    //     setTimeout(()=>{navigation.navigate("Login")}, 3000)
    //   });
    useEffect(() => {
      const tryLogin = async () => {
        const userToken = await storage.getToken();
        const userData = await storage.getUser();
        if (!userToken) {
         navigation.navigate("Login");
          return;
        }
        dispatch(userVerify(userToken));
        dispatch(assignUserData(userData));
        // console.log(state);
        navigation.navigate("Home");
      };
    
    // const user = state.entities;
    // console.log(user);
      tryLogin();
      // add dispatch to dependency
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