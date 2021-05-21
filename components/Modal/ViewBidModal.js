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
import {Avatar, Divider} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';

//  Components Import
import AppButton from '../AppButton';
import AppText from '../AppText';

const {width, height} = Dimensions.get('screen');
export default function ViewBidModal({
  bidData,
  onPressClose,
  onPressAccept,
  onPressReject,
  onPressWithdraw,
  isVisible,
}) {
  console.log('Biddder in modal', bidData);
  const image = bidData?.bidderData?.image;
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
          {!bidData.calltoActionHideStatus ? (
            <>
              <AppButton name={'Accept'} onPress={onPressAccept} />
              <AppButton name={'Reject'} onPress={onPressReject} />
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
            </>
          ) : (
            <>
              <AppButton name="Rescind Bid" onPress={onPressWithdraw} />
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
            </>
          )}
        </View>
        <View style={{marginVertical: 10}}>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
            }}
          >
            <View style={{flexDirection: 'row'}}>
              <Avatar.Image
                size={40}
                source={{
                  uri: image,
                }}
              />
              <AppText
                style={{
                  marginHorizontal: 5,
                  marginVertical: 10,
                  fontSize: 16,
                  fontFamily: 'Poppins-Bold',
                  color: '#495464',
                  alignSelf: 'center',
                }}
              >
                {bidData?.bidderData?.name}
              </AppText>
            </View>
          </View>
          <View style={styles.infoConatiner}>
            <AppText style={styles.labelText}>Message</AppText>
            <AppText style={styles.text}>{bidData?.bidData?.message}</AppText>
          </View>
          <Divider style={styles.Divider} />
          <View style={styles.infoConatiner}>
            <AppText style={styles.labelText}>Bid Amount</AppText>
            <AppText style={styles.text}>
              RS {bidData?.bidData?.bidAmount}
            </AppText>
          </View>
          <Divider style={styles.Divider} />
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
  divider: {
    width: '100%',
    borderWidth: 0.5,
  },
  text: {
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
  },
  labelText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
  },
  infoConatiner: {
    marginVertical: 5,
  },
});

// const optionsStyles = {
//   optionsContainer: {
//     backgroundColor: '#495464',
//     padding: 5,
//   },
//   // optionsWrapper: {
//   //   backgroundColor:"#F4F4F2",
//   // },
//   optionWrapper: {
//     backgroundColor: '#495464',
//     margin: 5,
//   },
//   // optionTouchable: {
//   //   underlayColor: 'gold',
//   //   activeOpacity: 70,
//   // },
//   optionText: {
//     color: '#F4F4F2',
//   },
// };
