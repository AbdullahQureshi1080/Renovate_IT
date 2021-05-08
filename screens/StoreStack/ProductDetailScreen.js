import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Header from '../../components/Header';

export default function ProductDetailScreen({navigation, route}) {
  return (
    <>
      <Header navigation={navigation} idCheck={false} />
      <View>
        <Text>This is the Product Details Screen</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
