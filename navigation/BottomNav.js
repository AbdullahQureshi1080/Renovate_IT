import React from 'react';
import { View, Text, StyleSheet,} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {MaterialCommunityIcons} from 'react-native-vector-icons/MaterialCommunityIcons';
import AppStackNav from './AppStackNav';

const Tab = createBottomTabNavigator();

const BottomNav = () =>{
    return (
      <Tab.Navigator
        initialRouteName="Home"
        tabBarOptions={{
            activeTintColor: '#e91e63',
          }}
    >
        <Tab.Screen 
        name="Home" 
        component={AppStackNav} 
        options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
        name="Names"
        component={Names}
        options={{
          tabBarLabel: 'Updates',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bell" color={color} size={size} />
          ),
          tabBarBadge: 3,
        }}
      />
      </Tab.Navigator>
    );
  }

 const Names = () =>{   
  return (
    <View style={styles.container}>
      <Text>BT2</Text>
    </View>
  );
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
  });
  
  
  export default BottomNav;