import * as React from 'react';
import { Avatar } from 'react-native-paper';
import {View,Text,TouchableOpacity} from 'react-native';
import ComponentsStyle from '../styles/ComponentsStyle'

const ProfessionalAvatar = (props) => {
 return(
     <TouchableOpacity >
        <View style={ComponentsStyle.professionalAvatar}>
             <Avatar.Image size={90} source={require('../assets/p1.jpg')} />
             <Text style = {ComponentsStyle.professionalAvatar.nameText}>{props.name}</Text>
        </View> 
    </TouchableOpacity>
    
    );
   
 }
export default ProfessionalAvatar;