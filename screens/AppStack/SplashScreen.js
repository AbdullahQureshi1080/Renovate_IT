// Native Imports
import 'react-native-gesture-handler';
import React, {useEffect } from 'react';
import { ImageBackground, StyleSheet,View } from 'react-native';

// Component Imports
import ActivityIndicator from '../../components/ActivityIndicator';


const SplashScreen = ({navigation}) =>{
    useEffect(() => {
        setTimeout(()=>{navigation.navigate("Login")}, 3000)
      });
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