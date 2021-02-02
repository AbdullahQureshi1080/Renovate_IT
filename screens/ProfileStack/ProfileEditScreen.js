// Native Imports
import 'react-native-gesture-handler';
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  Alert,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
} from "react-native";
// import { Button,List,TextInput } from 'react-native-paper';

// Components Imports
import InputText from '../../components/AppTextInput';
import ProfessionalAvatar from '../../components/ProfessionalAvatar';
import AppFormField from "../../components/AppForm/AppFormField";
import SubmitButton from "../../components/AppForm/SubmitButton";
import AppForm from "../../components/AppForm/AppForm";
import ErrorMessage from "../../components/AppForm/ErrorMessage";
import AppButton from "../../components/AppButton";

// Styles Imports
import ScreenStyles from '../../styles/ScreenStyles'
import ComponentsStyle from "../../styles/ComponentsStyle";

import firebase from "firebase";
require("firebase/firestore");
require("firebase/firebase-storage");
 
 
// Supporting Imports
import * as Yup from "yup";
 
// Api Imports
// import authAPI from "../../api/auth";
import userAPI from "../../api/user";
// import useAuth from "../../auth/useAuth";
import useApi from "../../hooks/useApi";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ImageInput from '../../components/Image/ImageInput';
 
var { width, height } = Dimensions.get("window");
 
const validationSchema = Yup.object().shape({
  firstname: Yup.string().required().label("First Name"),
  lastname: Yup.string().required().min(3).label("Last Name"),
  about: Yup.string().label("About"),
  location: Yup.string().min(3).label("Location"),
  jobtitle: Yup.string().min(3).label("Job Title"),
  image: Yup.string(),
});
 
const ProfileEditScreen = ({ navigation, route }) => {
  // console.log(state.entities.auth.data);
  const [imageUri, setImageUri] = useState(null);
  const [downloadURL, setDownloadURL] = useState("");
  // console.log(imageUri);
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const userEmail = state.entities.auth.data.email;
  const userId = state.entities.auth.data._id;
  console.log(userId);
  const [isLoading, setIsLoading] = useState(false);
  const [saveData, setSaveData] = useState(false);
  const userApi = useApi();
  const handleSubmit = async ({
    firstname,
    lastname,
    about,
    location,
    jobtitle,
    image,
  }) => {
      
  
    image = downloadURL;
    const result = {
      firstname,
      lastname,
      about,
      location,
      jobtitle,
      image,
    };
    console.log(result);
    setIsLoading(true);
    // const result = await userAPI.updateProfile(
    //   userEmail,
    //   firstname,
    //   lastname,
    //   about,
    //   location,
    //   jobtitle
    // );
 
    // if (!result.ok) {
    //   // console.log(result.data);
    //   setError(result.data);
    //   setIsLoading(false);
    //   return setSaveData(true);
    // }
    // setSaveData(false);
    // setIsLoading(false);
    // // console.log(result.data);
    // dispatch(setProfileData(result.data));
    // // logIn(result.data);
    // navigation.navigate("Home");
  };
 
  return (
    <ScrollView style={ScreenStyles.profileEditScreen}>
      <View style={styles.container}>
          <AppForm
            initialValues={{
              firstname: "",
              lastname: "",
              about: "",
              location: "",
              jobtitle: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
                       <ActivityIndicator visible = {userApi.loading}/>
              <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                  <TouchableOpacity style={{alignSelf:"center"}} onPress={()=>navigation.goBack()}>
                  <MaterialCommunityIcons name="backspace" size={40} color="#495464"/>
                  </TouchableOpacity>
              <View style={{ alignSelf: "center" }}>
              {isLoading ? (
                <ActivityIndicator size="small" color="crimson" />
              ) : (
                <SubmitButton name="save" />
              )}
            </View>
              </View>
              <View style={{ alignSelf: "center" }}>
            <Text style={styles.titleText}>Edit Profile</Text>
          </View>
          <View style={{ alignSelf: "center" }}>
         <ImageInput imageUri={imageUri} onChangeImage={imageUri=>setImageUri(imageUri)}/>
         </View>
            <View style={{ alignSelf: "center" }}>
              <ErrorMessage
                error="Not able to save User Data"
                visible={saveData}
              />
              <AppFormField
               style={{...ComponentsStyle.inputStyleSign,backgroundColor: 'rgba(0, 0, 0, 0.3)'}}
                label="First Name"
                name="firstname"
                selectionColor="#f4f4f2"
                underlineColor="#f4f4f2"
                 textColor="#495464"
              />
              <AppFormField
                   style={{...ComponentsStyle.inputStyleSign,backgroundColor: 'rgba(0, 0, 0, 0.3)'}}
                label="Last Name"
                name="lastname"
                selectionColor="#f4f4f2"
                underlineColor="#f4f4f2"
                textColor="#f4f4f2"
              />
              <AppFormField
                 style={{...ComponentsStyle.inputStyleSign,backgroundColor: 'rgba(0, 0, 0, 0.3)'}}
                label="Location"
                name="location"
                selectionColor="#f4f4f2"
                underlineColor="#f4f4f2"
                 textColor="#495464"
              />
              <AppFormField
                style={{...ComponentsStyle.inputStyleSign,backgroundColor: 'rgba(0, 0, 0, 0.3)'}}
                label="About"
                name="about"
                selectionColor="#495464"
                underlineColor="#495464"
                textColor="#495464"
                multiline = {true}
                numberOfLines = {5}

              />
              <AppFormField
                  style={{...ComponentsStyle.inputStyleSign,backgroundColor: 'rgba(0, 0, 0, 0.3)'}}
                label="Job Title"
                name="jobtitle"
                selectionColor="#f4f4f2"
                underlineColor="#f4f4f2"
                 textColor="#495464"
              />
            </View>
 
            <View
              style={{
                marginVertical: 15,
                borderBottomColor: "#F4f4F2",
                borderBottomWidth: 1,
                opacity: 0.5,
              }}
            ></View>
          </AppForm>
        {/* </View> */}
      </View>
    </ScrollView>
  );
};
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    marginVertical:20,
  },
  child: {
    flex: 2,
    flexDirection: "column",
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  titleText: {
    fontFamily: "Poppins-Bold",
    color: "#495464",
    fontSize: 30,
    marginVertical: 10,
    opacity: 0.6,
    alignSelf: "center",
  },
  text: {
    // fontFamily: "Poppins-Medium",
    color: "#E8E8E8",
    fontSize: 20,
    opacity: 0.8,
  },
  btnSign: {
    backgroundColor: "#495464",
    marginVertical: 10,
    width: width / 3,
    alignSelf: "center",
  },
  mainContainer: {
    backgroundColor: "grey",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    height: 100,
    width: 100,
    overflow: "hidden",
  },
  profileImage: {
    height: "100%",
    width: "100%",
  },
});
 
export default ProfileEditScreen;
