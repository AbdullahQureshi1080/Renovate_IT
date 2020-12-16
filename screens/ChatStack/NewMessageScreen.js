// Native Imports
import React from 'react';
import {View,Text, StyleSheet} from 'react-native';

// Components Imports
import AppTextInput from '../../components/AppTextInput';

const NewMessageScreen = () => {
    return(
        <View style={styles.mainContainer}>
            <Text>New Message will be here </Text>
            <AppTextInput 
                placeholder="Enter Email" 
                
            />
        </View>    
    );
}

const styles = StyleSheet.create({
    mainContainer : {
        marginHorizontal:20,
    }
})

export default NewMessageScreen;

