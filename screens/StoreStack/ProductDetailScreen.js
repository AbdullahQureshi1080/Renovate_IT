//  Native Imports
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {Avatar} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

//  Component Imports
import AppButton from '../../components/AppButton';
import AppText from '../../components/AppText';
import Header from '../../components/Header';

//  Api Imports
import useApi from '../../hooks/useApi';
import userAPI from '../../api/user';
import storeAPI from '../../api/store';
import {useSelector} from 'react-redux';
import ShopDetailModal from '../../components/Modal/ShopDetailModal';

const {width, height} = Dimensions.get('screen');

export default function ProductDetailScreen({navigation, route}) {
  const state = useSelector((state) => state);
  const userId = state.entities.auth.data._id;
  const [color, setColor] = useState(false);

  const [isVisible, setIsVisible] = useState(false);

  const [shopData, setShopData] = useState([]);
  const [shopProducts, setShopProducts] = useState([]);

  const product = route.params.product;
  const shopId = route.params.product.shopId;

  const saveApi = useApi(userAPI.saveItem);
  const shopApi = useApi(storeAPI.getShopData);
  const shopProductsApi = useApi(storeAPI.getShopProducts);

  const buyHandler = () => {
    console.log('Buying Item');
    navigation.navigate('Purchase Product', {product: product});
  };

  const onPressSave = async (image) => {
    console.log('Image for saving', image);
    let type = 'store';
    const result = saveApi.request(userId, image, type);
    if (!result.ok) {
      console.log('Not able to save at the moment');
    }
    console.log('Item Saved');
    setColor(true);
    Alert.alert('Item Saved');
  };

  const fetchShopData = async () => {
    const result = await shopApi.request(shopId);
    if (!result.ok) {
      console.log('Error Fetching shop data');
      return;
    }
    // console.log('Shop Data from Api', result.data);
    setShopData(result.data);
  };

  const fetchShopProducts = async () => {
    const result = await shopProductsApi.request(shopId);
    if (!result.ok) {
      console.log('Error Fetching shop data');
      return;
    }
    // console.log('Shop Products from Api', result.data);
    setShopProducts(result.data);
  };
  const handleCategory = (product) => {
    setIsVisible(false);
    navigation.navigate('Product Details', {product: product});
  };
  useEffect(() => {
    fetchShopData();
    fetchShopProducts();
  }, []);

  return (
    <>
      <Header
        navigation={navigation}
        idCheck={false}
        screenName={'Product Detail'}
      />
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: product.productImage,
            }}
            style={styles.productImage}
          />
        </View>
        {/* Screen Component Here, If refactored the code */}
        <View style={styles.container}>
          <View style={styles.headContainer}>
            <View style={styles.titleContainer}>
              <AppText style={styles.nameText}>{product.productName}</AppText>
              <AppText style={styles.priceText}>
                {product.productPrice} RS
              </AppText>
            </View>
            <View style={styles.shopInfoContainer}>
              <ShopDetailModal
                onPressCancel={() => setIsVisible(false)}
                isVisible={isVisible}
                data={shopData}
                products={shopProducts}
                navigation={navigation}
                handleCategory={(product) => handleCategory(product)}
              />
              <View style={{width: '70%', flexDirection: 'row'}}>
                <TouchableOpacity onPress={() => setIsVisible(true)}>
                  <Avatar.Image source={{uri: product.shopImage}} size={40} />
                </TouchableOpacity>
                <AppText style={styles.shopText}>{product.shopName}</AppText>
                <TouchableOpacity
                  onPress={() => onPressSave(product.productImage)}
                >
                  <MaterialIcons
                    name="bookmark"
                    size={40}
                    color={color ? 'red' : '#e8e8e8'}
                    style={{alignSelf: 'center'}}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.buttonContainer}>
                <AppButton name="Buy" onPress={buyHandler} />
              </View>
            </View>
          </View>
          <View style={styles.descriptionBox}>
            <AppText style={styles.nameText}>Description</AppText>
            <AppText style={styles.decsriptionText}>
              {product.productDescription}
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
    height: height / 2.5,
    backgroundColor: 'red',
  },
  headContainer: {
    marginVertical: 15,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productImage: {
    width: width,
    height: height / 2.5,
  },
  nameText: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    width: '70%',
  },
  priceText: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
  },
  shopInfoContainer: {
    flexDirection: 'row',
  },
  shopText: {
    fontSize: 18,
    alignSelf: 'center',
    marginHorizontal: 10,
  },
  decsriptionText: {
    fontSize: 0.0375 * width,
    fontFamily: 'Poppins-Regular',
    width: '100%',
    textAlign: 'justify',
  },
  buttonContainer: {
    width: '30%',
    alignSelf: 'flex-end',
  },
});
