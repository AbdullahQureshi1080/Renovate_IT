// Native Imports
import * as React from 'react';
import { Avatar } from 'react-native-paper';
import {View,Text,TouchableOpacity} from 'react-native';


const ProfessionalAvatar = (props) => {
 return(
     <TouchableOpacity onPress={props.onPress} disabled={props.disabled}>
        <View style={props.style}>
             <Avatar.Image size={props.size} source={require('../assets/p1.jpg')} />
             <Text style = {props.style.nameText}>{props.name}</Text>
             <Text style = {props.style.titleText}>{props.title}</Text>
             <Text style = {props.style.titleText}>{props.email}</Text>
        </View> 
    </TouchableOpacity>
    
    );
   
 }
export default ProfessionalAvatar;