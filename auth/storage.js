import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
const key = "auth-token";

const storeToken = async (authToken) => {
  try {
    await AsyncStorage.setItem(key, authToken);
  } catch (err) {
    console.log("Error storing the auth Token", err);
  }
};

const getToken = async () => {
  try {
    authToken = await AsyncStorage.getItem(key);
    // return JSON.parse(authToken);
    return authToken;
  } catch (err) {
    console.log("Error getting the auth Token", err);
  }
};

const removeToken = async () => {
  try {
    await AsyncStorage.removeItem(key);
    console.log("Token Removed");
  } catch (err) {
    console.log("Error removing the auth Token", err);
  }
};

const getUser = async () => {
  const token = await getToken();
  return token ? jwtDecode(token) : null;
};

export default {
  getToken,
  getUser,
  removeToken,
  storeToken,
};
