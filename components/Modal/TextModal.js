import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AppButton from '../AppButton';
import AppText from '../AppText';
import AppTextInput from '../AppTextInput';

const {width, height} = Dimensions.get('screen');
export default function TextModal({
  onChangeText,
  btnName,
  btnCloseName,
  isVisible,
  onPressAdd,
  onPressCancel,
  titleMessage,
}) {
  return (
    <Modal visible={isVisible} presentationStyle="formSheet">
      <View style={styles.modalView}>
        <View
          style={{
            marginVertical: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignSelf: 'flex-end',
            }}
            onPress={onPressCancel}
          >
            <MaterialCommunityIcons
              name="close-circle"
              size={40}
              color="#1b262c"
              style={{alignSelf: 'center'}}
            />
          </TouchableOpacity>
          <AppButton name={btnName} onPress={onPressAdd} />
        </View>
        <View style={{marginVertical: 10}}>
          <AppText
            style={{
              marginVertical: 10,
              fontSize: 14,
              fontFamily: 'Poppins-Bold',
              color: '#495464',
            }}
          >
            {titleMessage}
          </AppText>
          <AppTextInput
            placeholder="text comes here ..."
            onChangeText={onChangeText}
            multiline={true}
            numberOfLines={10}
            underlineColor="#495464"
            textColor="#495464"
            // value={text==""?"":value}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalView: {
    // height: "50%",
    margin: 20,
    backgroundColor: '#e8e8e8',
    borderRadius: 20,
    padding: 35,
    // alignItems: "center",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
