import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import * as DocumentPicker from "expo-document-picker";
// import DocumentPicker from "react-native-document-picker";
 
const DocumentInput = ({ docUri, onChangeDoc }) => {
  const [name, setName] = useState("");
  // useEffect(() => {
  //   requestPermission();
  // }, []);
  // const requestPermission = async () => {
  //   const { granted } = await DocumentPicker.getDocumentAsync();
  //   if (!granted) alert("You need to enable permission to access");
  // };
 
  const selectDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });
      if (!result.cancelled) {
        onChangeDoc(result.uri);
        setName(result.name);
      }
    } catch (error) {
      console.log("Error Reading an image", error);
    }
  };
  const handleDocPress = () => {
    if (!docUri) selectDocument();
    else
      Alert.alert("Delete", "Are you sure you wnat to delete the document?", [
        {
          text: "Yes",
          onPress: () => onChangeDoc(null),
        },
        { text: "No" },
      ]);
  };
  return (
    <TouchableWithoutFeedback onPress={handleDocPress}>
      <View style={styles.container}>
        {!docUri && (
          <MaterialCommunityIcons color="white" name="file" size={40} />
        )}
        {
          docUri && (
            <MaterialCommunityIcons color="white" name="pdf-box" size={40} />
          )
          // <Image source={{ uri: docUri }} style={styles.image} />
        }
      </View>
    </TouchableWithoutFeedback>
  );
};
 
const styles = StyleSheet.create({
  container: {
    backgroundColor: "grey",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    height: 100,
    width: 100,
    // color: "white",
    overflow: "hidden",
  },
  image: {
    height: "100%",
    width: "100%",
  },
});
 
export default DocumentInput;
 
