import React, {useEffect, useState} from 'react';
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
  PermissionsAndroid,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

// import {Camera} from 'expo-camera';
// import Constants from "expo-constants";
// import { launchImageLibrary } from "react-native-image-picker";
const {width, height} = Dimensions.get('screen');

const CameraInput = ({imageUri, onChangeImage, style}) => {
  //   console.log("Pressed");
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  // const [type, setType] = useState(Camera.Constants.Type.back);

  const [busy, setbusy] = useState(true);
  useEffect(() => {
    requestCameraPermission();
    requestExternalWritePermission();
  }, []);
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        Alert.alert('Write permission err', err);
      }
      return false;
    } else return true;
  };
  // //   const [hasCameraPermission, setHasCameraPermission] = useState(null);
  // useEffect(() => {
  //   requestPermission();
  // }, []);
  // const requestPermission = async () => {
  //   const {granted} = await Camera.requestPermissionsAsync();
  //   if (!granted) alert('You need to enable permission to access');
  // };

  // const selectImage = async () => {
  //   try {
  //     const result = await camera.takePictureAsync(null);
  //     if (!result.cancelled) onChangeImage(result.uri);
  //   } catch (error) {
  //     console.log("Error Reading an image", error);
  //   }
  // };

  const takeImage = async () => {
    let options = {
      mediaType: 'photo',
      maxWidth: 500,
      maxHeight: 500,
      quality: 1,
      // videoQuality: 'low',
      // durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, (response) => {
        console.log('Response = ', response);

        if (response.didCancel) {
          // Alert.alert('User cancelled camera picker');
          return;
        } else if (response.errorCode === 'camera_unavailable') {
          Alert.alert('Camera not available on device');
          return;
        } else if (response.errorCode === 'permission') {
          Alert.alert('Permission not satisfied');
          return;
        } else if (response.errorCode === 'others') {
          Alert.alert(response.errorMessage);
          return;
        }
        console.log('base64 -> ', response.base64);
        console.log('uri -> ', response.uri);
        console.log('width -> ', response.width);
        console.log('height -> ', response.height);
        console.log('fileSize -> ', response.fileSize);
        console.log('type -> ', response.type);
        console.log('fileName -> ', response.fileName);
        //   setFilePath(response);
        onChangeImage(response.uri);
        console.log(response);
        setbusy(false);
      });
    }
  };

  const handlePress = () => {
    if (!imageUri) takeImage();
    else
      Alert.alert('Delete', 'Are you sure you wnat to delete the image?', [
        {
          text: 'Yes',
          onPress: () => onChangeImage(null),
        },
        {text: 'No'},
      ]);
  };
  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={{...styles.container, ...style}}>
        {!imageUri && (
          <MaterialCommunityIcons color="white" name="camera" size={40} />
        )}
        {imageUri && <Image source={{uri: imageUri}} style={styles.image} />}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'grey',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    // height: 100,
    width: width - 110,
    overflow: 'hidden',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  cameraContainer: {
    flex: 1,
    flexDirection: 'row',
    // alignItems: "center",
    // width: width - 110,
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
  },
});

export default CameraInput;
