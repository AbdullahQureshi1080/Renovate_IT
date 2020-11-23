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
      fontFamily: 'poppins-medium',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'poppins-bold',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'poppins-regular',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'poppins-light',
      fontWeight: 'normal',
    },
  },
}

const theme = {
  ...DefaultTheme,
  fonts: configureFonts(fontConfig),
  ...DefaultTheme.colors, 
  primary: '#f4f4f2', 
  accent: '#495464',
  background:'#f4f4f2',
  surface:'#495464',
  text:'#222831',
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
