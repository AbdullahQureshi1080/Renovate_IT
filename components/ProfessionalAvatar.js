// Native Imports
import * as React from 'react';
import { Avatar } from 'react-native-paper';
import {View,Text,TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AppText from './AppText';


const ProfessionalAvatar = (props) => {
 return(
     <TouchableOpacity onPress={props.onPress} disabled={props.disabled}>
        <View style={props.style}>
            {!props.imageUri?<MaterialCommunityIcons color="#1B262C" name="camera" size={35} />
            : <Avatar.Image size={props.size} source={{uri:props.imageUri}} />}
             <AppText style = {props.style.nameText}>{props.name}</AppText>
             <AppText style = {props.style.titleText}>{!props.title?props.placeholdertext:props.title}</AppText>
             <AppText style = {props.style.titleText}>{props.email}</AppText>
        </View> 
    </TouchableOpacity>
    
    );
   
 }
export default ProfessionalAvatar;