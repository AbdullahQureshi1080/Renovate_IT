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
import AppButton from '../../components/AppButton';

//  Component Imports
import AppText from '../../components/AppText';
import Header from '../../components/Header';

const {width, height} = Dimensions.get('screen');

export default function ViewOrderScreen({navigation, route}) {
  const data = route.params.data;

  const styleforstatusRed = {
    color: '#F16174',
  };
  const styleforstatusBlue = {
    color: '#0F4C75',
  };

  const styleforstatusGreen = {
    color: '#329E4B',
  };

  const handleStatus = (status) => {
    if (status.toLowerCase() == 'confirmed') {
      return styleforstatusBlue;
    } else if (status.toLowerCase() == 'awaiting confirmation') {
      return styleforstatusRed;
    } else if (status.toLowerCase() == 'delivered') {
      return styleforstatusGreen;
    }
  };

  const handleCancelOrder = () => {
    console.log('Cancel Order');
  };

  return (
    <>
      <Header navigation={navigation} idCheck={false} name={'Order Details'} />
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: data.productImage,
            }}
            style={styles.productImage}
          />
          <AppText style={styles.nameText}>{data.productName}</AppText>
          <View style={styles.productInfoContainer}>
            <Avatar.Image source={{uri: data.shopImage}} size={35} />
            <AppText style={styles.shopText}>By {data.shopName}</AppText>
          </View>
          <View style={styles.headContainer}>
            <AppText style={styles.nameText}>Quantity</AppText>
            <AppText style={styles.nameText}>x{data.quantity}</AppText>
          </View>
          <View style={styles.headContainer}>
            <AppText style={styles.nameText}>Price</AppText>
            <AppText style={styles.nameText}>{data.totalOrderPrice} RS</AppText>
          </View>
        </View>
        <Divider style={styles.divider} />
        {/* Screen Component Here, If refactored the code */}
        <View style={styles.container}>
          <View style={styles.shippingContainer}>
            <AppText style={styles.nameText}>Shipping</AppText>
            <AppText style={styles.priceText}>
              {data.deliveryDetails.address}
            </AppText>
            <AppText style={styles.priceText}>
              {data.deliveryDetails.city}, {data.deliveryDetails.province}
            </AppText>
            <AppText style={styles.priceText}>
              {data.deliveryDetails.zipCode}
            </AppText>
          </View>
          <AppText style={[styles.status, handleStatus(data.orderStatus)]}>
            {data.orderStatus}
          </AppText>
          {data.orderStatus.toLowerCase() == 'awaiting confirmation' ? (
            <AppButton name="cancel order" onPress={handleCancelOrder} />
          ) : (
            <View />
          )}
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
  status: {
    alignSelf: 'flex-end',
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
});
