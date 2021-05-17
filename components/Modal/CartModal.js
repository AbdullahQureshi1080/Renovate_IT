import React, {useEffect, useState} from 'react';
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
import {Avatar, Divider} from 'react-native-paper';
import AppButton from '../AppButton';
import AppText from '../AppText';
import QuantityModal from '../Modal/QuantityModal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {removeItem, updateItem} from '../../store/cart';

const {width, height} = Dimensions.get('screen');
export default function CartModal({
  btnName,
  btnCloseName,
  isVisible,
  imageUri,
  onChangeImage,
  onPressClose,
  counter,
  onPressCheckout,
}) {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const cart = useSelector((state) => state.entities.cart);
  //   const cartData = useState(cart);
  const [stepCounter, setStepCounter] = useState(1);
  // const [total, setTotal] = useState(parseInt(item.productPrice));

  const handleRemove = (item) => {
    console.log('Handle Remove Item');
    dispatch(removeItem(item._id));
  };

  const handleUpdate = () => {
    console.log('Handle Update Item');
    setVisible(true);
  };

  //   const StepperButton = ({name, onPress}) => {
  //     return (
  //       <TouchableOpacity onPress={onPress}>
  //         <AntDesign name={name} size={30} color={'#1B262C'} />
  //       </TouchableOpacity>
  //     );
  //   };

  //   const plusHandler = (item) => {
  //     let quantity = parseInt(item.quantity);
  //     console.log('Quantity from Cart', quantity);
  //     setStepCounter(quantity + 1);
  //     priceHandler('plus', item);
  //   };
  //   const minusHandler = (item) => {
  //     if (stepCounter === 1) return Alert.alert('Minimun one product quantity');
  //     let quantity = parseInt(item.quantity);
  //     setStepCounter(quantity - 1);
  //     priceHandler('minus', item);
  //   };

  //   const priceHandler = (type, item) => {
  //     const productPrice = parseInt(item.totalProductPrice);
  //     console.log(stepCounter);
  //     if (type == 'plus') {
  //       const price = (stepCounter + 1) * parseInt(item.productPrice);
  //       let data = {itemId: item._id, itemData: {price, quantity: stepCounter}};
  //       dispatch(updateItem(data));
  //       //   setStepCounter(item.quantity);
  //     } else if (type == 'minus') {
  //       if (productPrice === parseInt(item.productPrice))
  //         return Alert.alert('Minimun one product quantity');
  //       const price = productPrice - parseInt(item.productPrice);
  //       let data = {
  //         itemId: item._id,
  //         itemData: {price, quantity: stepCounter},
  //       };
  //       dispatch(updateItem(data));
  //       //   setStepCounter(item.quantity);
  //     }
  //   };

  // useEffect(() => {
  //   handleCounter(item);
  // }, []);

  //   const counterHandler
  //   const handleCounter = (item) => {
  //     setStepCounter(item.quantity);
  //   };

  return (
    <Modal visible={isVisible} presentationStyle="formSheet">
      <View style={styles.modalView}>
        <View
          style={{
            marginVertical: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            // backgroundColor: 'red',
            alignContent: 'center',
          }}
        >
          <AppButton
            name="Checkout"
            onPress={onPressCheckout}
            disabled={!counter}
          />
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
        <View style={styles.cartInfoContainer}>
          <AppText
            style={{
              marginVertical: 10,
              fontSize: 18,
              fontFamily: 'Poppins-Bold',
              color: '#495464',
            }}
          >
            Cart Items
          </AppText>
          <AppText
            style={{
              marginVertical: 10,
              fontSize: 16,
              alignSelf: 'center',
              fontFamily: 'Poppins-Medium',
              color: '#495464',
            }}
          >
            Items ({cart.counter})
          </AppText>
        </View>
        <View style={{marginVertical: 10}}>
          <FlatList
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <AppText>No Item in cart</AppText>
              </View>
            }
            data={cart.cart}
            horizontal={true}
            snapToAlignment="end"
            // numColumns={2}
            keyExtractor={(item) => item._id}
            renderItem={({item, index}) => (
              <>
                <QuantityModal
                  isVisible={visible}
                  item={item}
                  onPressClose={() => setVisible(false)}
                />
                <View style={styles.imageContainer}>
                  {/* {handleCounter(item)} */}
                  <Image
                    source={{
                      uri: item.productImage,
                    }}
                    style={styles.productImage}
                  />
                  <TouchableOpacity
                    onPress={() => handleUpdate(item)}
                    style={styles.updateContainer}
                  >
                    <MaterialCommunityIcons
                      name="update"
                      size={30}
                      color="#1b262c"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleRemove(item)}
                    style={styles.deleteContainer}
                  >
                    <MaterialCommunityIcons
                      name="delete"
                      size={30}
                      color="#1b262c"
                    />
                  </TouchableOpacity>
                  <AppText style={styles.nameText}>{item.productName}</AppText>
                  <View style={styles.productInfoContainer}>
                    <Avatar.Image source={{uri: item.shopImage}} size={35} />
                    <AppText style={styles.shopText}>
                      By {item.shopName}
                    </AppText>
                  </View>
                  <View style={styles.headContainer}>
                    <AppText style={styles.nameText}>Quantity</AppText>
                    <AppText style={styles.nameText}>
                      x{!item.quantity ? stepCounter : item.quantity}
                    </AppText>
                  </View>
                  {/* <View style={styles.stepperButtonContainer}>
                    <StepperButton
                      name={'pluscircle'}
                      onPress={() => plusHandler(item)}
                    />
                    <AppText style={styles.counterText}>
                      {item.quantity}
                    </AppText>
                    <StepperButton
                      name={'minuscircle'}
                      onPress={() => minusHandler(item)}
                    />
                  </View> */}
                  <View style={styles.headContainer}>
                    <AppText style={styles.nameText}>Price</AppText>
                    <AppText style={styles.nameText}>
                      {item.totalProductPrice} RS
                    </AppText>
                  </View>
                </View>
              </>
            )}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: '#e8e8e8',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  deleteContainer: {
    position: 'absolute',
    top: 5,
    width: 40,
    alignSelf: 'flex-end',
    alignItems: 'center',
    borderRadius: 20,
  },
  updateContainer: {
    position: 'absolute',
    top: 5,
    width: 40,
    alignSelf: 'flex-start',
    alignItems: 'center',
    borderRadius: 20,
  },
  imageContainer: {
    width: width / 1.38,
    height: height / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    // marginHorizontal: 10,
    marginRight: 20,
    // paddingHorizontal: 10,
    borderRadius: 20,
  },
  productImage: {
    width: width / 1.75,
    height: height / 4,
    borderRadius: 10,
  },
  headContainer: {
    marginTop: 5,
    flexDirection: 'row',
    width: '50%',
    justifyContent: 'space-between',
  },
  nameText: {
    marginVertical: 5,
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
  },
  shopText: {
    fontSize: 16,
    alignSelf: 'center',
    marginHorizontal: 10,
  },
  productInfoContainer: {
    flexDirection: 'row',
  },
  cartInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 0,
  },
  stepperButtonContainer: {
    width: '80%',
    flexDirection: 'row',
    // backgroundColor: 'red',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
});
