// Native Imports
import 'react-native-gesture-handler';
import React,{useState,useEffect,useRef} from 'react';
import {DefaultTheme,NavigationContainer } from '@react-navigation/native'; 
// import { NavigationActions } from 'react-navigation';

// Navigation Imports
// import BottomNavigation from './BottomNavigation';
import AppStack from './AppStack';
// import { useSelector } from 'react-redux';

// Auth Imports
// import AuthContext from '../auth/context';
// import authStorage from '../auth/storage';

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


// const ContainerNavigation = () =>{
//   const [user,setUser] = useState();

//   const restoreUser = async()=>{
//     const user = await authStorage.getUser();
//     if(user) setUser(user);
//   }

//   useEffect(() => {
//     restoreUser();
//   }, [])

//     return(
//       // <AuthContext.Provider value={{user,setUser}}>
//            <NavigationContainer theme = {MyTheme}>
//            {user?  <BottomNavigation/> : <AppStack/> }
//            {/* <AppStack/> */}
//         </NavigationContainer>
//       // </AuthContext.Provider>
//     );
// };

const ContainerNavigation = ({navigation}) =>{
    return(
           <NavigationContainer theme = {MyTheme}>
           {/* {user?  <BottomNav/> : <AppStack/> } */}
           <AppStack/>
        </NavigationContainer>
    );
};

export default ContainerNavigation;