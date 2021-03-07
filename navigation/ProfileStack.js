// Native Imports
import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View,TouchableOpacity,StyleSheet} from 'react-native';
import AppButton from '../components/AppButton'

// Screen Imports
import UserProfileScreen from '../screens/ProfileStack/UserProfileScreen';
import UpdateProfileScreen from '../screens/ProfileStack/UpdateProfileScreen';
import { Button } from 'react-native-paper';

const Stack = createStackNavigator();

const ProfileStack = () => {
    return(
        <Stack.Navigator initialRouteName="User Profile">
            <Stack.Screen name="User Profile" component={UserProfileScreen} options={{
                headerShown:false,
            }} />
            <Stack.Screen name="Edit Profile" component={UpdateProfileScreen} options={{
                headerShown:false,
            }} />
        </Stack.Navigator>
    );
}

export default ProfileStack;