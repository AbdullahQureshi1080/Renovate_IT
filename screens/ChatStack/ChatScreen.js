// Native Imports
import React from 'react';
import {View,Text, StyleSheet} from 'react-native';

// Components Imports
import AppCard from '../../components/AppCard';
import {ListViewNotifications,ListViewMessages} from '../../components/List/ListView';

const ChatScreen = ({navigation}) => {
return(
    <View style={styles.screenContainer}>
        <AppCard 
            title="Notifications" 
            component = {
            <ListViewNotifications/>
        } 
            onPress={()=>navigation.navigate('All Notifications')}/>
        <AppCard 
            title="Inbox" 
            component = {
                <ListViewMessages navigation = {navigation}/>
                }  
            onPress={()=>{navigation.navigate('All Messages')}}  
            
        />
    </View>    
);
}

const styles = StyleSheet.create({
    screenContainer:{
        // marginHorizontal:20,
        marginVertical:15,
    }
})

export default ChatScreen;

