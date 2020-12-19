// Native Imports
import React from 'react';
import { StyleSheet,Dimensions } from 'react-native';
import {Button} from 'react-native-paper';


var { width, height } = Dimensions.get('window');


const AppButton = ({name,onPress}) =>{
return (
    <Button 
        style={styles.button} 
        color = {styles.button.color}
        onPress={onPress}
        // icon={()=>{iconName}}
        >{name}
        </Button>
);
}
const styles = StyleSheet.create({
    button:{
        backgroundColor:"#495464", 
        color : "#F4F4F2",
        marginVertical:10, 
        width:width/3,
        alignSelf:"center",
    }
})
export default AppButton;