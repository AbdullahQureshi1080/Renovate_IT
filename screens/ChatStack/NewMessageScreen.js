// Native Imports
import React from 'react';
import {View, StyleSheet,ScrollView, Button} from 'react-native';
import AppButton from '../../components/AppButton';
import MaterialCommunityIcons from 'react-native-vector-icons';
// Components Imports
import AppTextInput from '../../components/AppTextInput';

const NewMessageScreen = ({navigation}) => {
    return(
        <ScrollView style={styles.mainContainer}>
            {/* <Button>
            <MaterialCommunityIcons name="keyboard-backspace" size={35}/>
            </Button>
            <Button>
            <MaterialCommunityIcons name="send-outline" size={35}/>
            </Button> */}
            {/* <View style={{alignSelf: 'right'}}> */}
            <AppButton name="Send" onPress={()=>{console.log("Button Pressed")}} />
            {/* </View> */}
            {/* <AppButton iconName="keyboard-backspace"></AppButton>
            <AppButton iconName={()=>{<MaterialCommunityIcons name="send-outline" size={35}/>}}></AppButton> */}
            <AppTextInput 
                placeholder="Enter Email" 
            />
            <AppTextInput 
                placeholder="Enter Message" 
                multiline={true}
            />

        </ScrollView>    
    );
}

const styles = StyleSheet.create({
    mainContainer : {
        marginHorizontal:20,
    },
})

export default NewMessageScreen;

