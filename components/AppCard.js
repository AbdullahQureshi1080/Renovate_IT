import * as React from 'react';
import { Card,Paragraph } from 'react-native-paper';
import {View,Text} from 'react-native';
import ComponentsStyle from '../styles/ComponentsStyle';
// import ListViewItem from './ListViewItem';
import ListView from './ListView';


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