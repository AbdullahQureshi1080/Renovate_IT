// Native Imports
import * as React from 'react';
import {Avatar, Card, Paragraph} from 'react-native-paper';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

// Styles Imports
import ComponentsStyle from '../../styles/ComponentsStyle';
import AppText from '../AppText';
import {useSelector} from 'react-redux';

const BidCard = ({data, onPress, styleStatus}) => {
  const allusers = useSelector((state) => state.entities.data.allusers);
  const bidder = allusers.filter((user) => {
    return user._id == data.bidderId;
  });
  console.log('Bidder from All users', bidder);

  return (
    <Card style={styles.bidCardStyle} onPress={onPress}>
      <View style={styles.container}>
        <Card.Title
          titleStyle={styles.titleText}
          title={bidder[0].name}
        ></Card.Title>
        <Card.Title
          titleStyle={styles.priceText}
          title={`RS ${data.bidAmount}`}
          titleNumberOfLines={1}
          ellipsizeMode="tail"
        ></Card.Title>
      </View>
      <View style={styles.container}>
        <Card.Content>
          <Paragraph numberOfLines={1} ellipsizeMode="tail">
            {data.message}
          </Paragraph>
        </Card.Content>
      </View>
      <AppText style={[styles.status, styleStatus]}>{data.bidStatus}</AppText>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  titleText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
  subtitleText: {
    fontSize: 16,
    paddingRight: 20,
  },
  priceText: {
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
    paddingLeft: 10,
    color: '#495464',
  },
  shopInfo: {
    flexDirection: 'row',
  },
  status: {
    alignSelf: 'flex-end',
    fontSize: 14,
    marginRight: 10,
  },
  bidCardStyle: {
    width: '90%',
    borderRadius: 5,
    // marginHorizontal: marginHorizontal,
    marginVertical: 10,
    backgroundColor: '#e8e8e8',
    shadowColor: '#1b262c',
    // border: 'none',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    // titleStyle: {
    //   fontSize: 16,
    //   fontWeight: '600',
    //   // fontFamily: 'Poppins-Regular',
    // },
    // subtitleStyle: {
    //   fontSize: 14,
    //   // fontWeight : "normal",
    //   fontWeight: '600',
    //   // fontFamily: 'Poppins-Bold',
    // },
  },
});

export default BidCard;
