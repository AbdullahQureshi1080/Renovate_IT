// Native Imports
import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import {View, Text, Image, ScrollView, Dimensions,StyleSheet, Button,TouchableOpacity,Pressable,Alert} from 'react-native';
import {useDispatch} from 'react-redux';
import {Paragraph,Avatar,} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import PopUpModal from '../../components/PopUpModal';
import Modal from 'react-native-modal';
// Components Imports
import AppButton from '../../components/AppButton';
import { MenuProvider,Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger, } from 'react-native-popup-menu';

// Styles Imports
import ScreenStyles from '../../styles/ScreenStyles'
import { useSelector } from 'react-redux';
import PopUpModal from '../../components/PopUpModal';
import { model } from 'mongoose';
import useApi from '../../hooks/useApi';
import userAPI from "../../api/user";
import ErrorMessage from '../../components/AppForm/ErrorMessage';
import { deletePost } from '../../store/user';
import { deleteAppPost } from '../../store/data';
// var { width, height } = Dimensions.get('window')

const PostDetailsScreen = ({navigation,route}) =>{
  const dispatch = useDispatch();
  const [idCheck, setCheckId] = useState(true);
  const [deleteError, setDeleteError] = useState(null);
  const state = useSelector(state=>state);
  const userEmail = state.entities.auth.data.email;
  const  userPosts= state.entities.user.posts;
  const postsIds = userPosts.map(post=>post._id);
  const deleteApi = useApi(userAPI.deletePost)
  console.log(postsIds);
  const postId = route.params.item._id;
  console.log(postId);
  useEffect(()=>{
    for (var i =0; i<postsIds.length; i++){
      if(postId == postsIds[i]){
        setCheckId(false)
      }
    }
  }
  ,[])

  const handleUpdate=()=>{
  //  Update Post
  navigation.navigate("Add", { screen: "UpdatePost", params:route.params.item});
  }

  const handleDelete=()=>{
    // delete post
    const result = deleteApi.request(userEmail,postId);
    if(!result.ok) {
      console.log("Could Not Delete Post")
      setDeleteError("Error Deleting Post")
    }
    console.log("PostDeleted");
    dispatch(deletePost(postId));
    dispatch(deleteAppPost(postId));

      // let routeName = getFocusedRouteNameFromRoute(route);
      // console.log(routeName);
      // if (routeName == 'Profile' || routeName ==="User Profile") return true;
      // else return false;
      // (route),
    navigation.navigate("AppHome");
  }


   return (
     <MenuProvider>
      <ScrollView style = {ScreenStyles.postsDetailScreen}>
         <View style={{flexDirection:"row", justifyContent:"space-between", marginVertical:10}}>
         <TouchableOpacity style={{alignSelf:"center"}} onPress={()=>navigation.goBack()}>
                  <MaterialCommunityIcons name="backspace" size={40} color="#1b262c"/>
         </TouchableOpacity>
                  {!idCheck?(
                    // <TouchableOpacity style={{alignSelf:"center"}}  onPress={() => YourComponent()}>
                    // <MaterialIcons name="more-vert"  size={40} color="#495464"/>
                    //   </TouchableOpacity>   
                  // <MenuProvider>
                  // <View>
                  //   <PopUpModal options={['Update',"Delete"]} onPress={handlePopup()}/>
                  // </View>
                  // </MenuProvider>
                        <View >
                          <Menu>
                            <MenuTrigger text={<MaterialIcons name="more-vert"  size={40}  color="#1b262c"/>} />
                            <MenuOptions customStyles={optionsStyles}>
                              <MenuOption onSelect={handleUpdate} text={"Update"} />
                                  <MenuOption 
                                  onSelect={
                                    
                                    () => Alert.alert('Delete',"Are you sure you want to delete this post?",
                            [
                              {
                                text: "Cancel",
                                onPress: () => console.log("Cancel for post deletion"),
                                style: "cancel"
                              },
                              { text: "OK", onPress: handleDelete}
                            ],
                            { cancelable: false })}  
                            text={"Delete"} />
                            </MenuOptions>
                          </Menu>
        </View>

                  ):(
                    <View></View>
                  )}
              </View>
         <ErrorMessage error = {deleteError}/>
        <View style = {ScreenStyles.postsDetailScreen.viewBox}>
        <View style = {ScreenStyles.postsDetailScreen.AvatarBox}>
          <Avatar.Image source = {{uri:route.params.item.creatorImage}} style={{
            marginHorizontal:3
          }}/>
          <Text style = {ScreenStyles.postsDetailScreen.AvatarBox.nameText}>{route.params.item.creator}</Text>
        </View>
        <View style={{alignSelf:"center",}}>
        {idCheck?(
                   <AppButton name="Message"  onPress={()=>console.log("Message Button")}/>
                  ):(
                    <View></View>
                  )}
        {/* <AppButton name="Message"  onPress={()=>console.log("Message Button")}/> */}
        </View>
        </View>

        <View style={{
          marginVertical:15,}}>
          <Text style = {ScreenStyles.postsDetailScreen.viewBox.titleText}>{route.params.item.title}</Text>
          <Paragraph style={ScreenStyles.postsDetailScreen.contentText}>
          {route.params.item.description}
          </Paragraph>
          <View style = {{display:'flex', flexDirection:"row", justifyContent:"space-between"}}>
          <Text style = {ScreenStyles.postsDetailScreen.viewBox.titleText}>Budget</Text>
          <Text style = {ScreenStyles.postsDetailScreen.viewBox.titleText}>RS {route.params.item.budget} </Text>
          </View>   
        </View>

          <Text style = {ScreenStyles.postsDetailScreen.viewBox.titleText}>Attachments</Text>
        <View style={{flexDirection:"row"}}>
          {route.params.item.images.concat(route.params.item.documents).map(image=>
            <View style={styles.container}>
            <Image source = {{uri:image}} style={styles.image}/>
           </View>
          )}
        </View>
      </ScrollView>
      </MenuProvider>
    );
   }

   const styles = StyleSheet.create({
    container: {
      backgroundColor: "grey",
      borderRadius: 15,
      display:"flex",
      flexDirection:"row",
      alignItems: "center",
      justifyContent: "center",
      height: 100,
      width: 100,
      overflow: "hidden",
      marginHorizontal:5,
    },
    image: {
      height: "100%",
      width: "100%",
    },
  });

  const optionsStyles = {
    optionsContainer: {
      backgroundColor:"#495464", 
      padding: 5,
    },
    // optionsWrapper: {
    //   backgroundColor:"#F4F4F2",
    // },
    optionWrapper: {
      backgroundColor:"#495464", 
      margin: 5,
    },
    // optionTouchable: {
    //   underlayColor: 'gold',
    //   activeOpacity: 70,
    // },
    optionText: {
      color : "#F4F4F2",
    },
  };
export default PostDetailsScreen;