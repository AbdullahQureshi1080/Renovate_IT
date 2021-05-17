//  Native Imports
import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {
  MenuProvider,
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import AppText from './AppText';
import CartModal from './Modal/CartModal.js';
export default function Header({
  navigation,
  idCheck,
  name,
  next,
  onAddToCart,
  renderButton,
  cart,
}) {
  const cartStore = useSelector((state) => state.entities.cart);
  const [cartVisible, setCartVisible] = useState(false);
  const counter = cartStore.counter;

  const checkoutHandler = () => {
    navigation.navigate('Cart');
  };
  return (
    <View style={styles.container}>
      <CartModal
        isVisible={cartVisible}
        btnCloseName="Close"
        onPressClose={() => setCartVisible(false)}
        counter={counter}
        onPressCheckout={() => checkoutHandler()}
      />
      <TouchableOpacity
        style={{alignSelf: 'center'}}
        onPress={() => navigation.goBack()}
      >
        <MaterialCommunityIcons name="backspace" size={40} color="#1b262c" />
      </TouchableOpacity>
      <AppText style={styles.screenName}>{name}</AppText>
      {renderButton ? (
        <View style={styles.renderContainer}>{renderButton}</View>
      ) : next ? (
        <View style={styles.buttonContainer}>
          <AppText style={styles.nextButtonText} onPress={onAddToCart}>
            {next}
          </AppText>
        </View>
      ) : (
        <View />
      )}
      {cart ? (
        <TouchableOpacity
          onPress={() => setCartVisible(true)}
          style={{
            width: '80%',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            flexDirection: 'row',
          }}
        >
          <AppText
            style={{
              fontFamily: 'Poppins-Bold',
              backgroundColor: '#1b262c',
              width: '8%',
              borderRadius: 10,
              textAlign: 'center',
              color: '#e8e8e8',
            }}
          >
            {counter}
          </AppText>
          <MaterialCommunityIcons name="cart" size={30} color="#1b262c" />
        </TouchableOpacity>
      ) : (
        <View />
      )}
      {idCheck ? (
        <View>
          <Menu>
            <MenuTrigger
              text={
                <MaterialIcons name="more-vert" size={40} color="#1b262c" />
              }
            />
            <MenuOptions customStyles={optionsStyles}>
              <MenuOption onSelect={handleUpdate} text={'Update'} />
              <MenuOption
                onSelect={() =>
                  Alert.alert(
                    'Delete',
                    'Are you sure you want to delete this post?',
                    [
                      {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel for post deletion'),
                        style: 'cancel',
                      },
                      {text: 'OK', onPress: handleDelete},
                    ],
                    {cancelable: false},
                  )
                }
                text={'Delete'}
              />
            </MenuOptions>
          </Menu>
        </View>
      ) : (
        <View></View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    marginVertical: 5,
    paddingTop: 18,
    marginHorizontal: 20,
  },
  screenName: {
    fontSize: 16,
    alignSelf: 'center',
    marginHorizontal: 15,
  },
  buttonContainer: {
    width: '75%',
    alignSelf: 'center',
  },
  renderContainer: {
    width: '70%',
    alignSelf: 'flex-end',
  },
  nextButtonText: {
    fontSize: 18,
    alignSelf: 'center',
    marginHorizontal: 15,
    fontFamily: 'Poppins-Medium',
    borderBottomWidth: 1.5,
  },
});
