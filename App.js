/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */


import 'react-native-gesture-handler';
import React from 'react';
import { configureFonts, DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import ContainerNav from './navigation/ContainerNav';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';



const fontConfig = {
  default: {
    regular: {
      fontFamily: 'Poppins-Medium',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Poppins-Bold',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'Poppins-Regular',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'Poppins-Light',
      fontWeight: 'normal',
    },
  },
}

const theme = {
  ...DefaultTheme,
  fonts: configureFonts(fontConfig),
  colors:{
  ...DefaultTheme.colors, 
  primary: '#f4f4f2', 
  accent: '#495464',
  background:'#f4f4f2',
  surface:'#495464',
  text:'#495464',
}
};


const App = () => {
  return (
    <PaperProvider theme={theme}
    >
     <ContainerNav />
    </PaperProvider>
  );
};

export default App;
