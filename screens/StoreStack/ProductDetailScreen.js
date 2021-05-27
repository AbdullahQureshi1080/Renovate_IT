//  Native Imports
import React, {useState} from 'react';
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
import {useSelector} from 'react-redux';

const {width, height} = Dimensions.get('screen');

export default function ProductDetailScreen({navigation, route}) {
  const state = useSelector((state) => state);
  const userId = state.entities.auth.data._id;
  const [color, setColor] = useState(false);
  const product = route.params.product;
  const saveApi = useApi(userAPI.saveItem);
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
              <View style={{width: '70%', flexDirection: 'row'}}>
                <Avatar.Image source={{uri: product.shopImage}} size={40} />
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
