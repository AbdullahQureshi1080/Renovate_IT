// Native Imports
import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {Card} from 'react-native-paper';
// Styles Imports
import ComponentsStyle from '../../styles/ComponentsStyle';
import AppText from '../AppText';

const ProductCard = ({title, source, onPress, shopName, productPrice}) => {
  return (
    <Card style={ComponentsStyle.categoryCardStyle} onPress={onPress}>
      <Card.Cover
        source={{uri: source}}
        style={ComponentsStyle.categoryCardStyle.cardCover}
      />
      <Card.Title
        title={title}
        titleStyle={[
          ComponentsStyle.categoryCardStyle.titleStyle,
          styles.title,
        ]}
      />
      <View style={styles.subtitle}>
        <AppText style={styles.subtitleText}>{`By ${shopName}`}</AppText>
        <AppText style={styles.priceText}>{`RS ${productPrice}`}</AppText>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    marginHorizontal: 0,
  },
  subtitle: {
    width: '90%',
    marginHorizontal: 5,
  },
  subtitleText: {
    fontSize: 13,
    paddingLeft: 2,
  },
  priceText: {
    fontSize: 13,
    fontFamily: 'Poppins-Bold',
    paddingLeft: 2,
  },
});

export default ProductCard;
