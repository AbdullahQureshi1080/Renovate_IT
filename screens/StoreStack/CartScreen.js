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
import AppButton from '../../components/AppButton';
import AppText from '../../components/AppText';
import QuantityModal from '../../components/Modal/QuantityModal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {removeItem, updateItem} from '../../store/cart';

const {width, height} = Dimensions.get('screen');
export default function CartScreen({navigation}) {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.entities.cart);

  const handleRemove = (item) => {
    console.log('Handle Remove Item');
    dispatch(removeItem(item._id));
  };

  const onPressCheckout = () => {
    navigation.navigate('Delivery Detail');
  };

  // useEffect(() => {
  //   console.log('Cart from Redux Store', cart.cart);
  // }, [cart]);

  return (
    <View style={styles.modalView}>
      <View style={{marginVertical: 10}}>
        <FlatList
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <AppText>No Item in cart</AppText>
            </View>
          }
          ListHeaderComponent={
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
          }
          data={cart.cart}
          snapToAlignment="end"
          keyExtractor={(item) => item._id}
          renderItem={({item, index}) => (
            <>
              <View style={styles.imageContainer}>
                <Image
                  source={{
                    uri: item.productImage,
                  }}
                  style={styles.productImage}
                />
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
                <View style={{marginLeft: 10}}>
                  <AppText style={styles.nameText}>{item.productName}</AppText>
                  <View style={styles.productInfoContainer}>
                    <Avatar.Image source={{uri: item.shopImage}} size={35} />
                    <AppText style={styles.shopText}>
                      By {item.shopName}
                    </AppText>
                  </View>
                  <View style={styles.headContainer}>
                    <AppText style={styles.nameText}>Quantity</AppText>
                    <AppText style={styles.nameText}>x{item.quantity}</AppText>
                  </View>

                  <View style={styles.headContainer}>
                    <AppText style={styles.nameText}>Price</AppText>
                    <AppText style={styles.nameText}>
                      {item.totalProductPrice} RS
                    </AppText>
                  </View>
                </View>
              </View>
            </>
          )}
        />
      </View>
      <View
        style={{
          alignSelf: 'flex-end',
        }}
      >
        <AppButton
          name="Procced"
          onPress={onPressCheckout}
          disabled={cart.cart.length == 0}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalView: {
    // margin: 20,
    height: height,
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
    // width: 10,
    right: 5,
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
    // width: width / 1.38,
    // height: height / 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    // marginHorizontal: 10,
    // marginRight: 20,
    paddingHorizontal: 10,
    marginVertical: 10,
    borderRadius: 20,
  },
  productImage: {
    width: width / 4,
    height: height / 8,
    borderRadius: 10,
  },
  headContainer: {
    marginTop: 5,
    flexDirection: 'row',
    width: '60%',
    justifyContent: 'space-between',
  },
  nameText: {
    // marginVertical: 5,
    width: '60%',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    marginHorizontal: 5,
  },
  shopText: {
    fontSize: 14,
    alignSelf: 'center',
    marginHorizontal: 10,
  },
  productInfoContainer: {
    flexDirection: 'row',
    // width: '100%',
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
