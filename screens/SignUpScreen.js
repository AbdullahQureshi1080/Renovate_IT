import 'react-native-gesture-handler';
import React, { useRef } from 'react';
import { ImageBackground, StyleSheet,View, Text, Dimensions, Keyboard,TouchableWithoutFeedback } from 'react-native';
import InputText from '../components/TextInput';
import {Button} from "react-native-paper";
import ComponentsStyle from '../styles/ComponentsStyle';

var { width, height } = Dimensions.get('window')

const SignUpScreen = ({navigation}) =>{
    return(
        <View style={styles.container}>
            <ImageBackground source={require('../assets/splashscreen.jpg')} style={styles.image}>
            <View style={styles.child}> 
                <View style={{alignSelf:"center"}}>  
                <Text style = {styles.titleText}>Sign Up</Text>
                </View>
                <View style={{alignSelf:"center"}}>
                    <InputText style={ComponentsStyle.inputStyleSign} label="First Name" selectionColor="#f4f4f2" underlineColor="#f4f4f2" textColor="#f4f4f2"/>
                </View>
                <View style={{alignSelf:"center"}}>
                    <InputText style={ComponentsStyle.inputStyleSign} label="Last Name" selectionColor="#f4f4f2" underlineColor="#f4f4f2" textColor="#f4f4f2"/>
                </View>
                <View style={{alignSelf:"center"}}>
                    <InputText style={ComponentsStyle.inputStyleSign} label="Email" selectionColor="#f4f4f2" underlineColor="#f4f4f2" textColor="#f4f4f2"/>
                </View>
                <View style={{alignSelf:"center"}}>
                    <InputText style={ComponentsStyle.inputStyleSign} label="Password" disabled={false} selectionColor="#f4f4f2" underlineColor="#f4f4f2" textColor="#f4f4f2"/>
                </View>
                <View style={{alignSelf:"center"}}>
                    <InputText style={ComponentsStyle.inputStyleSign} label="Re-type Password" disabled={false} selectionColor="#f4f4f2" underlineColor="#f4f4f2" textColor="#f4f4f2"/>
                </View>
                <View style={{alignSelf:"center"}}>
                <Button style={styles.btnSign} color = "#F4F4F2" onPress={()=>navigation.navigate("Home")}>Sign Up</Button>
                </View>
                
                <View style={{
                  marginVertical:15,
                  borderBottomColor: '#F4f4F2', 
                  borderBottomWidth: 1, 
                  opacity:0.5,
                  }}>
                </View>
                <View style={{alignSelf:"center"}}>
                <Text style={styles.text}>Already have an account?</Text>
                <Button style={styles.btnSign} color = "#F4F4F2" onPress={()=>navigation.navigate("Login")}>Sign In</Button>
                </View>
            </View>
            </ImageBackground>
        </View>
    );
    
    }
    
    const styles = StyleSheet.create({
        container: {
          flex: 1,
          flexDirection: "column",
        },
        child: {
            flex: 2,
            flexDirection: "column",
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent:"center",
            paddingHorizontal:20,
          },
        image: {
          flex: 1,
          resizeMode: "cover",
          justifyContent: "center"
        },
        titleText:{
          fontFamily:"Poppins-Bold",
          color: "#E8E8E8",
          fontSize: 30,
          marginVertical:10,
          opacity:0.6,
          alignSelf:"center"
        },
        text: {
          fontFamily:"Poppins-Medium",
          color: "#E8E8E8",
          fontSize: 20,
          opacity:0.8,
        },
        btnSign:{
            backgroundColor:"#495464", 
            marginVertical:10, 
            width:width/3,
            alignSelf:"center",
        }
      });    

export default SignUpScreen;