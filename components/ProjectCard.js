import * as React from 'react';
// import { Component } from 'react';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import { Avatar, Button, Card, Title, Paragraph,Image } from 'react-native-paper';
import ComponentsStyle from '../styles/ComponentsStyle';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const ProjectCard = (props) => (
<Card style = {ComponentsStyle.projectCardStyle}
  onPress={props.onPress}>
    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
    <Card.Title 
        title={props.title} 
        subtitle={props.name} 
       left={LeftContent}
        titleStyle = {ComponentsStyle.projectCardStyle.titleStyle}
        subtitleStyle = {ComponentsStyle.projectCardStyle.subtitleStyle}
    />
  </Card>  
)

export default ProjectCard;