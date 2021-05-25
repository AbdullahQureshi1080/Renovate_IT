// Native Imports
import 'react-native-gesture-handler';
import React, {useEffect, useState, useCallback} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Screen Imports
import ChatScreen from '../screens/ChatStack/ChatScreen';
import AllNotificationScreen from '../screens/ChatStack/AllNotificationScreen';
import AllMessagesScreen from '../screens/ChatStack/AllMessagesScreen';
import CreateNewChat from '../screens/ChatStack/CreateNewChat';
import UserChatScreen from '../screens/ChatStack/UserChatScreen';


const Stack = createStackNavigator();

const ChatStack = () => {
  return (
    <Stack.Navigator initialRouteName="Chat">
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          headerShown: false,
        }}
        // initialParams={chatIds}
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
      <Stack.Screen name="CreateChat" component={CreateNewChat} />
      <Stack.Screen name="UserChat" component={UserChatScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  cardDistance: {
    marginBottom: 10,
  },
});

export default ChatStack;
