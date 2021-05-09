import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function AppText({style, children, onPress}) {
  return (
    <Text style={[styles.appText, style]} onPress={onPress}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  appText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#495464',
  },
});
