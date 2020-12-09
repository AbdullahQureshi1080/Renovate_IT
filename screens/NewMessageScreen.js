import React from 'react';
import {View,Text, StyleSheet} from 'react-native';

const NewMessageScreen = ({navigation}) => {
    return(
        <View style={styles.mainContainer}>
            <Text>New Message will be here </Text>
        </View>    
    );
}

const styles = StyleSheet.create({
    mainContainer : {
        marginHorizontal:20,
    }
})

export default NewMessageScreen;

