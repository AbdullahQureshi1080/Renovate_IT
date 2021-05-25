import React, {useState, useCallback, useEffect, useRef} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Modal,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Image,
  Dimensions,
} from 'react-native';
import DraggableFlatList, {
  RenderItemParams,
} from 'react-native-draggable-flatlist';
// import { ScrollView } from "react-native-gesture-handler";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {v4 as uuidv4} from 'uuid';

import AppButton from '../../components/AppButton';
import AppText from '../../components/AppText';
// import CameraInput from "../../components/Image/CameraInput";
// import ImageInput from "../../components/Image/ImageInput";
import ImageModal from '../../components/Modal/ImageModal';
import TextModal from '../../components/Modal/TextModal';
import CameraModal from '../../components/Modal/CameraModal';
import AddSvg from '../../assets/svg/addToProject.svg';

const {width, height} = Dimensions.get('screen');
type nodeItem = {
  key: string,
  value: string,
  type: string,
  //   styles:string,
};

function CreateProjectScreen({navigation, route}) {
  const flatlist = useRef();
  const [dataNode, setDataNodes] = useState([]);
  // useEffect(() => {
  //   console.log(route.params)
  //   // console.log(dataNode);
  //   // if(route.params == null) return;
  //   // else{
  //     // setDataNodes(route.params.data.data)
  //   // }
  // }, []);
  useEffect(() => {
    console.log(dataNode);
    // setDataNodes(route.params.data.data)
  }, [dataNode]);
  // const [id, setId] = useState(0);
  const [imageUri, setImageUri] = useState(null);
  const [textModalVisible, setTextModalVisible] = useState(false);
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [cameraModalVisible, setCameraModalVisible] = useState(false);
  const [text, setText] = useState('');
  //   console.log(data);

  const renderItem = useCallback(
    ({item, index, drag, isActive}: RenderItemParams<nodeItem>) => {
      return (
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: isActive ? '#e8e8e8' : item.backgroundColor,
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 5,
          }}
          onLongPress={drag}
        >
          <View>
            {item.type == 'image' ? (
              <View style={{width: width - 15}}>
                <View style={{alignSelf: 'flex-end'}}>
                  <TouchableOpacity onPress={() => handleRemove(item)}>
                    <MaterialCommunityIcons
                      name="delete"
                      size={25}
                      color="#1b262c"
                    />
                  </TouchableOpacity>
                </View>
                <Image
                  source={{uri: item.value}}
                  style={{width: width - 15, height: height / 2}}
                />
              </View>
            ) : (
              <View style={{width: width - 15}}>
                <View
                  style={{flexDirection: 'row', justifyContent: 'flex-end'}}
                >
                  {/* <TouchableOpacity onPress={() => handleUpdate(item.key)}>
                      <MaterialIcons name="edit" size={30} color="#1b262c" />
                    </TouchableOpacity> */}
                  <TouchableOpacity onPress={() => handleRemove(item)}>
                    <MaterialCommunityIcons
                      name="delete"
                      size={30}
                      color="#1b262c"
                    />
                  </TouchableOpacity>
                </View>

                <View style={{backgroundColor: '#e5e5e5'}}>
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
        </TouchableOpacity>
      );
    },
    [],
  );

  const handleText = (value) => {
    setText(value);
  };

  const handleRemove = (item) => {
    const key = item.key;
    console.log('All Items in array', dataNode);
    console.log('Data in Handle Remove - Key', key);
    // const allItems = dataNode;
    const filteredItems = dataNode.filter((item) => {
      return item.key !== key;
    });
    console.log('filtered items', filteredItems);
    setDataNodes(filteredItems);
  };

  // const handleUpdate= (data) => {
  //   const key = data;
  //   console.log("Data in Handle Update - Key", key);
  //   let allItems =dataNode;
  //   console.log("All Items in array", allItems);
  //   let filteredItems = allItems.filter((item) => item.key == key);
  //   console.log(filteredItems[0].value);
  //   setTextModalVisible(true)
  //   setText(filteredItems[0].value);

  //   // setDataNodes(filteredItems);
  // };

  const onPressAdd = (type) => {
    if ((text || imageUri) == null) {
      Alert.alert('No Content to Add');
      return;
    }
    // setId(id + 1);
    const newkey = uuidv4();
    console.log(newkey);
    if (type == 'text') {
      const textNode = text;
      const newNode = {
        key: newkey,
        value: textNode,
        type: 'text',
      };
      console.log(textNode);
      setDataNodes([...dataNode, newNode]);
      setTextModalVisible(false);
      setText('');
    } else if (type == 'image') {
      const imageNode = imageUri;
      const newNode = {
        key: newkey,
        value: imageNode,
        type: 'image',
      };
      console.log(imageNode);
      setDataNodes([...dataNode, newNode]);
      setImageModalVisible(false);
      setCameraModalVisible(false);
      setImageUri(null);
    }
    // console.log(dataNode);
  };

  const onNextScreen = () => {
    // if(route.params == null){
    console.log('New Data to Gallary');
    const gallaryImages = dataNode.filter((item) => item.type == 'image');
    const dataToScreen = {data: dataNode, gallaryImages};
    navigation.navigate('Gallery', {projectData: dataToScreen});
    // }
    // else{

    //   const newGallaryImages = dataNode.filter(item=>item.type == "image");
    //   const formData = {
    //     _id:route.params._id,
    //     title:route.params.title,
    //     description:route.params.description,
    //     creator:route.params.creator,
    //     creatorImage:route.params.creatorImage,
    //     data:dataNode,
    //   }
    //   const dataFormToScreen = {data:formData,gallaryImages:newGallaryImages}
    //   console.log(" Updated Data to Gallary", dataFormToScreen)
    //   navigation.navigate("Gallery",{projectData:dataFormToScreen})
    // }
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 10,
          marginVertical: 10,
        }}
      >
        <TouchableOpacity
          style={{alignSelf: 'center'}}
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons name="backspace" size={40} color="#1b262c" />
        </TouchableOpacity>
        <AppButton
          name="next"
          disabled={dataNode.length == 0}
          onPress={onNextScreen}
        />
      </View>
      <TextModal
        btnName="Add"
        btnCloseName="Cancel"
        isVisible={textModalVisible}
        onChangeText={(value) => handleText(value)}
        onPressAdd={() => onPressAdd('text')}
        onPressCancel={() => setTextModalVisible(false)}
        titleMessage={'Enter details about the project'}
      />
      <ImageModal
        btnName="Add"
        btnCloseName="Cancel"
        isVisible={imageModalVisible}
        imageUri={imageUri}
        onChangeImage={(imageUri) => setImageUri(imageUri)}
        onPressAdd={() => onPressAdd('image')}
        onPressCancel={() => setImageModalVisible(false)}
      />
      <CameraModal
        btnName="Add"
        btnCloseName="Cancel"
        isVisible={cameraModalVisible}
        imageUri={imageUri}
        onChangeImage={(imageUri) => setImageUri(imageUri)}
        onPressAdd={() => onPressAdd('image')}
        onPressCancel={() => setCameraModalVisible(false)}
      />
      {dataNode.length == 0 ? (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <View style={{alignSelf: 'center', opacity: 0.6}}>
            <AddSvg width={width / 2} height={height / 4.5} />
          </View>
          <AppText
            style={{
              fontSize: 16,
              fontFamily: 'Poppins-Medium',
              opacity: 0.6,
              alignSelf: 'center',
            }}
          >
            Add Items to your project
          </AppText>
        </View>
      ) : (
        <DraggableFlatList
          data={dataNode}
          renderItem={renderItem}
          // keyExtractor={(item, index) => `draggable-item-${item.key}`}
          keyExtractor={(item, index) => item.key}
          onDragEnd={({data}) => setDataNodes(data)}
        />
      )}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          //   marginHorizontal: 10,
          backgroundColor: 'rgba(232, 232, 232, 1)',
          //   margin:0,
          height: 70,
          paddingHorizontal: 15,
        }}
      >
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => setImageModalVisible(true)}
        >
          <MaterialCommunityIcons name="image" size={40} color={'#1b262c'} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => setCameraModalVisible(true)}
        >
          <MaterialCommunityIcons name="camera" size={40} color={'#1b262c'} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => setTextModalVisible(true)}
        >
          <MaterialCommunityIcons name="text" size={40} color={'#1b262c'} />
        </TouchableOpacity>
      </View>
    </View>
    // </ScrollView>
  );
}

// const styles = StyleSheet.create({
//   modalView: {
//     // height: "50%",
//     margin: 20,
//     backgroundColor: "#e8e8e8",
//     borderRadius: 20,
//     padding: 35,
//     // alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//   },
// });
export default CreateProjectScreen;
