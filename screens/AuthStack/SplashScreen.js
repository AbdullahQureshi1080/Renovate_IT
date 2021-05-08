// Native Imports
import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ImageBackground, StyleSheet, View} from 'react-native';

// Api Imports
import useApi from '../../hooks/useApi';
import userAPI from '../../api/user';
import dataAPI from '../../api/data';

// Component Imports
import ActivityIndicator from '../../components/ActivityIndicator';
import storage from '../../auth/storage';

// Redux-Store
import {loginUser, setUserData} from '../../store/auth';
import {
  setProfileData,
  setUserPosts,
  setUserPostIds,
  setUserProjectIds,
} from '../../store/user';
import {setAllUsers, setAppPosts, setAppProjects} from '../../store/data';

const SplashScreen = ({navigation}) => {
  const userApi = useApi(userAPI.userProfile);
  const appUsersApi = useApi(dataAPI.getAllUsers);
  // const appPostsApi = useApi(dataAPI.getAllPosts)
  // const appProjectsApi = useApi(dataAPI.getAllProjects)
  const userPostsApi = useApi(userAPI.userPosts);
  const userProjectsApi = useApi(userAPI.userProjects);
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  useEffect(() => {
    console.log(state);
    const tryLogin = async () => {
      const userToken = await storage.getToken();
      const userData = await storage.getUser();
      if (!userToken) {
        navigation.navigate('Login');
        return;
      }
      try {
        const email = userData.email;
        // console.log(email);
        const profileData = await userApi.request(email);
        const allUsersData = await appUsersApi.request(email);
        const userPostsIds = await userPostsApi.request(email);
        const userProjectsIds = await userProjectsApi.request(email);
        // const appPosts = await appPostsApi.request();
        // const appProjects = await appProjectsApi.request();
        // console.log(profileData);
        //  console.log(userPostsData)
        dispatch(loginUser(userToken));
        dispatch(setUserData(userData));
        dispatch(setProfileData(profileData));
        dispatch(setUserPostIds(userPostsIds));
        dispatch(setUserProjectIds(userProjectsIds));
        // dispatch(setAppPosts(appPosts.data))
        // dispatch(setAppProjects(appProjects.data))
        dispatch(setAllUsers(allUsersData.data));
        // console.log(state);
        navigation.reset({
          index: 0,
          routes: [{name: 'Home'}],
        });
        // navigation.navigate("Home");
      } catch (err) {
        console.log(err);
        // navigation.navigate("Login")
      }
    };
    tryLogin();
  }, []);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/splashscreen.jpg')}
        style={styles.image}
      >
        <View style={styles.child}></View>
        <ActivityIndicator visible={true} />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#000000',
    //   marginHorizontal:20,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  child: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    alignContent: 'center',
    // alignSelf:"center",
  },
  text: {
    color: 'white',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000a0',
  },
});
export default SplashScreen;
