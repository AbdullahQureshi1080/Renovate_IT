import React, { useState, useEffect } from "react";
import { StyleSheet, Text,View, TouchableOpacity,ScrollView} from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
 
import AppFormField from "../../components/AppForm/AppFormField";
import SubmitButton from "../../components/AppForm/SubmitButton";
import AppForm from "../../components/AppForm/AppForm";

 
import Screen from "../../components/Screen";
import FormImagePicker from"../../components/AppForm/FormImagePicker";
import FormDocumentPicker from "../../components/AppForm/FormImagePicker";
 
import firebase from "firebase";
import ActivityIndicator from "../../components/ActivityIndicator";


import userAPI from "../../api/user";
import useApi from "../../hooks/useApi";

import { addPost } from "../../store/user";
import AppText from "../../components/AppText";

// import ComponentsStyle from "../../styles/ComponentsStyle";
import ScreenStyles from '../../styles/ScreenStyles'
import ComponentsStyle from "../../styles/ComponentsStyle";
// import { ScrollView } from "react-native-gesture-handler";
require("firebase/firestore");
require("firebase/firebase-storage");
 
const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  budget: Yup.number().required().min(1).max(1000000).label("budget"),
  description: Yup.string().label("Description"),
  images: Yup.array()
    .min(1, "Please Select atleast one image")
    .max(3, "You can select Maximum of 3 Images"),
  documents: Yup.array()
    .min(1, "Please Select atleast one document")
    .max(2, "You can select Maximum of 3 Documents"),
});
 
 
function CreatePostScreen({ navigation }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const email = state.entities.auth.data.email;
  const userId = state.entities.auth.data._id;
  console.log(userId);
 
  const [isLoading, setIsLoading] = useState(false);
  const [saveData, setSaveData] = useState(false);
  const [error, setError] = useState();
  const [Images, setImages] = useState([]);
  const createApi = useApi(userAPI.createPost);
  const handleSubmit = async ({
    title,
    description,
    budget,
    images,
    documents,
  }) => {
    console.log("Handle Submit", title, description, budget, images, documents);
    // setIsLoading(false);
    const result = await createApi.request(
      email,
      title,
      description,
      budget,
      images,
      documents
    );
    // console.log(result.data);
    console.log(result);
    if (!result.ok) {
      // console.log(result.data);
      setError(result.data);
      setIsLoading(false);
      return setSaveData(true);
    }
    setSaveData(false);
    setIsLoading(false);
    dispatch(addPost(result.data));
    navigation.navigate("AppHome");
  };
  async function uploadAsPromise(file, type) {
    return new Promise(async function (resolve, reject) {
      const response = await fetch(file);
      // console.log(response);
      const blob = await response.blob();
      // console.log(blob);
      var childRoute = null;
      if (type == "img") {
        childRoute = "images";
      } else {
        childRoute = "documents";
      }
 
      const childPath = `posts/${userId}/${childRoute}/${Math.random().toString(36)}`;
 
      const task = firebase.storage().ref().child(childPath).put(blob);
 
      const taskProgress = (snapshot) => {
        console.log(`transferred: ${snapshot.bytesTransferred}`);
      };
      const taskCompleted = () => {
        const downloadURL = task.snapshot.ref.getDownloadURL();
        resolve(downloadURL);
      };
      const taskError = (snapshot) => {
        console.log("An Error Occured", snapshot);
        reject(err);
      };
 
      task.on("state_changed", taskProgress, taskError, taskCompleted);
    });
  }
 
  const handleFormSubmit = async ({
    title,
    budget,
    description,
    images,
    documents,
  }) => {
    setIsLoading(true);
    console.log("Going In Loop");
    const arrImages = [];
    const arrDocuments = [];
    for (var i = 0; i < images.length; i++) {
      var imageFile = images[i];
      var type = "img";
      await uploadAsPromise(imageFile,type).then((res) => {
        arrImages.push(res);
      });
    }
    console.log("Coming out of loop - Images");
    console.log(arrImages);
    for (var i = 0; i < documents.length; i++) {
      var documentFile = documents[i];
      var type = "doc";
      await uploadAsPromise(documentFile, type).then((res) => {
        arrDocuments.push(res);
      });
      console.log("Coming out of loop - Documents ");
      console.log(arrDocuments);
    }
    const postData = {
      title,
      budget,
      description,
      images: arrImages,
      documents: arrDocuments,
    };
    handleSubmit(postData);
  };
  return (
    <KeyboardAvoidingView>
      <ActivityIndicator visible={isLoading} />
    <ScrollView style={ScreenStyles.createPostScreen} showsVerticalScrollIndicator={false}>
      <AppForm
        initialValues={{
          title: "",
          budget: "",
          description: "",
          // category: null,
          images: [],
          documents: [],
        }}
        onSubmit={handleFormSubmit}
        validationSchema={validationSchema}
      >
          <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                <TouchableOpacity style={{alignSelf:"center"}} onPress={()=>navigation.goBack()}>
                  <MaterialCommunityIcons name="backspace" size={40} color="#495464"/>
                  </TouchableOpacity>
              <View style={{ alignSelf: "center" }}>
                <SubmitButton name="Create" />
            </View>
              </View>
              <View style={{ alignSelf: "center" }}>
            <AppText style={styles.titleText}>Create Post</AppText>
          </View>
        <AppFormField maxLength={255} name="title" placeholder="Title"   />
        <AppFormField
          keyboardType="numeric"
          maxLength={8}
          name="budget"
          placeholder="Budget"
        />
        <AppFormField
          maxLength={255}
          multiline
          name="description"
          numberOfLines={7}
          placeholder="Description"
        />
        <AppText style={styles.subTitleText}>Images</AppText>
        <FormImagePicker name="images" />
        <AppText  style={styles.subTitleText}>Documents</AppText>
        <FormDocumentPicker name="documents" />
    
      </AppForm>
    </ScrollView>
    </KeyboardAvoidingView>
  );
}
 
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  titleText: {
    fontFamily: "Poppins-Bold",
    color: "#495464",
    fontSize: 30,
    marginVertical: 7,
    opacity: 0.6,
    alignSelf: "center",
  },
  subTitleText: {
    fontFamily: "Poppins-Medium",
    color: "#495464",
    fontSize: 20,
    marginVertical: 5,
    opacity: 0.8,
    // alignSelf: "center",
  },
});
export default CreatePostScreen;
 

