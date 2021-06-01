import React, {useState} from 'react';
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
import AppButton from '../AppButton';
import AppText from '../AppText';
// import AppTextInput from '../AppTextInput';
import GallaryModal from '../Modal/GallaryModal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {Avatar} from 'react-native-elements';
import ProfessionalAvatar from '../ProfessionalAvatar';
import {ScrollView} from 'react-native';
import {FlatList} from 'react-native';
const {width, height} = Dimensions.get('screen');
export default function FirmDetailsModal({
  btnName,
  delHide,
  deleteIcon,
  btnCloseName,
  onPressCancel,
  onPressDelete,
  onPressUpdate,
  isVisible,
  data,
}) {
  console.log('firm Mebers', data.members.length);

  return (
    <Modal visible={isVisible} presentationStyle="formSheet">
      <ScrollView style={styles.modalView}>
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
          {delHide ? (
            <>
              <AppButton name={'update'} onPress={onPressUpdate} />
              <AppButton name={btnName} onPress={onPressDelete} />
            </>
          ) : (
            <View />
          )}
        </View>
        <View style={{marginVertical: 10}}>
          <AppText
            style={{
              marginVertical: 10,
              fontSize: 18,
              fontFamily: 'Poppins-Bold',
            }}
          >
            {data.title}
          </AppText>
          <AppText
            style={{
              marginVertical: 10,
              fontSize: 20,
              fontFamily: 'Poppins-Regular',
            }}
          >
            {data.description}
          </AppText>
          <AppText
            style={{
              marginVertical: 10,
              fontSize: 15,
              fontFamily: 'Poppins-Bold',
            }}
          >
            Firm Creator
          </AppText>
          <View style={{flexDirection: 'row'}}>
            <Avatar
              rounded
              size={80}
              source={{
                uri: data.creatorImage,
              }}
              containerStyle={{
                marginHorizontal: 5,
                //  alignSelf:"center",
              }}
            />
            <AppText
              style={{
                alignSelf: 'center',
                fontSize: 14,
                fontFamily: 'Poppins-Bold',
              }}
            >
              {data.creator}
            </AppText>
          </View>
          <AppText
            style={{
              marginVertical: 10,
              fontSize: 15,
              fontFamily: 'Poppins-Bold',
            }}
          >
            Members
          </AppText>
          <FlatList
            data={data.members}
            numColumns={3}
            keyExtractor={(item) => item._id}
            renderItem={({item}) => (
              <View
                style={{
                  marginHorizontal: 5,
                }}
              >
                <ProfessionalAvatar
                  key={item?._id}
                  name={item?.name}
                  title={item?.jobtitle}
                  style={profileAvatar}
                  size={65}
                  imageUri={item?.image}
                  placeholdertext={'add user'}
                />
              </View>
            )}
          />
        </View>
      </ScrollView>
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

const profileAvatar = {
  // marginVertival:100,
  border: 'none',
  marginVertical: 15,
  justifyContent: 'center',
  nameText: {
    fontSize: 14,
    marginTop: 5,
    color: '#495464',
    fontFamily: 'Poppins-Bold',
  },
  titleText: {
    fontSize: 12,
    color: '#495464',
    width: width / 5,
    fontFamily: 'Poppins-Medium',
  },
};
