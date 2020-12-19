import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
const key = "auth-token";

const storeToken = async authToken =>{
    try{
        await AsyncStorage.setItem(key,authToken);
    }catch(err){
        console.log('Error storing the auth Token', err)
    }
}

const getToken = async () =>{
    try{
       return authToken =  await AsyncStorage.getItem(key);
    }catch(err){
        console.log('Error getting the auth Token', err)
    }
}

const removeToken = async () =>{
    try{
        await AsyncStorage.removeItem(key);
    }catch(err){
        console.log('Error removing the auth Token', err)
    }
}

const getUser = async () =>{
        const token = await getToken();
        return (token) ? jwtDecode(token): null;
}

export default {
    getUser,
    removeToken,
    storeToken
}