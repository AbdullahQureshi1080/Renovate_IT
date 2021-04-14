// Native Imports
import * as React from 'react';
import { Avatar, Card, } from 'react-native-paper';

// Styles Imports
import ComponentsStyle from '../../styles/ComponentsStyle';


const ProjectCard = (props) => (
<Card style = {ComponentsStyle.projectCardStyle}
  onPress={props.onPress} 
  // key={props.key}
  >
    <Card.Cover source={{uri:props.coverImage}} />
    <Card.Title 
        title={props.title} 
        subtitle={props.creator} 
        left={()=><Avatar.Image size={50} source={{uri:props.creatorImage}} />}
        titleStyle = {ComponentsStyle.projectCardStyle.titleStyle}
        subtitleStyle = {ComponentsStyle.projectCardStyle.subtitleStyle}
    />
  </Card>  
)

export default ProjectCard;