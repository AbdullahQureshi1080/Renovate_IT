import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
// import AppText from "./AppText";

function PickerItem({ label, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    padding: 20,
    fontFamily:"Poppins-Medium",
    fontSize:14,
  },
  container:{
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    marginVertical:5,
    borderRadius:12,
  }
});

export default PickerItem;
