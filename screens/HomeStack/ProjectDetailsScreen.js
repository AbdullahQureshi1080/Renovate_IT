// Native Imports
import 'react-native-gesture-handler';
import React,{ useEffect, useState,useCallback } from 'react';
import {View, Text, Image, ScrollView, Dimensions,StyleSheet,TouchableOpacity,FlatList, Alert} from 'react-native';
import {Paragraph,Button,Avatar,} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector,useDispatch} from 'react-redux';
// import React, { useEffect, useState } from 'react';


// import AppButton from '../../components/AppButton';
import { MenuProvider,Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger, } from 'react-native-popup-menu';


// Components Imports
// import AppTextInput from '../../components/AppTextInput';
import AppText from '../../components/AppText';
// import Entypo from 'react-native-vector-icons/Entypo';
// import { FloatingAction } from "react-native-floating-action";
// import ComponentsStyle from "../../styles/ComponentsStyle";
// import AppButton from '../../components/AppButton';

// Styles Imports
import ScreenStyles from '../../styles/ScreenStyles'
import useApi from '../../hooks/useApi';
import userAPI from "../../api/user";
import ErrorMessage from '../../components/AppForm/ErrorMessage';
// import { deleteProject } from '../../store/user';
// import { deleteAppProject} from '../../store/data';
import Comment from '../../api/comment';
import ActivityIndicator from '../../components/ActivityIndicator';
// import { FlatList } from 'react-native-gesture-handler';

var { width, height } = Dimensions.get('window')

const ProjectDetailsScreen = ({route,navigation}) =>{
  const dispatch = useDispatch();
  const [idCheck, setCheckId] = useState(true);
  const [deleteError, setDeleteError] = useState(null);
  // const [data, setData] = useState(null);
  const state = useSelector(state=>state);
  const userId = state.entities.auth.data._id;
  const userEmail = state.entities.auth.data.email;
  // const  userProjects= state.entities.user.projects;
  // const projectIds = userProjects.map(project=>project._id);

  // const userPostsIdObjs = state.entities.user.postIds;
  const userProjectsIdObjs = state.entities.user.projectIds;
 
  // const  userPostIds = userPostsIdObjs.map(({ id }) => id);
  const  userProjectIds = userProjectsIdObjs.map(({ id }) => id);
  // console.log("Project Ids",)
  const deleteApi = useApi(userAPI.deleteProject)
      const [text, setText] = useState("")

  console.log(userProjectIds);
  const projectId = route.params.item._id;
  console.log(projectId);
  useEffect(()=>{
    for (var i =0; i<userProjectIds.length; i++){
      if(projectId == userProjectIds[i]){
        setCheckId(false)
      }
    }
    console.log(route.params.item.data)
  }
  ,[])



  const handleUpdate=()=>{
    //  Update Project
    navigation.navigate("Add", { screen: "UpdateProject", params:route.params.item});
    }
  
    const handleDelete=()=>{
      // delete Project
      const result = deleteApi.request(userEmail,projectId);
      if(!result.ok) {
        console.log("Could Not Delete Project")
        setDeleteError("Error Deleting Project")
      }
      console.log("Project Deleted");
      navigation.reset({
        index: 0,
        routes: [{name: 'AppHome'}],
      });
    }



  const renderItem = useCallback(
    ({ item, index, drag, isActive }: RenderItemParams<nodeItem>) => {
      return (
          <View>
            {item.type == "image"? (
              <View style={{ marginHorizontal:5,marginVertical:5 }}>
                <Image
                  source={{uri:item.value}}
                  style={{ width: width - 15, height: height / 2 }}
                />
              </View>
            ) : (
                <View style={{marginHorizontal:5,marginVertical:5 }}>
                  <View >
                    <AppText
                      style={{
                        // fontWeight: "bold",
                        // color: "#495464",
                        fontSize: 16,
                      }}
                    >
                      {item.value}
                    </AppText>
                  </View>
                </View>
              )}
          </View>
      );
    },
    []
  );

  const handleText=(text)=>{
    setText(text);
  }
   return (
    <MenuProvider>
      <ActivityIndicator visible={deleteApi.loading} />
      <ScrollView style = {ScreenStyles.projectsDetailScreen} showsVerticalScrollIndicator={false}>
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
        <View style = {ScreenStyles.projectsDetailScreen.viewBox}>
        <Text style = {ScreenStyles.projectsDetailScreen.viewBox.titleText}>{route.params.item.title}</Text>
        {/* <AppButton name="Follow" onPress={()=>console.log("Follow Button")}/> */}
        </View>
        <View style = {ScreenStyles.projectsDetailScreen.AvatarBox}>
          <Avatar.Image source = {{uri:route.params.item.creatorImage}} style={{
            marginHorizontal:3
          }}/>
          <Text style = {ScreenStyles.projectsDetailScreen.AvatarBox.nameText}>{route.params.item.creator}</Text>
        </View>
        <View style={{
          marginVertical:15,
              borderBottomColor: '#1b262c', 
              borderBottomWidth: 1, 
              opacity:0.5,
              width: width - 20,}}>
        </View>
        <View>
          <FlatList
          data={route.params.item.data.data}
          keyExtractor={item=>item.key}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          />
        </View>
        <View style={{
          marginVertical:15,
              borderBottomColor: '#1b262c', 
              borderBottomWidth: 1, 
              opacity:0.5,
              width: width - 20,
              }}>
        </View>
        <View>
             <Text style = {ScreenStyles.projectsDetailScreen.viewBox.titleText}>{route.params.item.title}</Text>
             <View style = {ScreenStyles.projectsDetailScreen.infoBox}>
             {/* <Entypo name="thumbs-up" size={20} color="#1b262c"/> */}
            {/* <Text style={{...ScreenStyles.projectsDetailScreen.contentText},{alignSelf:"center",}} >{route.params.item.likes}</Text> */}
             </View>     
        </View> 
        <View style={{
          marginVertical:15,
              borderBottomColor: '#1b262c', 
              borderBottomWidth: 1, 
              opacity:0.5,
              width: width - 20,
              }}>
        </View>
       
        <View style = {ScreenStyles.projectsDetailScreen.commentBox}>
          <View 
          style = 
          {{
            alignSelf:"center"
          }}
          >
            <Comment onChangeText={(text)=>handleText(text)} projectId={projectId} userId={userId} value={text}/>
          {/* <AppTextInput  style={ComponentsStyle.inputStyle}  label="Comment on post" selectionColor="#1b262c" underlineColor="#1b262c"  textColor="#1b262c"/>
          <Button icon = "comment-arrow-right-outline" style={{backgroundColor:"#495464", width:Dimensions.get('window').width/3, alignSelf:"center"}} color = "#F4F4F2">Comment</Button> */}
          </View>
        </View>
        <View>
       
        </View>
        {/* <FloatingAction
            distanceToEdge = {vertical=15}
            floatingIcon={<Entypo name="thumbs-up" size={30} color="#F4F4F2" style={{alignSelf:"center",}}/>}
            onPressMain ={()=> console.log("Yo")}
            color = "#495464"
            overlayColor = "none"
        /> */}
      </ScrollView>
      </MenuProvider>
    );
   }

   const styles = StyleSheet.create({
    actionButtonIcon: {
      fontSize: 20,
      height: 22,
      color: 'white',
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
export default ProjectDetailsScreen;