import React, {useEffect, useState} from 'react';
// import {ActivityIndicator} from 'react-native';
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';

import ActivityIndicator from '../../components/ActivityIndicator';
import {emptyCart} from '../../store/cart';

export default function LoadingScreen({navigation}) {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(true);
  const clearCartHandler = () => {
    dispatch(emptyCart());
    setVisible(false);
    navigation.navigate('Store Home');
  };

  useEffect(() => {
    clearCartHandler();
  }, []);
  return <ActivityIndicator visible={visible} />;
}

const styles = StyleSheet.create({});
