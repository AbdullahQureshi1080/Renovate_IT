// Native Imports
import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {Card} from 'react-native-paper';
// Styles Imports
import ComponentsStyle from '../../styles/ComponentsStyle';
import AppText from '../AppText';

const ProductCard = ({title, source, onPress, shopName, productPrice}) => {
  const rendersubtitle = () => (
    <View style={styles.subtitle}>
      <AppText style={styles.subtitleText}>{`By ${shopName}`}</AppText>
      <AppText style={styles.priceText}>{`RS ${productPrice}`}</AppText>
    </View>
  );
  return (
    <Card style={ComponentsStyle.categoryCardStyle} onPress={onPress}>
      <Card.Cover
        source={{uri: source}}
        style={ComponentsStyle.categoryCardStyle.cardCover}
      />
      <Card.Title
        title={title}
        subtitle={rendersubtitle()}
        titleStyle={[
          ComponentsStyle.categoryCardStyle.titleStyle,
          styles.title,
        ]}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    // marginHorizontal: 2,
  },
  subtitle: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: 'red',
  },
  subtitleText: {
    fontSize: 13,
  },
  priceText: {
    fontSize: 13,
    fontFamily: 'Poppins-Bold',
    paddingLeft: 10,
  },
});

export default ProductCard;
