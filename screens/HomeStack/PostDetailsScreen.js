// Native Imports
import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import {View, Text, Image, ScrollView, Dimensions,StyleSheet, Button,TouchableOpacity,Pressable} from 'react-native';
import {Paragraph,Avatar,} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import PopUpModal from '../../components/PopUpModal';
import Modal from 'react-native-modal';
// Components Imports
import AppButton from '../../components/AppButton';

// Styles Imports
import ScreenStyles from '../../styles/ScreenStyles'
import { useSelector } from 'react-redux';
import PopUpModal from '../../components/PopUpModal';
import { model } from 'mongoose';

// var { width, height } = Dimensions.get('window')

const PostDetailsScreen = ({navigation,route}) =>{
  const [idCheck, setCheckId] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  // const [isModalVisible, setModalVisible] = useState(false);
  const state = useSelector(state=>state);
  const  userPosts= state.entities.user.posts;
  const postsIds = userPosts.map(post=>post._id);
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

// const popup = (check)=>{
//   // <PopUpModal visible={true}/>
//   console.log("Pressed")
//   const toggleModal = () => {
//     setModalVisible(!isModalVisible);
//   };

//     return (
//       <View style={{flex: 1, backgroundColor:"red"}}>
//         <Button title="Show modal" onPress={toggleModal} />

//         <Modal isVisible={true}>
//           <View style={{flex: 1}}>
//             <Text>Hello!</Text>

//             <Button title="Hide modal" onPress={toggleModal} />
//           </View>
//         </Modal>
//       </View>
//     );
// }
// const ShowModal = ()=>{

// }
   return (
      <ScrollView style = {ScreenStyles.postsDetailScreen}>
         <View style={{flexDirection:"row", justifyContent:"space-between", marginVertical:10}}>
         <TouchableOpacity style={{alignSelf:"center"}} onPress={()=>navigation.goBack()}>
                  <MaterialCommunityIcons name="backspace" size={40} color="#495464"/>
                  </TouchableOpacity>
                  {!idCheck?(
                    <TouchableOpacity style={{alignSelf:"center"}}  onPress={() => setModalVisible(true)}>
                    <MaterialIcons name="more-vert"  size={40} color="#495464"/>
                      </TouchableOpacity>   
                  ):(
                    <View></View>
                  )}
              </View>
              {/* {
                !modalVisible? <View></View> :   <PopUpModal />

              } */}
         
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
export default PostDetailsScreen;