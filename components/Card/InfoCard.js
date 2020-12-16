// Native Imports
import 'react-native-gesture-handler';
import * as React from 'react';
import {Card} from 'react-native-paper';

// Styles Imports
import ComponentsStyle from '../../styles/ComponentsStyle';


const InfoCard = (props) => (
<Card style = {ComponentsStyle.infoCardStyle}
  onPress={props.onPress}>
    <Card.Title 
        title={props.value} 
        titleStyle = {ComponentsStyle.infoCardStyle.valueStyle} 
        subtitle={props.subtitle}
        subtitleStyle = {ComponentsStyle.infoCardStyle.subtitleStyle} 
      />
  </Card>  
)

export default InfoCard;

