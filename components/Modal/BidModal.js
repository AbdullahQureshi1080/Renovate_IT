//  Native Imports
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Linking,
  Modal,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Avatar} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';

//  Components Import
import AppButton from '../AppButton';
import AppText from '../AppText';

const {width, height} = Dimensions.get('screen');
export default function BidModal({
  bidData,
  onPressClose,
  onPressAccept,
  onPressReject,
  isVisible,
}) {
  //   const allusers = useSelector((state) => state.entities.data.allusers);
  //   const bidder = allusers.filter((user) => {
  //     return user._id == bidData.bidderId;
  //   });
  console.log('Biddder in modal', bidData);
  //   if (bidder.length < 0) {
  //     return <AppText>Loading</AppText>;
  //   }
  return (
    <Modal visible={isVisible} presentationStyle="formSheet">
      <View style={styles.modalView}>
        <View
          style={{
            marginVertical: 10,
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}
        >
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignSelf: 'flex-end',
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
        </View>
        <View style={{marginVertical: 10}}>
          <View style={{flexDirection: 'row'}}>
            {/* <Avatar
              rounded
              source={{
                uri: bidData?.bidderData.email,
              }}
              containerStyle={{
                marginHorizontal: 5,
                //  alignSelf:"center",
              }}
            /> */}
            <AppText
              style={{
                marginVertical: 10,
                fontSize: 18,
                fontFamily: 'Poppins-Bold',
                color: '#495464',
                alignSelf: 'center',
              }}
            >
              {bidData?.bidderData?.name}
            </AppText>
          </View>
          <AppText>{bidData?.bidData?.message}</AppText>
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
    shadowColor: '#e5e5e5',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  container: {
    backgroundColor: 'grey',
    borderRadius: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    width: 100,
    overflow: 'hidden',
    marginHorizontal: 5,
  },
  image: {
    height: '100%',
    width: '100%',
  },
});

const optionsStyles = {
  optionsContainer: {
    backgroundColor: '#495464',
    padding: 5,
  },
  // optionsWrapper: {
  //   backgroundColor:"#F4F4F2",
  // },
  optionWrapper: {
    backgroundColor: '#495464',
    margin: 5,
  },
  // optionTouchable: {
  //   underlayColor: 'gold',
  //   activeOpacity: 70,
  // },
  optionText: {
    color: '#F4F4F2',
  },
};
