import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function CategoryScreen({route}) {
  return (
    <View>
      <Text>{route.params.category}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
