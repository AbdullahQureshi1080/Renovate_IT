// Native Imports
import * as React from 'react';
import { Card,Paragraph } from 'react-native-paper';
import {View,Text} from 'react-native';

// Styles Imports
import ComponentsStyle from '../../styles/ComponentsStyle';

const LeftContent = props => <Text style={{fontSize : 18,fontFamily:"Poppins-Medium", color:"#495464"}}>Budget</Text>

const PostCard = (props) => (
    
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
        left={LeftContent} 
        right={() => <Text style={{fontSize : 18,fontFamily:"Poppins-Medium",color:"#495464"}}>{props.budget}</Text>}
        leftStyle = {{
           width:100,
        }}
        rightStyle = {{
            width:100,
         }}
    />
  </Card>  
)

export default PostCard;