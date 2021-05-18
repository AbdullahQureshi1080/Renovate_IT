import React, {useState} from 'react';
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
import AppText from '../AppText';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const {width, height} = Dimensions.get('screen');

const QuantityModal = ({
  isVisible,
  onPressClose,
  item,
  counter,
  onPlusCounter,
  onMinusCounter,
  onChangePrice,
  total,
}) => {

  const StepperButton = ({name, onPress}) => {
    return (
      <TouchableOpacity onPress={onPress}>
        <AntDesign name={name} size={30} color={'#1B262C'} />
      </TouchableOpacity>
    );
  };

  const priceHandler = (type) => {
    console.log(counter);
    if (type == 'plus') {
      const price = (counter + 1) * parseInt(item.productPrice);
      onChangePrice(price);
    } else if (type == 'minus') {
      if (total === parseInt(item.productPrice))
        return Alert.alert('Minimun one product quantity');
      const price = total - parseInt(item.productPrice);
      onChangePrice(price);
    }
  };
  const plusHandler = () => {
    onPlusCounter(counter + 1);
    priceHandler('plus');
  };
  const minusHandler = () => {
    if (counter === 1) return Alert.alert('Minimun one product quantity');
    onMinusCounter(counter - 1);
    priceHandler('minus');
  };
  return (
    <Modal visible={isVisible} transparent={true} animationType="fade">
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
          <AppText style={styles.titleText}>Quantity</AppText>
          <View style={styles.stepperButtonContainer}>
            <StepperButton name={'pluscircle'} onPress={plusHandler} />
            <AppText style={styles.counterText}>{counter}</AppText>
            <StepperButton name={'minuscircle'} onPress={minusHandler} />
          </View>
          <View style={styles.headContainer}>
            <AppText style={styles.titleText}>Quantity</AppText>
            <AppText style={styles.titleText}>x{counter}</AppText>
          </View>
          <View style={styles.headContainer}>
            <AppText style={styles.titleText}>Price</AppText>
            <AppText style={styles.titleText}>{total} RS</AppText>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    margin: 15,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 35,
  },
  stepperButtonContainer: {
    width: '80%',
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginVertical: 10,
  },
  headContainer: {
    marginTop: 5,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  titleText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    marginVertical: 5,
  },
});
export default QuantityModal;
