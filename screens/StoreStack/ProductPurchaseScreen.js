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
//  Component Imports
import AppText from '../../components/AppText';
import Header from '../../components/Header';

const {width, height} = Dimensions.get('screen');

export default function ProductPurchaseScreen({navigation, route}) {
  const product = route.params.product;
  const [counter, setCounter] = useState(1);
  const [total, setTotal] = useState(parseInt(product.productPrice));
  const nextHandler = () => {
    console.log('Delivery Detail');
    navigation.navigate('Delivery Detail', {
      data: {product: product, quantity: counter, totalOrderPrice: total},
    });
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
        name={'Buy Store Item'}
        next={'Next'}
        onPressNext={nextHandler}
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
    // backgroundColor: 'red',
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
    // backgroundColor: 'red',
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
    // marginVertical: 5,
    flexDirection: 'row',
    // justifyContent: 'flex-start',
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
    // backgroundColor: 'red',
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
