import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  Alert,
  Dimensions,
  Button,
  TouchableOpacity,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
 
import { Camera } from "expo-camera";
// import Constants from "expo-constants";
// import { launchImageLibrary } from "react-native-image-picker";
const { width, height } = Dimensions.get("screen");
 
const CameraInput = ({ imageUri, onChangeImage, style }) => {
//   console.log("Pressed");
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  //   const [hasCameraPermission, setHasCameraPermission] = useState(null);
  useEffect(() => {
    requestPermission();
  }, []);
  const requestPermission = async () => {
    const { granted } = await Camera.requestPermissionsAsync();
    if (!granted) alert("You need to enable permission to access");
  };

  const selectImage = async () => {
    try {
      const result = await camera.takePictureAsync(null);
      if (!result.cancelled) onChangeImage(result.uri);
    } catch (error) {
      console.log("Error Reading an image", error);
    }
  };
  const handlePress = () => {
    if (!imageUri) selectImage();
    else
      Alert.alert("Delete", "Are you sure you wnat to delete the image?", [
        {
          text: "Yes",
          onPress: () => onChangeImage(null),
        },
        { text: "No" },
      ]);
  };
  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={{ ...styles.container, ...style }}>
        <TouchableOpacity
          style={{ alignSelf: "flex-end" }}
          onPress={() => {
            setType(
              type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            );
          }}
        >
          <MaterialCommunityIcons name="camera-switch" size={30} />
        </TouchableOpacity>
        <View style={styles.cameraContainer}>
          <View>
            <Camera
              style={styles.fixedRatio}
              type={type}
              ratio={"1:1"}
              ref={(ref) => setCamera(ref)}
            />
          </View>
        </View>
        {!imageUri && (
          <MaterialCommunityIcons color="white" name="camera" size={40} />
        )}
        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
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
    // height: 100,
    width: width - 110,
    overflow: "hidden",
  },
  image: {
    height: "100%",
    width: "100%",
  },
  cameraContainer: {
    flex: 1,
    flexDirection: "row",
    // alignItems: "center",
    // width: width - 110,
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
  },
});
 
export default CameraInput;
 
