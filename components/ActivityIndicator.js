import React from 'react';
import LottieView from 'lottie-react-native';
import {View,StyleSheet} from "react-native";

export default function ActivityIndicator ({visible=false}){
    if (!visible) return null;

    return(
        <View style = {styles.overlay}>
            <LottieView 
                autoPlay
                loop
                source = {require("../assets/animations/loading-round.json")}
            />
        </View>  
    )
}

const styles = StyleSheet.create({
    overlay:{
        position: "absolute",
        backgroundColor:"#495464",
        height:"100%",
        opacity:0.6,
        width:"100%",
        zIndex:1,
    }
})