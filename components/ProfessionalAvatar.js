import * as React from 'react';
import { Avatar } from 'react-native-paper';
import {View,Text,TouchableOpacity} from 'react-native';
// import{DefaultTheme} from '@react-navigation/native'
import ComponentsStyle from '../styles/ComponentsStyle'

// const MyTheme = {
//     ...DefaultTheme,
//     dark:true,
//     colors: {
//       ...DefaultTheme.colors,
//       background:'#F4F4F2',
//       primary:"#222831",
//       text:"#495464",
//     },
//   };

const ProfessionalAvatar = (props) => {
 return(
     <TouchableOpacity onPress={props.onPress} >
        <View style={ComponentsStyle.professionalAvatar}>
             <Avatar.Image size={90} source={require('../assets/p1.jpg')} />
             <Text style = {ComponentsStyle.professionalAvatar.nameText}>{props.name}</Text>
             <Text style = {ComponentsStyle.professionalAvatar.titleText}>{props.title}</Text>
        </View> 
    </TouchableOpacity>
    
    );
   
 }
export default ProfessionalAvatar;