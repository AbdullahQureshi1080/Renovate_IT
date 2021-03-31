import React, { useState, useEffect } from "react";
import { StyleSheet, Text,View, TouchableOpacity,ScrollView,KeyboardAvoidingView} from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
 
import AppFormField from "../../components/AppForm/AppFormField";
import SubmitButton from "../../components/AppForm/SubmitButton";
import AppForm from "../../components/AppForm/AppForm";

 
// import Screen from "../../components/Screen";
import FormImagePicker from"../../components/AppForm/FormImagePicker";
import FormDocumentPicker from "../../components/AppForm/FormImagePicker";
 
import firebase from "firebase";
import ActivityIndicator from "../../components/ActivityIndicator";


import userAPI from "../../api/user";
import useApi from "../../hooks/useApi";

import { addPost, editPost } from "../../store/user";
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
 
 
function UpdatePostScreen( {route,navigation}) {
  const dispatch = useDispatch();
  useEffect(()=>{
    setImages(route.params.images);
  },[])
  const state = useSelector((state) => state);
  const email = state.entities.auth.data.email;
  const userId = state.entities.auth.data._id;
  console.log(userId);
//  console.log(route.params.item)
  const [isLoading, setIsLoading] = useState(false);
  const [saveData, setSaveData] = useState(false);
  const [error, setError] = useState();
  const [Images, setImages] = useState([]);
  const updateApi = useApi(userAPI.updatePost);
  const handleSubmit = async ({
    id,
    title,
    description,
    budget,
    images,
    documents,
  }) => {
    console.log("Handle Submit", id,title, description, budget, images, documents);
    // setIsLoading(false);
    const result = await updateApi.request(
      id,
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
    // dispatch(editPost(result.data));
    // dispatch(editPost(result.data));
    navigation.reset({
      index: 0,
      routes: [{name: 'AppHome'}],
    });
  };

 
  const handleFormSubmit = async ({
    title,
    budget,
    description,
    images,
    documents,
  }) => {
    if(images[0].includes("https://")){
      setIsLoading(true);
      const postData = {
        id:route.params._id,
        title,
        budget,
        description,
        images: route.params.images,
        documents: route.params.documents,
      };
      handleSubmit(postData);
    }
    else{
      setIsLoading(true);
      console.log("Going In Loop");
      const arrImages = [];
      const arrDocuments = [];
      for (var i = 0; i < images.length; i++) {
        var imageFile = images[i];
        var type = "image";
        await uploadAsPromise(imageFile,type,uploadType,userId).then((res) => {
          arrImages.push(res);
        });
      }
      console.log("Coming out of loop - Images");
      console.log(arrImages);
      for (var i = 0; i < documents.length; i++) {
        var documentFile = documents[i];
        var type = "doc";
        await uploadAsPromise(documentFile, type,uploadType,userId).then((res) => {
          arrDocuments.push(res);
        });
        console.log("Coming out of loop - Documents ");
        console.log(arrDocuments);
      }
      const postData = {
        id:route.params._id,
        title,
        budget,
        description,
        images: arrImages,
        documents: arrDocuments,
      };
      handleSubmit(postData);
    }
    
  };
  return (
    <KeyboardAvoidingView style={{flex:1}}>
      <ActivityIndicator visible={isLoading} />
    <ScrollView style={ScreenStyles.createPostScreen} showsVerticalScrollIndicator={false}>
      <AppForm
        initialValues={{
          title: route.params.title || "",
          budget: route.params.budget || "",
          description: route.params.description ||"",
          // category: null,
          images:  route.params.images || [],
          documents: route.params.documents||[],
        }}
        onSubmit={handleFormSubmit}
        validationSchema={validationSchema}
      >
          <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                <TouchableOpacity style={{alignSelf:"center"}} onPress={()=> navigation.reset({
      index: 0,
      routes: [{name: 'AppHome'}],
    })}>
                  <MaterialCommunityIcons name="backspace" size={40} color="#495464"/>
                  </TouchableOpacity>
              <View style={{ alignSelf: "center" }}>
                <SubmitButton name="Update" />
            </View>
              </View>
              <View style={{ alignSelf: "center" }}>
            <AppText style={styles.titleText}>Update Post</AppText>
          </View>
          <AppText style={styles.labelText}>Post Title</AppText>

        <AppFormField maxLength={255} name="title"  placeholder={route.params.title}  style={{marginVertical:10,}} />
        <AppFormField
          keyboardType="numeric"
          maxLength={8}
          name="budget"
          placeholder={route.params.budget}
          style={{marginVertical:10,}}
        />
                 <AppText style={styles.labelText}>Post Description</AppText>

        <AppFormField
          maxLength={255}
          multiline
          name="description"
          numberOfLines={7}
          // placeholder="Description"
          placeholder={route.params.description}
          style={{marginVertical:10,}}
        />
        <AppText style={styles.subTitleText}>Images</AppText>
        <FormImagePicker name="images"/>
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
  labelText:{fontSize:15,fontFamily:"Poppins-Medium", opacity:0.4,}
});
export default UpdatePostScreen;
 

