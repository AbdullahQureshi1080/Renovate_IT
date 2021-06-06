// Native Imports
import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setUserPosts, setUserProjects} from '../../store/user';

// Components Imports
import HomeNavigator from '../../navigation/HomeNavigator';

// Api Imports
// import useApi from '../../hooks/useApi';
// import userAPI from '../../api/user';
// import {MenuProvider} from 'react-native-popup-menu';

import messaging from '@react-native-firebase/messaging';
// import firestore from '@react-native-firebase/firestore';
import {setNotificationToken} from '../../store/auth';

import {
  saveTokenToDatabase,
  saveNewTokenToDatabase,
  getAllTokens,
  getAllTokensExceptUser,
  getToken,
} from '../../api/notification';

const HomeScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.entities.auth.data._id);
  const notificationToken = useSelector(
    (state) => state.entities.auth.data.notificationToken,
  );
  useEffect(() => {
    // Get the device token
    messaging()
      .getToken()
      .then((token) => {
        saveNewTokenToDatabase(userId, token);
        return dispatch(setNotificationToken(token));
      });
    gettingTokens();

    // Listen to whether the token changes
    return messaging().onTokenRefresh((token) => {
      dispatch(setNotificationToken(userId, token));
      saveTokenToDatabase(token);
    });
  }, []);

  const gettingTokens = async () => {
    // const Alltokens = await getAllTokens();
    const specificTokens = await getAllTokensExceptUser(userId);
    // const userToken = await getToken(userId);
    // console.log('All Tokens', Alltokens);
    console.log('All Tokens Except User', specificTokens);
    // console.log('Specific User Token', userToken);
  };

  return <HomeNavigator />;
};

export default HomeScreen;
