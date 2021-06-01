// Native Imports
import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
// import { View,TouchableOpacity,StyleSheet} from 'react-native';
// import AppButton from '../components/AppButton'

// Screen Imports
import UserProfileScreen from '../screens/ProfileStack/UserProfileScreen';
import UpdateProfileScreen from '../screens/ProfileStack/UpdateProfileScreen';
// import { Button } from 'react-native-paper';
import FirmManageScreen from '../screens/ProfileStack/FirmManageScreen';
import OtherUserProfile from '../screens/ProfileStack/OtherUserProfile';
import FirmUpdateScreen from '../screens/ProfileStack/FirmUpdateScreen';

const Stack = createStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator initialRouteName="User Profile">
      <Stack.Screen
        name="User Profile"
        component={UserProfileScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Other User"
        component={OtherUserProfile}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Edit Profile"
        component={UpdateProfileScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Firm Details"
        component={FirmManageScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Update Firm"
        component={FirmUpdateScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;
