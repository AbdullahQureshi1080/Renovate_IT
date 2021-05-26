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
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';

//  Component Imports
import AppText from '../../components/AppText';
import Header from '../../components/Header';
import {addItem, addNewItem} from '../../store/cart';

const {width, height} = Dimensions.get('screen');

export default function ProductPurchaseScreen({navigation, route}) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.entities.cart);
  const product = route.params.product;
  const [counter, setCounter] = useState(1);
  const [total, setTotal] = useState(parseInt(product.productPrice));

  const addToCartHandler = () => {
    const cartItemIds = cart.cart.map(({_id}) => _id);
    const shopCartId = cart.cart.map(({shopId}) => shopId);
    console.log('Cart Shop Id', shopCartId);
    console.log('Cart Item Ids', cartItemIds);
    console.log('Cart Handler');

    const check = cartItemIds.filter((_id) => _id == product._id);
    if (check.length > 0) {
      console.log('Item Already Exists in Cart');
      Alert.alert('Product already in cart');
      return;
    }

    // const checkShop = shopIds.filter((id) => id == product.shopId);
    if (shopCartId[0] == product.shopId || shopCartId.length <= 0) {
      // console.log('Item Already Exists in Cart');
      // Alert.alert('Product already in cart');
      // return;

      let data = {
        _id: product._id,
        productName: product.productName,
        productDescription: product.productDescription,
        productCategory: product.productCategory,
        productPrice: product.productPrice,
        productImage: product.productImage,
        shopName: product.shopName,
        shopImage: product.shopImage,
        shopId: product.shopId,
        quantity: counter,
        totalProductPrice: total,
      };
      dispatch(addItem(data));
      navigation.navigate('Category Screen');
    } else {
      console.log('Cannot Shop From Differnt Stores at Once');
      Alert.alert('Cannot Shop From Differnt Stores at Once');
      Alert.alert(
        'Cart Update',
        'Empty Cart and add from different store?',
        [
          {
            text: 'Cancel',
            onPress: () => Alert.alert('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: () => handleNewUpdateCart(),
            style: 'cancel',
          },
        ],
        {
          cancelable: true,
          onDismiss: () =>
            Alert.alert(
              'This alert was dismissed by tapping outside of the alert dialog.',
            ),
        },
      );
      return;
    }
  };

  const handleNewUpdateCart = () => {
    Alert.alert('Yes Pressed');
    let data = {
      _id: product._id,
      productName: product.productName,
      productDescription: product.productDescription,
      productCategory: product.productCategory,
      productPrice: product.productPrice,
      productImage: product.productImage,
      shopName: product.shopName,
      shopImage: product.shopImage,
      shopId: product.shopId,
      quantity: counter,
      totalProductPrice: total,
    };
    dispatch(addNewItem(data));
    navigation.navigate('Category Screen');
  };

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
      const price = (counter + 1) * parseInt(product.productPrice);
      setTotal(price);
    } else if (type == 'minus') {
      if (total === parseInt(product.productPrice))
        return Alert.alert('Minimun one product quantity');
      const price = total - parseInt(product.productPrice);
      setTotal(price);
    }
  };
  const plusHandler = () => {
    setCounter(counter + 1);
    priceHandler('plus');
  };
  const minusHandler = () => {
    if (counter === 1) return Alert.alert('Minimun one product quantity');
    setCounter(counter - 1);
    priceHandler('minus');
  };
  return (
    <>
      <Header
        navigation={navigation}
        idCheck={false}
        screenName={'Buy Store Item'}
        buttonName={'Add To Cart'}
        buttonHandler={addToCartHandler}
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
        </View>
        <Divider style={styles.divider} />
        {/* Screen Component Here, If refactored the code */}
        <View style={styles.container}>
          <View style={styles.headContainer}>
            <AppText style={styles.nameText}>Quantity</AppText>
            <View style={styles.stepperButtonContainer}>
              <StepperButton name={'pluscircle'} onPress={plusHandler} />
              <AppText style={styles.counterText}>{counter}</AppText>
              <StepperButton name={'minuscircle'} onPress={minusHandler} />
            </View>
          </View>
          <View style={styles.priceContainer}>
            <View style={styles.subHeadContainer}>
              <AppText style={styles.nameText}>Price</AppText>
              <AppText style={styles.priceText}>
                {product.productPrice} <AppText>x{counter}</AppText>
              </AppText>
            </View>
            <View style={styles.subHeadContainer}>
              <AppText style={styles.nameText}>Total Price</AppText>
              <AppText style={styles.priceText}>{total}</AppText>
            </View>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  headContainer: {
    marginVertical: 15,
  },
  priceContainer: {
    marginVertical: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  subHeadContainer: {
    width: '50%',
  },
  stepperButtonContainer: {
    width: '80%',
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
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
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    paddingLeft: 50,
  },
  productInfoContainer: {
    flexDirection: 'row',
  },
  shopText: {
    fontSize: 16,
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
    width: '100%',
    alignSelf: 'flex-end',
  },
  divider: {
    borderWidth: 0.5,
    opacity: 0.7,
  },
  counterText: {
    fontSize: 18,
    alignSelf: 'center',
  },
});
