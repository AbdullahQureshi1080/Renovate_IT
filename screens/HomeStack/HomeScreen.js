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

const HomeScreen = ({navigation, route}) => {
  return <HomeNavigator />;
};

export default HomeScreen;
