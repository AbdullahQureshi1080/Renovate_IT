import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text,View, TouchableOpacity,ScrollView,KeyboardAvoidingView,Image} from "react-native";
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
import ProfessionalAvatar from '../../components/ProfessionalAvatar';
// import ImageInput from "../../components/List/AvatarList/ImageInput";
import SelectUserModal from "../../components/Modal/SelectUserModal";
import AppButton from "../../components/AppButton";
import { Dimensions } from "react-native";

require("firebase/firestore");
require("firebase/firebase-storage");
 
const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  description: Yup.string().label("Description"),
});
 
 
function CreateFirmScreen( {navigation, route}) {
    const [modalVisible1,setModalVisible1] = useState(false);
    const [modalVisible2,setModalVisible2] = useState(false);
    const [modalVisible3,setModalVisible3] = useState(false);
    // const [imageUri, setImageUri]=useState(null)
  // const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const email = state.entities.auth.data.email;
  const userId = state.entities.auth.data._id;
  // const [imageUri, setImageUri] = useState(undefined);
  const [users,setUsers]=useState([]);
  const [allArchitects, setAllArchitects]=useState([]);
  const [allBuilders, setAllBuilders]=useState([]);
  const [allSuppliers, setAllSuppliers]=useState([]);
  const [selectedArchitect,setSelectedArchitect]=useState(null);
  const [selectedBuilder,setSelectedBuilder]=useState(null);
  const [selectedSupplier,setSelectedSupplier]=useState(null);
//   console.log(userId);
//  console.log(route.params)
  const [isLoading, setIsLoading] = useState(false);
  const [saveData, setSaveData] = useState(false);
  const [error, setError] = useState();
  const [Images, setImages] = useState([]);
  const usersApi = useApi(dataAPI.getAllUsers);
  const createApi = useApi(userAPI.createFirm);

  const fetchUsers = async()=>{
    const result = await usersApi.request(email);
    if(!result.ok){
       setError("Could not retrive posts at this moment, refresh. ")
       return;
    }
    let allusers = result.data.filter(user=>user.email !== email)
    setUsers(allusers);
 }

 useEffect(()=>{
    fetchUsers();
    // console.log(users);
},[])

const dataForModal = (type)=>{
  console.log("Hiya",type)
  let allUsers = [...users];
  if(type == "architect"){
    let specificUsers  = allUsers.filter(user=>user.jobcategory == "Architecture") 
    setAllArchitects(specificUsers)
  }
  else if(type == "builder"){
    let specificUsers  = allUsers.filter(user=>user.jobcategory == "Builder") 
    setAllBuilders(specificUsers)

 }
 if(type == "supplier"){
  let specificUsers  = allUsers.filter(user=>user.jobcategory == "Supplier") 
  setAllSuppliers(specificUsers);
 }
}
  const handleSubmit = async ({
    title,
    description,
  }) => {
    // setIsLoading(true);
    const members = {
      "architect":selectedArchitect,
      "builder":selectedBuilder,
      "supplier":selectedSupplier,
    }
    console.log("Handle Submit", title, description,members);
    const result = await createApi.request(
      email,
      title,
      description,
      members,
    );
    // // console.log(result.data);
    if (!result.ok) {
      // console.log(result.data);
      setError(result.data);
      setIsLoading(false);
      return setSaveData(true);
    }
    setSaveData(false);
    // setIsLoading(false);
    navigation.reset({
      index: 0,
      routes: [{name: 'User Profile'}],
    });
  };

const handleSearch = (search,type) => {
    // console.log(route.params);
    let allUsers = [...users];
    const query = search.toLowerCase();
    if(query == ""){
        // Fetch Users for Modal
        if(type == "architect"){
          let specificUsers  = allUsers.filter(user=>user.jobcategory == "Architecture") 
          setAllArchitects(specificUsers)
        }
        else if(type == "builder"){
          let specificUsers  = allUsers.filter(user=>user.jobcategory == "Builder") 
          setAllBuilders(specificUsers)
       }
       if(type == "supplier"){
        let specificUsers  = allUsers.filter(user=>user.jobcategory == "Supplier") 
        setAllSuppliers(specificUsers);
       }
      return
    }
    else if( query !== ""){
         if(type == "architect"){
         let searched = allArchitects.filter(function (item) {
        return item.email.includes(query.toLowerCase());
      })
      setAllArchitects(searched)
        }
        else if(type == "builder"){
          let searched = allBuilders.filter(function (item) {
            return item.email.includes(query.toLowerCase());
          })
          setAllBuilders(searched)
       }
       if(type == "supplier"){
        let searched = allSuppliers.filter(function (item) {
          return item.email.includes(query.toLowerCase());
        })
        setAllSuppliers(searched)
       }
    }

  }; 

 const onPressAdd = (user,type)=>{ 
     console.log("Selected User from Modal of Users",user)
     if(type == "architect"){
       setModalVisible1(false);
      setSelectedArchitect(user);
     }
     else if(type == "builder"){
      setModalVisible2(false);
      setSelectedBuilder(user);
    }
    if(type == "supplier"){
      setModalVisible3(false);
      setSelectedSupplier(user);
    }
 } 

  return (
    <KeyboardAvoidingView style={{flex:1,}}>
      <ActivityIndicator visible={isLoading} />
    <ScrollView style={ScreenStyles.createFirmScreen} showsVerticalScrollIndicator={false}>
      <AppForm
        initialValues={{
          title: "",
          description:"",
        }}
        onSubmit={handleSubmit}
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
            <SelectUserModal btnName="Add" btnCloseName="Cancel" isVisible={modalVisible1} onChangeText={(value) => handleSearch(value,"architect")} onPressAdd={(user) => onPressAdd(user,"architect")} onPressCancel={() => setModalVisible1(false)} data={allArchitects} />
            <SelectUserModal btnName="Add" btnCloseName="Cancel" isVisible={modalVisible2} onChangeText={(value) => handleSearch(value,"builder")} onPressAdd={(user) => onPressAdd(user,"builder")} onPressCancel={() => setModalVisible2(false)} data={allBuilders} />
            <SelectUserModal btnName="Add" btnCloseName="Cancel" isVisible={modalVisible3} onChangeText={(value) => handleSearch(value,"supplier")} onPressAdd={(user) => onPressAdd(user,"supplier")} onPressCancel={() => setModalVisible3(false)} data={allSuppliers} />
            {/* <AppButton name="Modal Visible" onPress={()=>setVisible(true)}/> */}
        </View>
        <View style={{flexDirection:"row", justifyContent:"space-between", marginHorizontal:10,marginVertical:10,}}>
          <View>
          <AppText style={styles.labelText}>Architect</AppText>
        <ProfessionalAvatar 
                key = {selectedArchitect?._id}
                name = {selectedArchitect?.name}
                title = {selectedArchitect?.jobtitle}
                style={profileAvatar}
                size={90}
                imageUri={selectedArchitect?.image}
                placeholdertext = {"add user"}
                onPress={()=>{setModalVisible1(true); dataForModal("architect");}}    
            />
          </View>
          <View>
             <AppText style={styles.labelText}>Builder</AppText>
              <ProfessionalAvatar 
                key = {selectedBuilder?._id}
                name = {selectedBuilder?.name}
                title = {selectedBuilder?.jobtitle}
                style={profileAvatar}
                size={90}
                imageUri={selectedBuilder?.image}
                placeholdertext = {"add user"}
                onPress={()=>{setModalVisible2(true); dataForModal("builder");}}    
                />
          </View>
          <View>
              <AppText style={styles.labelText}>Supplier</AppText>
              <ProfessionalAvatar 
                key = {selectedSupplier?._id}
                name = {selectedSupplier?.name}
                title = {selectedSupplier?.jobtitle}
                style={profileAvatar}
                size={90}
                imageUri={selectedSupplier?.image}
                placeholdertext = {"add user"}
                onPress={()=>{setModalVisible3(true); dataForModal("supplier");}}    
            />
          </View>
        </View>
      </AppForm>
    </ScrollView>
    </KeyboardAvoidingView>
  );
}
 
const profileAvatar = {
  // marginVertival:100,
  border:"none",
  marginVertical:15,
  justifyContent:"center",
  nameText : {
      fontSize : 14,
      marginTop : 5,
      color:"#495464",
      fontFamily: 'Poppins-Bold',
  },
  titleText : {
      fontSize : 12,
      color:"#495464",
      // width:Dimensions.get('window').width/3,
      fontFamily: 'Poppins-Medium',
  }
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
 

