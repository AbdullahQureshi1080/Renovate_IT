// Native Imports
import * as React from 'react';
import {Card} from 'react-native-paper';
// Styles Imports
import ComponentsStyle from '../../styles/ComponentsStyle';

const ProductCard = ({title, source, onPress}) => (
  <Card style={ComponentsStyle.categoryCardStyle} onPress={onPress}>
    <Card.Cover
      source={source}
      style={ComponentsStyle.categoryCardStyle.cardCover}
    />
    <Card.Title
      title={title}
      titleStyle={ComponentsStyle.categoryCardStyle.titleStyle}
    />
  </Card>
);

export default ProductCard;
