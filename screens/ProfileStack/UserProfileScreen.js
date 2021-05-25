// Native Imports
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  Text,
  ScrollView,
  Image,
  ImageBackground,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import {Button, List} from 'react-native-paper';
import MaterialComunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useFocusEffect} from '@react-navigation/native';

// Styles Imports
import ScreenStyles from '../../styles/ScreenStyles';

// Components
import ProfessionalAvator from '../../components/ProfessionalAvatar';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import TabNavigatorStyle from '../../styles/TabNavigatorStyle';

// Auth and Api Imports
import useAuth from '../../auth/useAuth';
import useApi from '../../hooks/useApi';
import userAPI from '../../api/user';

// Screen Imports
// import UserProjectsScreen from './UserProjectsScreen';
// import UserPostsScreen from './UserPostsScreen';
import AboutUser from './AboutScreen';
import RemoteFirmScreen from './RemoteFirmScreen';

// import { useEffect } from 'react';
import {setUserData} from '../../store/auth';
import {setProfileData} from '../../store/user';
import AppText from '../../components/AppText';
import UserProjects from './UserProjects';

const Tab = createMaterialTopTabNavigator();

const display = () => {
  return (
    <View>
      <Text>Somthing to Display</Text>
    </View>
  );
};

const UserProfileScreen = ({navigation, route}) => {
  const state = useSelector((state) => state);
  const userId = state.entities.auth.data._id;
  // const profile = state.entities.user.profile;
  const [userProfile, setUserProfile] = useState(null);
  const [checkId, setCheckId] = useState(false);

  const profileApi = useApi(userAPI.userProfile);
  const profileId = route.params._id;

  const fetchUserProfile = async () => {
    const result = await profileApi.request(profileId);
    if (result == {}) {
      console.log('Error Fetching Profile');
    }
    console.log('Profile from Api', result);
    setUserProfile(result);
  };

  // useEffect(() => {
  //   fetchUserProfile();

  //   if (profileId == userId) {
  //     setCheckId(false);
  //     // dispatch(setProfileData(userProfile));
  //   } else {
  //     if (profileId !== userId) {
  //       setCheckId(true);
  //       // dispatch(setProfileData(userProfile));
  //     }
  //   }
  // }, [profileId]);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      //   alert('Screen was focused');
      // Do something when the screen is focused
      fetchUserProfile();
      if (profileId == userId) {
        setCheckId(false);
      } else {
        if (profileId !== userId) {
          setCheckId(true);
        }
      }
      return () => {
        // alert('Screen was unfocused');
        // Do something when the screen is unfocused
        // Useful for cleanup functions
        setUserProfile(null);
      };
    }, []),
  );

  const getImageUri = () => {
    if (userProfile) {
      return userProfile.image;
    } else {
      return false;
    }
  };

  const imgUri = getImageUri();
  const {logOut} = useAuth(navigation);
  // console.log(imgUri);

  if (userProfile === null) {
    return <View />;
  }
  return (
    <ScrollView style={ScreenStyles.userprofileScreen}>
      {!checkId ? (
        <View style={{marginHorizontal: 0}}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Button
              icon={() => (
                <MaterialComunityIcons
                  name="logout"
                  size={30}
                  color="#1B262C"
                />
              )}
              onPress={logOut}
            />
            <Button
              icon={() => (
                <MaterialComunityIcons
                  name="account-edit"
                  size={30}
                  color="#1B262C"
                />
              )}
              onPress={() =>
                navigation.navigate('Edit Profile', {profile: userProfile})
              }
            />
          </View>
        </View>
      ) : (
        <View />
      )}
      <View>
        <ProfessionalAvator
          imageUri={imgUri}
          name={
            userProfile.firstname == undefined &&
            userProfile.lastname == undefined
              ? userProfile.name
              : `${userProfile.firstname} ${userProfile.lastname}`
          }
          title={userProfile.jobtitle}
          email={userProfile.email}
          style={profileAvatar}
          disabled={true}
          size={90}
          placeholdertext={'Update profile to set title'}
        />
      </View>
      <View>
        <Tab.Navigator tabBarOptions={TabNavigatorStyle.userProfileTab}>
          <Tab.Screen
            name="About"
            component={AboutUser}
            initialParams={userProfile}
          />
          <Tab.Screen
            name="Projects"
            component={UserProjects}
            initialParams={userProfile}
          />
          <Tab.Screen name="Remote Firm" component={RemoteFirmScreen} />
          <Tab.Screen name="Design a room" component={display} />
        </Tab.Navigator>
      </View>
    </ScrollView>
  );
};

const profileAvatar = {
  border: 'none',
  marginVertical: 15,
  alignItems: 'center',
  nameText: {
    fontSize: 18,
    marginTop: 5,
    color: '#495464',
    fontFamily: 'Poppins-Bold',
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#495464',
    fontFamily: 'Poppins-Medium',
  },
};

export default UserProfileScreen;
