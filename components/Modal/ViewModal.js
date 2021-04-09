import React, {useState} from 'react'
import { View, Text, Modal,StyleSheet,Dimensions } from 'react-native'
import AppButton from '../AppButton';
import AppText from '../AppText';
import AppTextInput from '../AppTextInput';
import {Avatar } from "react-native-elements";
const { width, height } = Dimensions.get("screen");
export default function ViewModal({btnName,btnCloseName, onPressCancel,onPressDelete,isVisible, data}) {
     
    return (
        <Modal visible={isVisible} presentationStyle="formSheet">
        <View style={styles.modalView}>
        <View style={{ marginVertical: 10, flexDirection:"row" , justifyContent:"space-between" }}>
            <AppButton name={btnCloseName}onPress={onPressCancel} />
            <AppButton name={btnName} onPress={onPressDelete} />
          </View>
          <View style={{ marginVertical: 10 }}>
              <View style={{flexDirection:"row"}}> 
              <Avatar
               rounded
               source={{
                    uri: data.noterImage,
                 }}
                 containerStyle={{
                     marginHorizontal:5,
                    //  alignSelf:"center",
                 }}
                 />
            <AppText style={{ marginVertical: 10, fontSize:18, fontFamily:"Poppins-Bold", color:"#495464", alignSelf: 'center',}}>{data.noter}</AppText>
              </View>
          
            <AppText style={{ marginVertical: 10, fontSize:20, fontFamily:"Poppins-Regular", color:"#495464"}}>{data.note}</AppText>
          </View>
          
        </View>
      </Modal>
    )
}

const styles = StyleSheet.create({
    modalView: {
      // height: "50%",
      margin: 20,
      backgroundColor: "#e8e8e8",
      borderRadius: 20,
      padding: 35,
      // alignItems: "center",
      shadowColor: "#e5e5e5",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
  });