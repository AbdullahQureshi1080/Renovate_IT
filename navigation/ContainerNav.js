import 'react-native-gesture-handler';
import React from 'react';
import {DefaultTheme,NavigationContainer } from '@react-navigation/native'; 
import BottomNav from './BottomNavigator';
import AppStack from './AppStack';
// import AppStack from './AppStack';

const MyTheme = {
    ...DefaultTheme,
    dark:true,
    colors: {
      ...DefaultTheme.colors,
      background:'#F4F4F2',
      primary:"#30475E",
      text:"#495464",
    },
  };

const ContainerNav = () =>{
    return(
        <NavigationContainer theme = {MyTheme}>
           <AppStack/>
        </NavigationContainer>
    );
};

export default ContainerNav;