// Native Imports
import 'react-native-gesture-handler';
import React,{useState,useEffect} from 'react';
import {DefaultTheme,NavigationContainer } from '@react-navigation/native'; 

// Navigation Imports
import BottomNav from './BottomNavigator';
import AppStack from './AppStack';

// Auth Imports
import AuthContext from '../auth/context';
import authStorage from '../auth/storage';

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
  const [user,setUser] = useState();

  const restoreUser = async()=>{
    const user = await authStorage.getUser();
    if(user) setUser(user);
  }

  useEffect(() => {
    restoreUser();
  }, [])

    return(
      <AuthContext.Provider value={{user,setUser}}>
           <NavigationContainer theme = {MyTheme}>
           {user?  <BottomNav/> : <AppStack/> }
           {/* <AppStack/> */}
        </NavigationContainer>
      </AuthContext.Provider>
    );
};

export default ContainerNav;