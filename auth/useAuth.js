// import { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
// import AuthContext from "./context";
import authStorage from "./storage";
import jwtDecode from "jwt-decode";
import { assignUserData,logout, setUserData} from "../store/auth";
export default useAuth = (navigation) => {
  const dispatch = useDispatch();
  //   Redux Store - State
  // const { user, setUser } = useSelector((state) => state);
  // const userState = useSelector((state) => state);
  const logIn = (authToken) => {
    const userData = jwtDecode(authToken);
    dispatch(setUserData(userData));
    authStorage.storeToken(authToken);
  };
  const logOut = () => {
    authStorage.removeToken();
    dispatch(logout());
    navigation.navigate("Login");
  };
  return { logOut, logIn };
};
