// Native Imports
import 'react-native-gesture-handler';
import React, { useState, useContext} from 'react';
import { ImageBackground, StyleSheet,View, Text, Dimensions, ScrollView} from 'react-native';
import {Button} from "react-native-paper";

// Component Imports
import AppFormField from '../../components/AppForm/AppFormField';
import SubmitButton from '../../components/AppForm/SubmitButton';
import AppForm from '../../components/AppForm/AppForm';
import ErrorMessage from '../../components/AppForm/ErrorMessage';
import AppButton from '../../components/AppButton';

// Style Imports
import ComponentsStyle from '../../styles/ComponentsStyle';

// Supporting Imports
import * as Yup from "yup";

// Api Imports
import authAPI from '../../api/auth';
import useAuth from '../../auth/useAuth';


var { width, height } = Dimensions.get('window');




const validationSchema = Yup.object().shape({
  email : Yup.string().required().email().label("Email"),
  password : Yup.string().required().min(4).label("Password")
});

const LoginScreen = ({navigation}) =>{
  const {logIn} = useAuth()
  const [loginFailed, setLoginFailed] = useState(false); 
  const handleSubmit = async ({email,password}) =>{
    const result = await authAPI.login(email,password);
    if(!result.ok)return setLoginFailed(true);
    setLoginFailed(false);
    logIn(result.data);
  }
return(
    <View style={styles.container}>
        <ImageBackground source={require('../../assets/splashscreen.jpg')} style={styles.image}>
        <View style={styles.child}> 
        <View style={{alignSelf:"center"}}>  
            <Text style = {styles.titleText}>Sign In</Text>
        </View>
        <AppForm
          initialValues={{email:"",password:""}}
          onSubmit = {handleSubmit}
          validationSchema = {validationSchema}
          > 
          <View style={{alignSelf:"center"}}>
            <ErrorMessage error="Invalid email and/or Password" visible={loginFailed}/>
            <AppFormField 
                  style={ComponentsStyle.inputStyleSign}
                  label="Email" 
                  name="email" 
                  selectionColor="#f4f4f2"  
                  underlineColor="#f4f4f2" 
                  textColor="#f4f4f2"
                  />
            </View>
            <View style={{alignSelf:"center"}}>
            <AppFormField 
                  style={ComponentsStyle.inputStyleSign} 
                  label="Password" 
                  name="password" 
                  selectionColor="#f4f4f2" 
                  underlineColor="#f4f4f2" 
                  textColor="#f4f4f2"
                  textContentType ="password"
                  secureTextEntry = {true}
                  />

            </View>
            <View style={{alignSelf:"center"}}>
            <SubmitButton name="Sign in"/>
            <Button 
              style={{backgroundColor:"#DB4437",  marginVertical:5,}} 
              color = "#F4F4F2" onPress={()=>navigation.navigate("Home")}>Sign in with google</Button>
            </View>
            
            <View style={{
              marginVertical:15,
              borderBottomColor: '#F4f4F2', 
              borderBottomWidth: 1, 
              opacity:0.5,
              }}>
            </View>

            <View style={{alignSelf:"center"}}>
            <Text style={styles.text}>Don't have an account?</Text>
            <AppButton name="Sign Up" onPress={()=>navigation.navigate("Sign Up")}/>
            </View>
          </AppForm>        
            
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

export default LoginScreen;