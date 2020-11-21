import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer } from '@react-navigation/native'; 
// import BottomNav from './BottomNav'
import AppStackNav from './AppStackNav';

const ContainerNav = () =>{
    return(
        <NavigationContainer>
           <AppStackNav />
        </NavigationContainer>
    );
};

export default ContainerNav;