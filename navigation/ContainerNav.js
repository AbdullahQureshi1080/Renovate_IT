import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer } from '@react-navigation/native'; 
import BottomNav from './BottomNavigator';

const ContainerNav = () =>{
    return(
        <NavigationContainer>
           <BottomNav />
        </NavigationContainer>
    );
};

export default ContainerNav;