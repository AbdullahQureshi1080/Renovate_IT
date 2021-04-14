// Native Imports
import * as React from 'react';
import { Card,Paragraph } from 'react-native-paper';
import {View,Text} from 'react-native';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
// Styles Imports
import ComponentsStyle from '../../styles/ComponentsStyle';
import AppText from '../AppText';

const rightContent = props => <AppText>{props.members}</AppText>

const FirmCard = (props) => (
    
<Card style = {
      ComponentsStyle.postCardStyle
  }
  onPress={props.onPress} 
  // key={props.key}
  >
    <Card.Title 
        title={props.title} 
        titleStyle = {ComponentsStyle.postCardStyle.titleStyle}
    />
     <Card.Content>
        <Paragraph numberOfLines = {2}>{props.description}</Paragraph>
    </Card.Content> 
    <Card.Title 
        // left={LeftContent} 
        right={() =>(
        <View style={{flexDirection:"row",}}>
            <MaterialIcons name="people" size={25}/>
            <AppText style={{fontSize:15, fontFamily:"Poppins-Medium", marginHorizontal:5, alignSelf: 'center',}}>{props.members}</AppText> 
        </View>
        )}
        // right={rightContent}
        leftStyle = {{
           width:100,
        }}
        rightStyle = {{
           marginHorizontal:15,
         }}
    />
  </Card>  
)

export default FirmCard;