import React, {useState} from 'react'
import { View, Text, Modal,StyleSheet,Dimensions } from 'react-native'
import AppButton from '../AppButton';
import AppText from '../AppText';
import AppTextInput from '../AppTextInput';
import ImageInputList from '../Image/ImageInputList';
import DocumentInputList from '../Document/DocumentInputList';
const { width, height } = Dimensions.get("screen");
export default function NoteModal(
  {
    onChangeText,
    btnName, 
    btnCloseName, 
    isVisible,
    onPressAdd, 
    onPressCancel,
    titleMessage,
    images,
    documents,
    handleAddImage,
    handleRemoveImage,
    handleAddDocument,
    handleRemoveDocument,
    addStatus,
  }) {
    return (
        <Modal visible={isVisible} presentationStyle="formSheet">
        <View style={styles.modalView}>
        <View style={{ marginVertical: 10, flexDirection:"row" , justifyContent:"space-between" }}>
            <AppButton name={btnCloseName}onPress={onPressCancel} />
            <AppButton name={btnName} onPress={onPressAdd} disabled={addStatus} />
          </View>
          <View style={{ marginVertical: 10 }}>
            <AppText style={{ marginVertical: 10, fontSize:14, fontFamily:"Poppins-Bold", color:"#495464"}}>{titleMessage}</AppText>
            <AppTextInput
              placeholder="text comes here ..."
              onChangeText={onChangeText}
              multiline={true}
              numberOfLines={10}
              underlineColor="#495464"
              textColor="#495464"
              // value={text==""?"":value}
            />
             {/* <AppText style={{ marginVertical: 10, fontSize:14, fontFamily:"Poppins-Bold", color:"#495464"}}>Uploads</AppText> */}
             <AppText style={{ marginVertical: 10, fontSize:14, fontFamily:"Poppins-Bold", color:"#495464"}}>Images</AppText>
            <ImageInputList
             imageUris={images}
             onAddImage={handleAddImage}
             onRemoveImage={handleRemoveImage}
             />
                <AppText style={{ marginVertical: 10, fontSize:14, fontFamily:"Poppins-Bold", color:"#495464"}}>Documents</AppText>
             <DocumentInputList
             docUris={documents}
             onAddDoc={handleAddDocument}
             onRemoveDoc={handleRemoveDocument}
      />
          </View>
          
        </View>
      </Modal>
    )
}

const styles = StyleSheet.create({
    modalView: {
    //   height: "100%",
      margin: 20,
      backgroundColor: "#e8e8e8",
      borderRadius: 20,
      padding: 35,
      // alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
  });