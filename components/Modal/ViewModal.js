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
import AppButton from '../AppButton';
import AppText from '../AppText';
// import AppTextInput from '../AppTextInput';
import GallaryModal from '../Modal/GallaryModal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {
  MenuProvider,
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

import {Avatar} from 'react-native-elements';
import {useSelector} from 'react-redux';
const {width, height} = Dimensions.get('screen');
export default function ViewModal({
  id,
  btnName,
  btnCloseName,
  onPressCancel,
  onPressDelete,
  onPressUpdate,
  isVisible,
  creator,
  data,
  updateName,
}) {
  const [isGallaryVisible, setIsGallaryVisible] = useState(false);
  console.log(data);
  const loadInBrowser = (url) => {
    Linking.openURL(url).catch((err) =>
      console.error("Couldn't load page", err),
    );
  };

  const [idCheck, setCheckId] = useState(true);
  const state = useSelector((state) => state);
  const userId = state.entities.auth.data._id;
  const name = `${state.entities.auth.data.firstname} ${state.entities.auth.data.lastname}`;
  useEffect(() => {
    console.log('name', name);
    if (userId == data.noterId || name == creator) {
      setCheckId(false);
    }
  }, []);
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
          {/* <AppButton name={btnName} onPress={onPressDelete} /> */}
          {!idCheck ? (
            <View
              style={{
                marginVertical: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <AppButton
                name={btnName}
                onPress={onPressDelete}
                style={{marginHorizontal: 5}}
              />
              <AppButton name={updateName} onPress={onPressUpdate} />
            </View>
          ) : (
            <View></View>
          )}
        </View>
        <View style={{marginVertical: 10}}>
          <View style={{flexDirection: 'row'}}>
            <Avatar
              rounded
              source={{
                uri: data.noterImage,
              }}
              containerStyle={{
                marginHorizontal: 5,
                //  alignSelf:"center",
              }}
            />
            <AppText
              style={{
                marginVertical: 10,
                fontSize: 18,
                fontFamily: 'Poppins-Bold',
                color: '#495464',
                alignSelf: 'center',
              }}
            >
              {data.noter}
            </AppText>
          </View>
          <AppText
            style={{
              marginVertical: 10,
              fontSize: 18,
              fontFamily: 'Poppins-Regular',
              color: '#495464',
            }}
          >
            {data.note}
          </AppText>
          <GallaryModal
            isVisible={isGallaryVisible}
            images={data.images}
            onPressClose={() => setIsGallaryVisible(false)}
          />
          {/* <View style={{flexDirection:"row", marginVertical:10,}}> */}
          {!data.images && !data.documents ? (
            <View />
          ) : (
            <View>
              {data.images && data.documents ? (
                <View>
                  <AppText
                    style={{
                      marginVertical: 10,
                      fontSize: 14,
                      fontFamily: 'Poppins-Bold',
                      color: '#495464',
                    }}
                  >
                    Images
                  </AppText>
                  <View style={{flexDirection: 'row', marginVertical: 10}}>
                    {data?.images.map((image) => (
                      <TouchableOpacity
                        style={styles.container}
                        onPress={() => setIsGallaryVisible(true)}
                      >
                        <Image source={{uri: image}} style={styles.image} />
                      </TouchableOpacity>
                    ))}
                  </View>
                  <AppText
                    style={{
                      marginVertical: 10,
                      fontSize: 14,
                      fontFamily: 'Poppins-Bold',
                      color: '#495464',
                    }}
                  >
                    Documents
                  </AppText>
                  <View style={{flexDirection: 'row', marginVertical: 10}}>
                    {data?.documents.map((image) => (
                      <TouchableOpacity
                        style={styles.container}
                        onPress={() => loadInBrowser(image)}
                      >
                        <MaterialCommunityIcons
                          color="white"
                          name="pdf-box"
                          size={40}
                        />
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              ) : (
                <View>
                  {data.images && !data.documents ? (
                    <View style={{flexDirection: 'row'}}>
                      {data?.images.map((image) => (
                        <TouchableOpacity
                          style={styles.container}
                          onPress={() => setIsVisible(true)}
                        >
                          <Image source={{uri: image}} style={styles.image} />
                        </TouchableOpacity>
                      ))}
                    </View>
                  ) : (
                    <View style={{flexDirection: 'row'}}>
                      {data?.documents.map((image) => (
                        <TouchableOpacity
                          style={styles.container}
                          onPress={() => loadInBrowser(image)}
                        >
                          <MaterialCommunityIcons
                            color="white"
                            name="pdf-box"
                            size={40}
                          />
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>
              )}
            </View>
          )}
          {/* </View> */}
          {/* <View style={{flexDirection:"row"}}>
          {data?.documents.map(image=>
              <TouchableOpacity style={styles.container} onPress={()=>loadInBrowser(image)}>
                 <MaterialCommunityIcons color="white" name="pdf-box" size={40} />
              </TouchableOpacity>

          )}
        </View> */}
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
