import React from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
} from 'react-native';
import AppButton from '../AppButton';
import AppText from '../AppText';
// import CameraInput from '../Image/CameraInput';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const {width, height} = Dimensions.get('screen');
const QuantityModal = ({
  btnName,
  btnCloseName,
  isVisible,
  imageUri,
  onChangeImage,
  onPressAdd,
  onPressClose,
}) => {
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
              //   width: '100%',
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
        {/* <View style={{marginVertical: 10}}>
          <AppText
            style={{
              marginVertical: 10,
              fontSize: 14,
              fontFamily: 'Poppins-Bold',
              color: '#495464',
            }}
          >
            Add an image to the project
          </AppText>
          <CameraInput
            imageUri={imageUri}
            onChangeImage={onChangeImage}
            style={{
              height: 400,
              width: width - 110,
            }}
          />
        </View> */}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    // height: "50%",
    margin: 20,
    // backgroundColor: 'transparent',
    // backgroundColor: '#e8e8e8',
    borderRadius: 20,
    padding: 35,
    // alignItems: "center",
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 5,
  },
});
export default QuantityModal;
