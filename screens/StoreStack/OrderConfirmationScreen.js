//  Native Imports
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Avatar, Divider} from 'react-native-paper';

//  Component Imports
import AppText from '../../components/AppText';
import Header from '../../components/Header';

const {width, height} = Dimensions.get('screen');

export default function OrderConfirmationScreen({navigation, route}) {
  const {
    product,
    quantity,
    totalOrderPrice,
    deliveryDetails,
  } = route.params.data;
  console.log(deliveryDetails);
  const orderHandler = () => {
    console.log('Order handler');
    // navigation.navigate('Delivery Detail', {
    //   data: {product: product, quantity: counter, totalOrderPrice: total},
    // });
  };

  return (
    <>
      <Header
        navigation={navigation}
        idCheck={false}
        name={'Confirm Order'}
        next={'Order'}
        order
        onPressNext={orderHandler}
      />
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: product.productImage,
            }}
            style={styles.productImage}
          />
          <AppText style={styles.nameText}>{product.productName}</AppText>
          <View style={styles.productInfoContainer}>
            <Avatar.Image source={{uri: product.shopImage}} size={35} />
            <AppText style={styles.shopText}>By {product.shopName}</AppText>
          </View>
          <View style={styles.headContainer}>
            <AppText style={styles.nameText}>Quantity</AppText>
            <AppText style={styles.nameText}>x{quantity}</AppText>
          </View>
          <View style={styles.headContainer}>
            <AppText style={styles.nameText}>Price</AppText>
            <AppText style={styles.nameText}>{totalOrderPrice} RS</AppText>
          </View>
        </View>
        <Divider style={styles.divider} />
        {/* Screen Component Here, If refactored the code */}
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
    width: '50%',
    justifyContent: 'space-between',
  },
  shippingContainer: {
    marginTop: 5,
  },

  productImage: {
    width: width / 1.75,
    height: height / 4,
    borderRadius: 10,
  },
  nameText: {
    marginVertical: 5,
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
  },
  priceText: {
    marginTop: 10,
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
});
