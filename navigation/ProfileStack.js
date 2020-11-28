import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View,TouchableOpacity,StyleSheet} from 'react-native';


import UserProfileScreen from '../screens/UserProfileScreen';
import ProfileEditScreen from '../screens/ProfileEditScreen';
import { Button } from 'react-native-paper';

const Stack = createStackNavigator();

const ProfileStack = () => {
    return(
        <Stack.Navigator initialRouteName="User Profile">
            <Stack.Screen name="User Profile" component={UserProfileScreen} options={{
                headerShown:false,
            }} />
            <Stack.Screen name="Edit Profile" component={ProfileEditScreen} options={{
                headerRight:  () => (  
                    <Button style={{backgroundColor:"#495464", marginHorizontal:10}} color = "#F4F4F2" onPress={()=>console.log("Pressed")}>Save</Button>
                )
            }} />
        </Stack.Navigator>
    );
}

export default ProfileStack;