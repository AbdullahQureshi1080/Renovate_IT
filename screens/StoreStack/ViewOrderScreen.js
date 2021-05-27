//  Native Imports
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  View,
  FlatList,
} from 'react-native';
import {Avatar, Divider} from 'react-native-paper';

// Api Imports
import useApi from '../../hooks/useApi';
import storeAPI from '../../api/store';
import {useSelector} from 'react-redux';

//  Component Imports
import AppText from '../../components/AppText';
import Header from '../../components/Header';
import AppButton from '../../components/AppButton';

const {width, height} = Dimensions.get('screen');

export default function ViewOrderScreen({navigation, route}) {
  const state = useSelector((state) => state);
  const userId = state.entities.auth.data._id;
  const data = route.params.data;
  const orderId = data._id;
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

  const cancelApi = useApi(storeAPI.cancelStoreOrder);

  const handleCancelOrder = async () => {
    console.log('Cancel handler');
    console.log(userId, orderId);
    const result = await cancelApi.request(userId, orderId);
    if (!result.ok) {
      console.log('Result', result.data);
      console.log('Error canceling order');
      Alert.alert('Error canceling order');
      return;
    }
    console.log('Order Canceled');
    navigation.navigate('Store Home');
  };

  return (
    <>
      <Header
        navigation={navigation}
        idCheck={false}
        screenName={'Order Details'}
      />
      <ScrollView style={{paddingBottom: 20}}>
        <FlatList
          data={data.products}
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
              {data.deliveryDetails.address}
            </AppText>
            <AppText style={styles.priceText}>
              {data.deliveryDetails.city.label},{' '}
              {data.deliveryDetails.province.label}
            </AppText>
            <AppText style={styles.priceText}>
              {data.deliveryDetails.zipCode}
            </AppText>
          </View>
          <AppText style={[styles.status, handleStatus(data.orderStatus)]}>
            {data.orderStatus}
          </AppText>
          {data.orderStatus.toLowerCase() == 'awaiting confirmation' ? (
            <AppButton
              name="cancel order"
              onPress={handleCancelOrder}
              style={{marginBottom: 10}}
            />
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
    marginBottom: 30,
  },
  imageContainer: {
    width: width,
    height: height / 2,
    justifyContent: 'center',
    alignItems: 'center',
    // paddingTop: 20,
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
    marginTop: 20,
    // backgroundColor: 'blue',
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
    // width: '70%',
  },
});
