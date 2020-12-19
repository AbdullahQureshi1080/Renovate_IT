// Native Imports
import * as React from 'react';
import { Avatar, Card, } from 'react-native-paper';

// Styles Imports
import ComponentsStyle from '../../styles/ComponentsStyle';


const ProjectCard = (props) => (
<Card style = {ComponentsStyle.projectCardStyle}
  onPress={props.onPress}>
    <Card.Cover source={require("../../assets/renovation.jpg")} />
    <Card.Title 
        title={props.title} 
        subtitle={props.name} 
        left={()=><Avatar.Image size={50} source={require("../../assets/p1.jpg")} />}
        titleStyle = {ComponentsStyle.projectCardStyle.titleStyle}
        subtitleStyle = {ComponentsStyle.projectCardStyle.subtitleStyle}
    />
  </Card>  
)

export default ProjectCard;