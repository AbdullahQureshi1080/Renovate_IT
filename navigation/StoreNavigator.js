// Native Imports
import 'react-native-gesture-handler';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {StyleSheet, Dimensions} from 'react-native';

// Screen Imports
import StoreCategories from '../screens/StoreStack/StoreCategories';
import OrdersScreen from '../screens/StoreStack/OrdersScreen';
import PreviousOrdersScreen from '../screens/StoreStack/PreviousOrdersScreen';
import CartScreen from '../screens/StoreStack/CartScreen';

// Styles Imports
// ...
const Tab = createMaterialTopTabNavigator();
const {width, height} = Dimensions.get('screen');

const StoreNavigator = ({navigation}) => {
  return (
    <Tab.Navigator
      initialRouteName="Store"
      screenOptions={{
        accessibilityRole: 'button',
      }}
      backBehavior="initialRoute"
      tabBarOptions={{
        activeTintColor: '#1B262C',
        inactiveTintColor: '#e2e2e2',
        pressColor: '#e8e8e8',
        style: styles.style,
        indicatorStyle: styles.indicatorStyle,
        labelStyle: styles.labelStyle,
      }}
    >
      <Tab.Screen
        name="Store"
        component={StoreCategories}
        navigation={navigation}
      />
      <Tab.Screen
        name="Orders"
        component={OrdersScreen}
        navigation={navigation}
      />
      <Tab.Screen
        name="History"
        component={PreviousOrdersScreen}
        navigation={navigation}
      />
      <Tab.Screen name="Cart" component={CartScreen} navigation={navigation} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  style: {
    width: width,
    height: 55,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  indicatorStyle: {
    height: '10%',
    backgroundColor: '#1B262C',
    borderRadius: 30,
  },
  labelStyle: {
    width: '100%',
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
  },
});

export default StoreNavigator;
