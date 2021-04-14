import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useSelector } from "react-redux";
// import  firebase from "firebase";
// import  firebase from "firebase";
// require("firebase/firestore");
// import { db } from "../../config/firebase";

const NoteViewList = ({ id,noterId, noterName, note, statusLike , creator, handleDelete, noterImage, onPress}) => {
//   const [chatMessages, setChatMessages] = useState([]);
const [idCheck, setCheckId] = useState(true);
const state = useSelector(state=>state)
const userId = state.entities.auth.data._id; 
const email = state.entities.auth.data.email;
const noteId = id; 
const name  = `${state.entities.user.profile.firstname} ${state.entities.user.profile.lastname}`; 
useEffect(()=>{
  console.log("name",name);
  if(userId == noterId || name == creator ){ 
        setCheckId(false)
      }
  }
,[])

  return (
    <ListItem 
    onPress={onPress} 
    key={id} 
    bottomDivider
    containerStyle={
        styles.container
    }
    >
       {!idCheck?(
                        <View 
                        style={{ 
                          position: "absolute",
                          top: 10,
                          right: 5,}}
                          >
                            <TouchableOpacity onPress={(noteId,email,firmId)=>handleDelete(noteId,email,firmId)}>
                            <MaterialIcons name="delete" size={26} color="#1b262c" />
                          </TouchableOpacity>
                          </View>

                  ):(
                    <View></View>
                  )}
    
      <ListItem.Content>
        <View style={{flexDirection:"row"}}>
      <Avatar
        rounded
        source={{
          uri: noterImage,
        }}
      />
        <ListItem.Title style={{ fontWeight: "800" }} style={{alignSelf:"center", marginHorizontal:5, fontFamily:"Poppins-Regular"}}>
          {noterName}
        </ListItem.Title>
        </View>
        <ListItem.Subtitle ellipsizeMode="tail" numberOfLines={2}style={{fontSize:16, fontFamily:"Poppins-Regular"}}>
         {note}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default NoteViewList;

const styles = StyleSheet.create({
    container:{
        backgroundColor:"#e8e8e8",
        height:100,
        borderRadius:10,
        marginVertical:10,
    }
});