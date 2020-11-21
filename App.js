/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */


import 'react-native-gesture-handler';
import React from 'react';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import ContainerNav from './navigation/ContainerNav';


const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors, 
    primary: '#f4f4f2', 
    accent: '#495464',
    background:'#495464',
    surface:'#495464',
    text:'#bbbfca',},
};


const App = () => {
  return (
    <PaperProvider theme={theme}>
     <ContainerNav />
   </PaperProvider>
  );
};

export default App;
