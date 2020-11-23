import 'react-native-gesture-handler';
import React from 'react';
import {DefaultTheme,NavigationContainer } from '@react-navigation/native'; 
import BottomNav from './BottomNavigator';


const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#F4F4F2',
      primary:"#222831",
      text:"#495464",
    },
  };

const ContainerNav = () =>{
    return(
        <NavigationContainer theme = {MyTheme}>
           <BottomNav />
        </NavigationContainer>
    );
};

export default ContainerNav;