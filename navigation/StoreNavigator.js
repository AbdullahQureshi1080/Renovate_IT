// Native Imports
import 'react-native-gesture-handler';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {StyleSheet, Dimensions} from 'react-native';

// Screen Imports
import ProjectsScreen from '../screens/HomeStack/ProjectsScreen';
import ProfessionalsScreen from '../screens/HomeStack/ProfessionalsScreen';
import StoreCategories from '../screens/StoreStack/StoreCategories';

// Styles Imports
// import TabNavigatorStyle from '../styles/TabNavigatorStyle';

const Tab = createMaterialTopTabNavigator();
const {width, height} = Dimensions.get('screen');

const StoreNavigator = ({navigation}) => {
  return (
    <Tab.Navigator
      initialRouteName="Store"
      screenOptions={{
        accessibilityRole: 'button',
      }}
      backBehavior="initialRoute"
      tabBarOptions={{
        activeTintColor: '#1B262C',
        inactiveTintColor: '#e2e2e2',
        pressColor: '#e8e8e8',
        style: styles.style,
        indicatorStyle: styles.indicatorStyle,
        labelStyle: styles.labelStyle,
      }}
    >
      <Tab.Screen
        name="Store"
        component={StoreCategories}
        navigation={navigation}
      />
      <Tab.Screen
        name="Orders"
        component={StoreCategories}
        navigation={navigation}
      />
      <Tab.Screen
        name="History"
        component={StoreCategories}
        navigation={navigation}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  style: {
    width: width,
    height: 55,
    alignSelf: 'center',
    // marginHorizontal: 20,
    // marginVertical: 5,
    // borderRadius: 30,
    justifyContent: 'center',
    // borderColor: '#ffffff',
    // backgroundColor: '#f2f2f2',
  },
  indicatorStyle: {
    height: '10%',
    backgroundColor: '#1B262C',
    borderRadius: 30,
  },
  labelStyle: {
    width: '100%',
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
  },
});

export default StoreNavigator;
