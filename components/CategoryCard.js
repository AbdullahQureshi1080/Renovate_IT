import 'react-native-gesture-handler';
import * as React from 'react';
import { Avatar, Button, Card, Title, Paragraph,Image } from 'react-native-paper';
import ComponentsStyle from '../styles/ComponentsStyle';

// const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const CategoryCard = (props) => (
<Card style = {ComponentsStyle.categoryCardStyle}
  onPress={props.onPress}>
    <Card.Cover source={props.source} style ={ComponentsStyle.categoryCardStyle.cardCover} />
    <Card.Title 
        title={props.title} 
        titleStyle = {ComponentsStyle.categoryCardStyle.titleStyle} 
      />
  </Card>  
)

export default CategoryCard;