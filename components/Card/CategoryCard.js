// Native Imports
import 'react-native-gesture-handler';
import * as React from 'react';
import {Card} from 'react-native-paper';
// Styles Imports
import ComponentsStyle from '../../styles/ComponentsStyle';

const CategoryCard = ({title, source, onPress,}) => (
  <Card
    style={ComponentsStyle.categoryCardStyle}
    onPress={onPress}
  >
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

export default CategoryCard;
