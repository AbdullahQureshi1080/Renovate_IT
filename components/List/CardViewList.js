import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
// import  firebase from "firebase";
import  firebase from "firebase";
require("firebase/firestore");
// import { db } from "../../config/firebase";

const CardViewList = ({ id, chatName, enterChat, }) => {
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    const unsubscribe =firebase.firestore()
      .collection("chats")
      .doc(id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setChatMessages(snapshot.docs.map((doc) => doc.data()))
      );
    return unsubscribe; 
  }, []);

  return (
    <ListItem onPress={() => enterChat(id, chatName)} key={id} bottomDivider containerStyle={{backgroundColor:"#e8e8e8"}}>
      <Avatar
        rounded
        source={{
          uri: chatMessages?.[0]?.photoURL || "https://i.pravatar.cc/300",
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "800" }}>
          {chatName}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          {chatMessages?.[0]?.displayName}:{chatMessages?.[0]?.message}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CardViewList;

const styles = StyleSheet.create({});