// Native Imports
import * as React from 'react';
import {Avatar, Card, Paragraph} from 'react-native-paper';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

// Styles Imports
import ComponentsStyle from '../../styles/ComponentsStyle';
import AppText from '../AppText';

const OrderCard = ({
  productName,
  onPress,
  shopName,
  totalOrderPrice,
  shopImage,
  orderStatus,
  styleStatus,
}) => {
//   const [color, setColor] = React.useState('');

//   React.useEffect(() => {
//     if (orderStatus.toLowerCase() == 'confirmed') {
//       setColor('#0F4C75');
//     } else if (orderStatus.toLowerCase() == 'awaitng confirmation') {
//       setColor('#F16174');
//     }
//   }, []);
  return (
    <TouchableOpacity style={ComponentsStyle.postCardStyle} onPress={onPress}>
      <View style={styles.container}>
        <AppText style={styles.titleText}>{productName}</AppText>
        <AppText style={styles.priceText}>{`${totalOrderPrice} RS `}</AppText>
      </View>
      <View style={styles.container}>
        <View style={styles.shopInfo}>
          <Avatar.Image source={{uri: shopImage}} size={40} />
          <AppText style={styles.subtitleText}>{`By ${shopName}`}</AppText>
        </View>
        <AppText style={[styles.status, styleStatus]}>{orderStatus}</AppText>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  titleText: {
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
  },
  subtitleText: {
    fontSize: 16,
    marginLeft: 10,
    alignSelf: 'center',
  },
  priceText: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    paddingLeft: 10,
    color: '#222831',
  },
  shopInfo: {
    flexDirection: 'row',
  },
  status: {
    alignSelf: 'center',
    fontSize: 14,
  },
});

export default OrderCard;
