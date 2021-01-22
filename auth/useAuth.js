// import { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
// import AuthContext from "./context";
import authStorage from "./storage";
import jwtDecode from "jwt-decode";
import { assignUserData,logout} from "../store/auth";
export default useAuth = (navigation) => {
    // const {user,setUser} = useContext(AuthContext);
  const dispatch = useDispatch();
  //   Redux Store - State
  // const { user, setUser } = useSelector((state) => state);
  // const userState = useSelector((state) => state);

  // const authToken = userState.entities.auth.token;
  const logIn = (authToken) => {
    // console.log(authToken);
    // console.log("Time not complete");
    // if (authToken === userState.entities.auth.token)
    const userData = jwtDecode(authToken);
    // console.log(userData);
    dispatch(assignUserData(userData));
    // console.log(user);
    // setUser(userData);
    authStorage.storeToken(authToken);
  };
  const logOut = () => {
    // setUser(null);
    authStorage.removeToken();
    dispatch(logout());
    navigation.navigate("Login");
    // console.log("token Removed");
  };
  return { logOut, logIn };
};
