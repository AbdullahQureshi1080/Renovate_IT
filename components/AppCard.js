// Native Imports
import * as React from 'react';
import { Card } from 'react-native-paper';

// Styles Imports
import ComponentsStyle from '../styles/ComponentsStyle';


const AppCard = (props) => {
    return(
<Card style = {
      ComponentsStyle.AppCardStyle
  }
  onPress={props.onPress}>
    <Card.Title 
        title={props.title} 
        titleStyle = {ComponentsStyle.AppCardStyle.titleStyle}
    />
     <Card.Content>
         {props.component}
    </Card.Content>
  </Card>  
    )}

export default AppCard;