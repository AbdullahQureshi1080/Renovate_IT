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
import FormDocumentPicker from "../../components/AppForm/FormDocumentPicker";
 
import firebase from "firebase";
import ActivityIndicator from "../../components/ActivityIndicator";


import userAPI from "../../api/user";
import dataAPI from "../../api/data";
import useApi from "../../hooks/useApi";

import { addPost } from "../../store/user";
import { addDataPost } from "../../store/data";

import AppText from "../../components/AppText";


import ScreenStyles from '../../styles/ScreenStyles'
import uploadAsPromise from "../../api/imageUpload";
import ImageInput from "../../components/List/AvatarList/ImageInput";
import SelectUserModal from "../../components/Modal/SelectUserModal";
import AppButton from "../../components/AppButton";

require("firebase/firestore");
require("firebase/firebase-storage");
 
const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  description: Yup.string().label("Description"),
});
 
 
function CreateFirmScreen( {navigation, route}) {
    const [visible,setVisible] = useState(false);
    // const [imageUri, setImageUri]=useState(null)
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const email = state.entities.auth.data.email;
  const userId = state.entities.auth.data._id;
  const [imageUri, setImageUri] = useState(undefined);
  const [users,setUsers]=useState([]);
//   console.log(userId);
//  console.log(route.params)
  const [isLoading, setIsLoading] = useState(false);
  const [saveData, setSaveData] = useState(false);
  const [error, setError] = useState();
  const [Images, setImages] = useState([]);
  const usersApi = useApi(dataAPI.getAllUsers);
  const createApi = useApi(userAPI.createPost);

  const fetchUsers = async()=>{
    const result = await usersApi.request(email);
    if(!result.ok){
       setError("Could not retrive posts at this moment, refresh. ")
       return;
    }
    // console.log(result.data);
    // console.log("This happens")
    let allusers = result.data.filter(user=>user.email !== email)
    setUsers(allusers);
 }

 useEffect(()=>{
    fetchUsers();
    console.log(users);
},[users])
//   const handleSubmit = async ({
//     title,
//     description,
//     budget,
//     images,
//     documents,
//   }) => {
//     console.log("Handle Submit", title, description, budget, images, documents);
//     // setIsLoading(false);
//     const result = await createApi.request(
//       email,
//       title,
//       description,
//       budget,
//       images,
//       documents
//     );
//     // console.log(result.data);
//     console.log(result);
//     if (!result.ok) {
//       // console.log(result.data);
//       setError(result.data);
//       setIsLoading(false);
//       return setSaveData(true);
//     }
//     setSaveData(false);
//     setIsLoading(false);
//     dispatch(addPost(result.data));
//     dispatch(addDataPost(result.data));
//     navigation.reset({
//       index: 0,
//       routes: [{name: 'AppHome'}],
//     });
//   };
  
 
//   const handleFormSubmit = async ({
//     title,
//     budget,
//     description,
//     images,
//     documents,
//   }) => {
//     setIsLoading(true);
//     console.log("Going In Loop");
//     const arrImages = [];
//     const arrDocuments = [];
//     const uploadType = "posts";

//     for (var i = 0; i < images.length; i++) {
//       var imageFile = images[i];
//       var type = "image";
//       await uploadAsPromise(imageFile,type,uploadType,userId).then((res) => {
//         arrImages.push(res);
//       });
//     }
//     console.log("Coming out of loop - Images");
//     console.log(arrImages);
//     for (var i = 0; i < documents.length; i++) {
//       var documentFile = documents[i];
//       var type = "doc";
//       await uploadAsPromise(documentFile, type,uploadType,userId).then((res) => {
//         arrDocuments.push(res);
//       });
//       console.log("Coming out of loop - Documents ");
//       console.log(arrDocuments);
//     }
//     const postData = {
//       title,
//       budget,
//       description,
//       images: arrImages,
//       documents: arrDocuments,
//     };
//     handleSubmit(postData);
//   };

const handleSearch = (search) => {
    // console.log(route.params);
    const query = search.toLowerCase();
    if(query == ""){
        // Fetch Users
        fetchUsers()
      return
    }
    const searched = users.filter(function (item) {
      return item.email.includes(query.toLowerCase());
    })
    setUsers(searched)

  }; 

 const onPressAdd = (user)=>{
     console.log("Add the Member selected")
     console.log("Selected User from Modal of Users",user)
    setVisible(false);
 } 

  return (
    <KeyboardAvoidingView style={{flex:1,}}>
      <ActivityIndicator visible={isLoading} />
    <ScrollView style={ScreenStyles.createPostScreen} showsVerticalScrollIndicator={false}>
      <AppForm
        initialValues={{
          title: "",
          description:"",

        }}
        onSubmit={()=>console.log("Handle Submit for remote firm")}
        validationSchema={validationSchema}
      >
          <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                <TouchableOpacity style={{alignSelf:"center"}} onPress={()=>navigation.goBack()}>
                  <MaterialCommunityIcons name="backspace" size={40} color="#1b262c"/>
                  </TouchableOpacity>
              <View style={{ alignSelf: "center" }}>
                <SubmitButton name="Create" />
            </View>
              </View>
              <View style={{ alignSelf: "center" }}>
            <AppText style={styles.titleText}>Create Remote Firm</AppText>
          </View>
          <AppText style={styles.labelText}>Firm Title</AppText>
        <AppFormField maxLength={255} name="title" placeholder="Title"   />
        <AppText style={styles.labelText}>Firm Description</AppText>
        <AppFormField
          maxLength={255}
          multiline
          name="description"
          numberOfLines={7}
          placeholder="Description"
        />
         <AppText style={styles.labelText}>Add Members</AppText>
        <View style={styles.addMember}>
            <SelectUserModal btnName="Add" btnCloseName="Cancel" isVisible={visible} onChangeText={(value) => handleSearch(value)} onPressAdd={(user) => onPressAdd(user)} onPressCancel={() => setVisible(false)} data={users} />
            <AppButton name="Modal Visible" onPress={()=>setVisible(true)}/>
        </View>
      </AppForm>
    </ScrollView>
    </KeyboardAvoidingView>
  );
}
 
const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "grey",
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
        height: 100,
        width: 100,
        overflow: "hidden",
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
  labelText:{
      fontSize:15,
      fontFamily:"Poppins-Medium", 
      opacity:0.4, 
      marginVertical:5
    },
      image: {
        height: "100%",
        width: "100%",
      },
    // addMember:{
    //     marginVertical:10,
    //     backgroundColor:"red",
    //     borderRadius:30,
    //     width:150,
    // }
});
export default CreateFirmScreen;
 

