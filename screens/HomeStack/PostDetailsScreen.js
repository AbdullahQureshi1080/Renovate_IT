// Native Imports
import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import {View, Linking,Text, Image, ScrollView, Dimensions,StyleSheet, Button,TouchableOpacity,Pressable,Alert, Touchable} from 'react-native';
import {useDispatch} from 'react-redux';
import {Paragraph,Avatar,} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import PopUpModal from '../../components/PopUpModal';
// import Modal from 'react-native-modal';
// Components Imports
import AppButton from '../../components/AppButton';
import { MenuProvider,Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger, } from 'react-native-popup-menu';
import GallaryModal from "../../components/Modal/GallaryModal";
// Styles Imports
import ScreenStyles from '../../styles/ScreenStyles'
import { useSelector } from 'react-redux';
import PopUpModal from '../../components/PopUpModal';
// import { model } from 'mongoose';
import useApi from '../../hooks/useApi';
import userAPI from "../../api/user";
import ErrorMessage from '../../components/AppForm/ErrorMessage';
import { deletePost } from '../../store/user';
import { deleteAppPost } from '../../store/data';
// var { width, height } = Dimensions.get('window')

// import Pdf from 'react-native-pdf';


const PostDetailsScreen = ({navigation,route}) =>{
  const dispatch = useDispatch();
  const [idCheck, setCheckId] = useState(true);
  const [deleteError, setDeleteError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const state = useSelector(state=>state);
  const userEmail = state.entities.auth.data.email;
  const  userPosts= state.entities.user.posts;
  // const postsIds = userPosts.map(post=>post._id);
  const deleteApi = useApi(userAPI.deletePost)
  const postId = route.params.item._id;

  const userPostsIdObjs = state.entities.user.postIds;
  // const userProjectsIdObjs = state.entities.user.projectIds;
 
  const  userPostIds = userPostsIdObjs.map(({ id }) => id);
  // const  userProjectIds = userProjectsIdObjs.map(({ id }) => id);

  useEffect(()=>{
    console.log("Item Params", route.params.item)
    console.log(userPostIds);
    console.log(postId);
    for (var i =0; i<userPostIds.length; i++){
      if(postId == userPostIds[i]){
        setCheckId(false)
      }
    }
    // console.log(route.params.item.images)
  }
  ,[])

  const handleUpdate=()=>{
  //  Update Post
  navigation.navigate("Add", { screen: "UpdatePost", params:route.params.item});
  }

  const  loadInBrowser = (url) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  }

  const handleDelete=()=>{
    // delete post
    const result = deleteApi.request(userEmail,postId);
    if(!result.ok) {
      console.log("Could Not Delete Post")
      setDeleteError("Error Deleting Post")
    }
    console.log("PostDeleted");
      navigation.reset({
        index: 0,
        routes: [{name: 'AppHome'}],
      });
  }


   return (
     <MenuProvider>
      <ScrollView style = {ScreenStyles.postsDetailScreen}>
         <View style={{flexDirection:"row", justifyContent:"space-between", marginVertical:10}}>
         <TouchableOpacity style={{alignSelf:"center"}} onPress={()=>navigation.goBack()}>
                  <MaterialCommunityIcons name="backspace" size={40} color="#1b262c"/>
         </TouchableOpacity>
                  {!idCheck?(
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
        <GallaryModal isVisible={isVisible} images={route.params.item.images} onPressClose={()=>setIsVisible(false)}/>
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
        <View style={{flexDirection:"row", marginVertical:10,}}>
          {route.params.item.images.map(image=>
            // <View style={styles.container}>
              <TouchableOpacity style={styles.container} onPress={()=>setIsVisible(true)}>
                 <Image source = {{uri:image}} style={styles.image} />
              </TouchableOpacity>
          //  </View>
          )}
        </View>
        <View style={{flexDirection:"row"}}>
          {route.params.item.documents.map(image=>
            // <View style={styles.container}>
              <TouchableOpacity style={styles.container} onPress={()=>loadInBrowser(image)}>
                 <MaterialCommunityIcons color="white" name="pdf-box" size={40} />
              </TouchableOpacity>
          //  </View>
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