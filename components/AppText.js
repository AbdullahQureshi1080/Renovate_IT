import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function AppText({style, children}) {
  return (
    // <View>
    <Text style={[styles.appText, style]}>{children}</Text>
    // </View>
  );
}

const styles = StyleSheet.create({
  appText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#495464',
  },
});
