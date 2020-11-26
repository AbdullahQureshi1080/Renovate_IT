import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
// import { View,TouchableOpacity,StyleSheet} from 'react-native';


import UserProfileScreen from '../screens/UserProfileScreen';

const Stack = createStackNavigator();

const ProfileStack = () => {
    return(
        <Stack.Navigator initialRouteName="User Profile">
            <Stack.Screen name="User Profile" component={UserProfileScreen} options={{
                headerShown:false,
            }} />
        </Stack.Navigator>
    );
}

export default ProfileStack;