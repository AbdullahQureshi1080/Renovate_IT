import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View,TouchableOpacity,StyleSheet} from 'react-native';
import ChatScreen from '../screens/ChatScreen';
import AllNotificationScreen from '../screens/AllNotificationScreen';
import AllMessagesScreen from '../screens/AllMessagesScreen';
import NewMessageScreen from '../screens/NewMessageScreen'; 

const Stack = createStackNavigator();

const ChatStack = () => {
    return(
        <Stack.Navigator initialRouteName="Chat">
            <Stack.Screen 
                name="Chat" 
                component={ChatScreen} 
                options={{
                  headerShown:false ,
                }}
            />
            <Stack.Screen 
                name="All Notifications" 
                component={AllNotificationScreen} 
                // options={{
                //   headerShown:false ,
                // }}
            />   
            <Stack.Screen 
                name="All Messages" 
                component={AllMessagesScreen} 
                // options={{
                //   headerShown:false ,
                // }}
            /> 
            <Stack.Screen
                name="New Message"
                component={NewMessageScreen}
            />
        </Stack.Navigator>
    );
}


const styles = StyleSheet.create({
  cardDistance:{
    marginBottom:10,
  }
})

export default ChatStack;