// Native Imports
import * as React from 'react';
import {Avatar, Card, Paragraph} from 'react-native-paper';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

// Styles Imports
import ComponentsStyle from '../../styles/ComponentsStyle';
import AppText from '../AppText';
import {useSelector} from 'react-redux';

const BidCard = ({bidderId, data, bidStatus, onPress, styleStatus}) => {
  const allusers = useSelector((state) => state.entities.data.allusers);
  const bidder = allusers.filter((user) => {
    return user._id == data.bidderId;
  });
  console.log('Bidder from All users', bidder);

  return (
    <TouchableOpacity style={ComponentsStyle.postCardStyle} onPress={onPress}>
      <View style={styles.container}>
        <AppText style={styles.titleText}>{bidder[0].name}</AppText>
        <AppText style={styles.priceText}>{data.bidAmount}</AppText>
      </View>
      <View style={styles.container}>
        <View style={styles.shopInfo}>
          <AppText style={styles.subtitleText}>{data.message}</AppText>
        </View>
        <AppText style={[styles.status, styleStatus]}>{data.bidStatus}</AppText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  titleText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
  subtitleText: {
    fontSize: 16,
    // marginLeft: 10,
    // paddingLeft: 10,
    paddingRight: 20,
    alignSelf: 'center',
  },
  priceText: {
    fontSize: 14,
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

export default BidCard;
