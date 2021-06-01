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
  Platform,
  Linking,
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
import {TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const {width, height} = Dimensions.get('screen');

export default function ViewOrderScreen({navigation, route}) {
  const state = useSelector((state) => state);
  const [shopData, setShopData] = useState('');
  const userId = state.entities.auth.data._id;
  const data = route.params.data;
  const orderId = data._id;
  const shopId = data.shopId;
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
  const shopDataApi = useApi(storeAPI.getShopData);

  const linkingContactPlatform = (linkFor) => {
    let msg = `From Renovate It: I am sending this message with regards to my order, ${orderId}`;
    let phoneWithCountryCode = '92' + shopData?.phoneNumber.substring(1);
    console.log('Number', phoneWithCountryCode);

    let mobile =
      Platform.OS == 'ios' ? phoneWithCountryCode : '+' + phoneWithCountryCode;
    console.log('Mobile Wala', mobile);
    if (mobile) {
      if (linkFor == 'whatsapp') {
        if (msg) {
          let url = 'whatsapp://send?text=' + msg + '&phone=' + mobile;
          Linking.openURL(url)
            .then((data) => {
              console.log('WhatsApp Opened');
            })
            .catch(() => {
              alert('Make sure WhatsApp installed on your device');
            });
        } else {
          alert('Please insert message to send');
        }
      }
      if (linkFor == 'Call') {
        let url = `tel:${mobile}`;
        Linking.openURL(url)
          .then((data) => {
            console.log('DialPad Opened');
          })
          .catch(() => {
            alert('Failed');
          });
      }
    } else {
      alert('Please insert mobile no');
    }
  };

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

  useEffect(() => {
    fetchShopData();
  }, []);

  const fetchShopData = async () => {
    console.log('Shop handler');
    // console.log(userId, orderId);
    const result = await shopDataApi.request(shopId);
    if (!result.ok) {
      console.log('Result', result.data);
      console.log('Error canceling order');
      Alert.alert('Error canceling order');
      return;
    }
    setShopData(result.data);
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
          <>
            <Divider style={styles.divider} />
            <View style={styles.noteContainer}>
              <AppText style={styles.noteHead}>Note</AppText>
              <AppText style={styles.noteDescription}>
                If you have any queries regarding your order you can contact at
                this number.{''}
              </AppText>
              <AppText style={styles.noteDescription}>
                {shopData.phoneNumber}
              </AppText>
              <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                <TouchableOpacity>
                  <MaterialCommunityIcons
                    name="whatsapp"
                    onPress={() => linkingContactPlatform('whatsapp')}
                    size={30}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <MaterialIcons
                    name="call"
                    onPress={() => linkingContactPlatform('Call')}
                    size={30}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <Divider style={styles.divider} />
            <View style={styles.noteContainer}>
              <AppText style={styles.noteHead}>Note</AppText>
              <AppText style={styles.noteDescription}>
                The store has the ability of cash on delivery payment and is
                bringing online soon. Thankyou for your cooperation.{' '}
              </AppText>
            </View>
          </>
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
