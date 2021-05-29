import React from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import AppButton from '../AppButton';
import AppText from '../AppText';
import ImageInput from '../Image/ImageInput';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SavedItemList from '../List/SavedItemList';

const {width, height} = Dimensions.get('screen');
export default function SavedItemsModal({
  btnName,
  btnCloseName,
  isVisible,
  imageUri,
  onChangeImage,
  savedItems,
  refresh,
  refreshSavedItems,
  onPressAdd,
  onPressCancel,
}) {
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
          <AppButton name={btnName} onPress={onPressAdd} />
        </View>
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
        <SavedItemList
          data={savedItems}
          refresh={refresh}
          refreshSavedItems={refreshSavedItems}
          style={styles.list}
          imageStyles={styles.image}
          onPressSelect={(item) => onChangeImage(item)}
          //   onPressDownload={(item) => onPressDownload(item)}
          //   onPressShare={(item) => onPressShare(item)}
        />
        {/* <View style={{marginVertical: 10}}>
          <ImageInput
            imageUri={imageUri}
            onChangeImage={onChangeImage}
            style={{
              height: 400,
              width: width - 110,
            }}
          />
        </View> */}
      </ScrollView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalView: {
    // height: '50%',
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
  list: {
    marginTop: 10,
    marginRight: 0,
    marginHorizontal: 0,
    marginVertical: 20,
    // width: width,
    paddingHorizontal: 0,
    paddingVertical: 0,
    backgroundColor: '#ffffff',
    borderRadius: 5,
  },
  image: {
    width: width / 1.15,
    height: height / 4,
    borderRadius: 5,
  },
});
