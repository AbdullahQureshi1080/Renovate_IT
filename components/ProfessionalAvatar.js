import * as React from 'react';
import { Avatar } from 'react-native-paper';
import {View,Text,TouchableOpacity} from 'react-native';
// import{DefaultTheme} from '@react-navigation/native'
import ComponentsStyle from '../styles/ComponentsStyle'


const ProfessionalAvatar = (props) => {
 return(
     <TouchableOpacity onPress={props.onPress} disabled={props.disabled}>
        <View style={props.style}>
             <Avatar.Image size={props.size} source={require('../assets/p1.jpg')} />
             <Text style = {props.style.nameText}>{props.name}</Text>
             <Text style = {props.style.titleText}>{props.title}</Text>
        </View> 
    </TouchableOpacity>
    
    );
   
 }
export default ProfessionalAvatar;