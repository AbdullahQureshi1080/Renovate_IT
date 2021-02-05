// Native Imports
import * as React from 'react';
import { Avatar } from 'react-native-paper';
import {View,Text,TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


const ProfessionalAvatar = (props) => {
 return(
     <TouchableOpacity onPress={props.onPress} disabled={props.disabled}>
        <View style={props.style}>
            {!props.imageUri?<MaterialCommunityIcons color="#1B262C" name="camera" size={40} />
            : <Avatar.Image size={props.size} source={{uri:props.imageUri}} />}
             <Text style = {props.style.nameText}>{props.name}</Text>
             <Text style = {props.style.titleText}>{!props.title?"Job Title Not Set":props.title}</Text>
             <Text style = {props.style.titleText}>{props.email}</Text>
        </View> 
    </TouchableOpacity>
    
    );
   
 }
export default ProfessionalAvatar;