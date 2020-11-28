import 'react-native-gesture-handler';
import * as React from 'react';
import { Avatar, Button, Card, Title, Paragraph,Image } from 'react-native-paper';
import ComponentsStyle from '../styles/ComponentsStyle';

// const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const InfoCard = (props) => (
<Card style = {ComponentsStyle.infoCardStyle}
  onPress={props.onPress}>
    {/* <Card.Cover source={{ uri: 'https://picsum.photos/700' }} style ={ComponentsStyle.infoCardStyle.cardCover} /> */}
    <Card.Title 
        title={props.value} 
        titleStyle = {ComponentsStyle.infoCardStyle.valueStyle} 
        subtitle={props.subtitle}
        subtitleStyle = {ComponentsStyle.infoCardStyle.subtitleStyle} 
      />
  </Card>  
)

export default InfoCard;