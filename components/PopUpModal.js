import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity,TouchableWithoutFeedback} from "react-native";

import { 
  // MenuProvider,
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger, } from 'react-native-popup-menu';
  import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

  
export default PopUpModal = ({options,onPress}) => (
  <View >
    <Menu>
      <MenuTrigger text={<MaterialIcons name="more-vert"  size={40}  color="#1b262c"/>} />
      <MenuOptions customStyles={optionsStyles}>
        <MenuOption onSelect={onPress} text={options[0]} />
             <MenuOption onSelect={() => Alert.alert('Delete',"Are you sure you want to delete this post?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false })}  text={options[1]} />
        {/* <MenuOption onSelect={() => alert(`Deleted`)} text='Delete' /> */}
      </MenuOptions>
    </Menu>
  </View>
);

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