// Native Imports
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import StoreHome from '../screens/StoreStack/StoreHome';
import CategoryScreen from '../screens/StoreStack/CategoryScreen';
import ProductDetailScreen from '../screens/StoreStack/ProductDetailScreen';
import ProductPurchaseScreen from '../screens/StoreStack/ProductPurchaseScreen';
import DeliveryDetailScreen from '../screens/StoreStack/DeliveryDetailScreen';
import OrderConfirmationScreen from '../screens/StoreStack/OrderConfirmationScreen';
import ViewOrderScreen from '../screens/StoreStack/ViewOrderScreen';

const Stack = createStackNavigator();

const StoreStack = () => {
  return (
    <Stack.Navigator initialRouteName="Store Home">
      <Stack.Screen
        name="Store Home"
        component={StoreHome}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Category Screen"
        component={CategoryScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Product Details"
        component={ProductDetailScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Purchase Product"
        component={ProductPurchaseScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Delivery Detail"
        component={DeliveryDetailScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Order Confirmation"
        component={OrderConfirmationScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="View Order"
        component={ViewOrderScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default StoreStack;
