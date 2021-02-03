// Native Imports
import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { ImageBackground, StyleSheet,View, Text, Dimensions,} from 'react-native';
import {Button} from "react-native-paper";

// Component Imports
import AppFormField from '../../components/AppForm/AppFormField';
import SubmitButton from '../../components/AppForm/SubmitButton';
import AppForm from '../../components/AppForm/AppForm';
import AppButton from '../../components/AppButton';
import ActivityIndicator from '../../components/ActivityIndicator';

// Style Imports
import ComponentsStyle from '../../styles/ComponentsStyle';

// Supporting Imports
import * as Yup from "yup";

// Api Imports
import authAPI from '../../api/auth';
import userAPI from '../../api/user';
import useAuth from '../../auth/useAuth';
import useApi from '../../hooks/useApi';

import {loginUser } from "../../store/auth";


import ErrorMessage from '../../components/AppForm/ErrorMessage';
import AppText from '../../components/AppText';

var { width, height } = Dimensions.get('window')


const validationSchema = Yup.object().shape({
  firstname : Yup.string().required().label("First Name"),
  lastname : Yup.string().required().label("Last Name"),
  email : Yup.string().required().email().label("Email"),
  password : Yup.string().required().min(4).label("Password"),
  // retypepassword : Yup.string().required().min(4).label("Retype-Password"),
});


const SignUpScreen = ({navigation}) =>{
  const dispatch = useDispatch();
  const auth = useAuth()
  const registerApi = useApi(userAPI.register);
  const loginApi = useApi(authAPI.login);
  const [error, setError] = useState(); 
  const handleSubmit = async ({firstname,lastname,email,password}) =>{
    const result = await registerApi.request(firstname,lastname,email,password);
  if(!result.ok) {
    if(result.data) setError(result.data.error);
    else{
      setError("An unexpected error occured");
      console.log(result)
    }
  return;
  }
  const getNewToken = await loginApi.request(
    email,
    password,
  )
  auth.logIn(getNewToken.data);
  dispatch(loginUser(result.data));
  navigation.navigate("Home");
}
    return(
        // <ScrollView style={styles.container}>
            <ImageBackground source={require('../../assets/splashscreen.jpg')} style={styles.image}>
              <ActivityIndicator visible = {registerApi.loading || loginApi.loading}/>
            <View style={styles.child}> 
                <View style={{alignSelf:"center"}}>  
                <AppText style = {styles.titleText}>Sign Up</AppText>
                </View>
                <AppForm
          initialValues={{firstname:"", lastname: "", email:"", password:""}}
          onSubmit = {handleSubmit}
          validationSchema = {validationSchema}
          > 
           <View style={{alignSelf:"center"}}>
           <ErrorMessage error={error} visible={error}/>
            <AppFormField 
                  style={ComponentsStyle.inputStyleSign} 
                  label="First Name"
                  name="firstname" 
                  selectionColor="#f4f4f2" 
                  underlineColor="#f4f4f2" 
                  textColor="#f4f4f2"
                  />
            </View>
            <View style={{alignSelf:"center"}}>
            <AppFormField 
                  style={ComponentsStyle.inputStyleSign} 
                  label="Last Name"
                  name="lastname" 
                  selectionColor="#f4f4f2" 
                  underlineColor="#f4f4f2" 
                  textColor="#f4f4f2"
                  />
            </View>
            <View style={{alignSelf:"center"}}>
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
              <SubmitButton name="Sign Up" />
            {/* <Button 
              style={{backgroundColor:"#DB4437",  marginVertical:5,}} 
              color = "#F4F4F2">Sign in with google</Button> */}
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
                <AppButton name="Sign In" onPress={()=>navigation.navigate("Login")}/>
            </View>
          </AppForm>
            </View>
            </ImageBackground>
        // </ScrollView>
    );
    
    }
    
    const styles = StyleSheet.create({
        container: {
          flex: 1,
          flexDirection: "column",
          // marginVertical:30,
        },
        child: {
            flex: 1,
            flexDirection: "column",
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent:"center",
            paddingHorizontal:20,
            // paddingVertical :30,

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