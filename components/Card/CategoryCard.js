// Native Imports
import 'react-native-gesture-handler';
import * as React from 'react';
import { Card } from 'react-native-paper';
// Styles Imports
import ComponentsStyle from '../../styles/ComponentsStyle';

const CategoryCard = (props) => (
<Card style = {ComponentsStyle.categoryCardStyle}
  onPress={props.onPress}
  // key={props.key}
  >
    <Card.Cover source={props.source} style ={ComponentsStyle.categoryCardStyle.cardCover} />
    <Card.Title 
        title={props.title} 
        titleStyle = {ComponentsStyle.categoryCardStyle.titleStyle} 
      />
  </Card>  
)

export default CategoryCard;