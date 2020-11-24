import * as React from 'react';
import { Avatar, Card, } from 'react-native-paper';
import ComponentsStyle from '../styles/ComponentsStyle';


const ProjectCard = (props) => (
<Card style = {ComponentsStyle.projectCardStyle}
  onPress={props.onPress}>
    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
    <Card.Title 
        title={props.title} 
        subtitle={props.name} 
        left={()=><Avatar.Image size={50} source={require("../assets/p1.jpg")} />}
        titleStyle = {ComponentsStyle.projectCardStyle.titleStyle}
        subtitleStyle = {ComponentsStyle.projectCardStyle.subtitleStyle}
    />
  </Card>  
)

export default ProjectCard;