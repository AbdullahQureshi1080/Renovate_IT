import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import AppButton from '../AppButton';
import AppText from '../AppText';
// import AppTextInput from '../AppTextInput';
// import ImageInputList from '../Image/ImageInputList';
// import DocumentInputList from '../Document/DocumentInputList';
import AppFormField from '../AppForm/AppFormField';
import AppForm from '../AppForm/AppForm';
const {width, height} = Dimensions.get('screen');

import * as Yup from 'yup';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SubmitButton from '../AppForm/SubmitButton';

const validationSchema = Yup.object().shape({
  message: Yup.string().required().min(1).label('Message'),
  amount: Yup.number().required().min(1).max(1000000).label('Amount'),
});

export default function NewBidModal({
  isVisible,
  onPressBid,
  onPressClose,
}) {
  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <Modal visible={isVisible} presentationStyle="formSheet">
        <ScrollView>
          <View style={styles.modalView}>
            <View
              style={{
                marginVertical: 10,
                justifyContent: 'space-between',
              }}
            >
              <AppForm
                initialValues={{
                  message: '',
                  amount: '',
                }}
                onSubmit={onPressBid}
                validationSchema={validationSchema}
              >
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
                    }}
                    onPress={onPressClose}
                  >
                    <MaterialCommunityIcons
                      name="close-circle"
                      size={40}
                      color="#1b262c"
                      style={{alignSelf: 'center'}}
                    />
                  </TouchableOpacity>
                  <View style={{alignSelf: 'center'}}>
                    <SubmitButton name="Bid"/>
                  </View>
                </View>
                <View style={{alignSelf: 'center'}}>
                  <AppText style={styles.titleText}>New Bid</AppText>
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
                    Message
                  </AppText>
                  <AppFormField
                    name="message"
                    placeholder="Message comes here ..."
                    multiline={true}
                    numberOfLines={10}
                    underlineColor="#495464"
                    textColor="#495464"
                  />
                  <AppText
                    style={{
                      marginVertical: 10,
                      fontSize: 14,
                      fontFamily: 'Poppins-Bold',
                      color: '#495464',
                    }}
                  >
                    Bid Amount in RS
                  </AppText>
                  <AppFormField
                    name="amount"
                    placeholder="Bid in  ..."
                    // onChangeText={onChangeAmount}
                    // multiline={true}
                    // numberOfLines={10}
                    underlineColor="#495464"
                    textColor="#495464"
                    keyboardType="numeric"
                    // value={text==""?"":value}
                  />
                </View>
              </AppForm>
            </View>
          </View>
        </ScrollView>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  modalView: {
    //   height: "100%",
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
  titleText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
  },
});
