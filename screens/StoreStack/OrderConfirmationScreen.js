//  Native Imports
import React, {useEffect, useState} from 'react';
import {Dimensions, Image, StyleSheet, View, FlatList} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';

import {Avatar, Divider} from 'react-native-paper';

//  Component Imports
import AppText from '../../components/AppText';
import Header from '../../components/Header';

// Api Imports
import useApi from '../../hooks/useApi';
import storeAPI from '../../api/store';
import {Alert} from 'react-native';
import {ScrollView} from 'react-native';
// import {emptyCart} from '../../store/cart';

const {width, height} = Dimensions.get('screen');

export default function OrderConfirmationScreen({navigation, route}) {
  // const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const userId = state.entities.auth.data._id;
  console.log('User Id', userId);
  const cart = useSelector((state) => state.entities.cart);
  const {deliveryDetails} = route.params.data;
  const shopId = cart.cart[0].shopId ? cart.cart[0].shopId : '';
  const products = cart.cart;
  const productPriceArray = cart.cart.map(
    ({totalProductPrice}) => totalProductPrice,
  );

  const totalOrderCost = productPriceArray.reduce(function (
    accumulator,
    current,
  ) {
    return accumulator + current;
  });
  const orderApi = useApi(storeAPI.orderFromStore);
  const orderHandler = async () => {
    console.log('Order handler');
    console.log(userId, shopId, products, totalOrderCost, deliveryDetails);
    const result = await orderApi.request(
      userId,
      shopId,
      products,
      totalOrderCost,
      deliveryDetails,
    );
    if (!result.ok) {
      console.log('Result', result.data);
      console.log('Error placing order');
      Alert.alert('Error placing order');
      return;
    }
    console.log('Order Placed');
    clearCartHandler();
    // setTimeout(() => {
    // }, 1000);
  };

  const clearCartHandler = () => {
    // dispatch(emptyCart());
    navigation.navigate('Loading');
  };

  return (
    <>
      <Header
        navigation={navigation}
        idCheck={false}
        screenName={'Confirm Order'}
        buttonName={'Place Order'}
        buttonHandler={() => orderHandler()}
      />
      <ScrollView style={{marginVertical: 10}}>
        <FlatList
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <AppText>No Item in cart</AppText>
            </View>
          }
          data={cart.cart}
          horizontal={true}
          snapToAlignment="end"
          keyExtractor={(item) => item._id}
          renderItem={({item, index}) => (
            <>
              <View style={styles.imageContainer}>
                <View
                  style={{
                    alignItems: 'center',
                    backgroundColor: '#e8e8e8',
                    borderRadius: 20,
                    width: '70%',
                  }}
                >
                  <Image
                    source={{
                      uri: item.productImage,
                    }}
                    style={styles.productImage}
                  />
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
        <Divider style={styles.divider} />
        <View style={styles.container}>
          <View style={styles.shippingContainer}>
            <AppText style={styles.nameText}>Shipping</AppText>
            <AppText style={styles.priceText}>
              {deliveryDetails.address}
            </AppText>
            <AppText style={styles.priceText}>
              {deliveryDetails.city.label}, {deliveryDetails.province.label}
            </AppText>
            <AppText style={styles.priceText}>
              {deliveryDetails.zipCode}
            </AppText>
          </View>
          <Divider style={styles.divider} />
          <View style={styles.noteContainer}>
            <AppText style={styles.noteHead}>Note</AppText>
            <AppText style={styles.noteDescription}>
              The store has the ability of cash on delivery payment and is
              bringing online soon. Thankyou for your cooperation.{' '}
            </AppText>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  imageContainer: {
    width: width,
    height: height / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headContainer: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  shippingContainer: {
    marginTop: 5,
  },

  productImage: {
    width: width / 2,
    height: height / 4,
    borderRadius: 10,
    marginTop: 25,
  },
  nameText: {
    marginVertical: 5,
    marginHorizontal: 15,
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
  },
  priceText: {
    marginTop: 5,
    fontSize: 17,
    fontFamily: 'Poppins-Regular',
    paddingLeft: 35,
  },
  productInfoContainer: {
    flexDirection: 'row',
  },
  shopText: {
    fontSize: 16,
    alignSelf: 'center',
    marginHorizontal: 10,
  },

  divider: {
    marginVertical: 15,
    borderWidth: 0.5,
    opacity: 0.7,
  },
  noteContainer: {
    marginHorizontal: 20,
  },
  noteHead: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
  },
  noteDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
});
