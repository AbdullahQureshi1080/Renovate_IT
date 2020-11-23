import * as React from 'react';
import { Card,Paragraph } from 'react-native-paper';
import {View,Text} from 'react-native';
import ComponentsStyle from '../styles/ComponentsStyle';

const LeftContent = props => <Text style={{fontSize : 18,fontWeight : "600",}}>Budget</Text>
// const RightContent = props => <Text>{props.budget}</Text>

const PostCard = (props) => (
    
<Card style = {
      ComponentsStyle.postCardStyle
  }
  onPress={props.onPress}>
    <Card.Title 
        title={props.title} 
        titleStyle = {ComponentsStyle.postCardStyle.titleStyle}
    />
     <Card.Content>
        <Paragraph numberOfLines = {2}>{props.description}</Paragraph>
    </Card.Content>
    <Card.Title 
        left={LeftContent} 
        right={() => <Text style={{fontSize : 18,fontWeight : "600",}}>{props.budget}</Text>}
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