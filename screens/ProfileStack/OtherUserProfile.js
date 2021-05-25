// Native Imports
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, Text, ScrollView} from 'react-native';
import {Button, List} from 'react-native-paper';
import MaterialComunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useFocusEffect} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

// Styles Imports
import ScreenStyles from '../../styles/ScreenStyles';

// Components
import ProfessionalAvator from '../../components/ProfessionalAvatar';
import TabNavigatorStyle from '../../styles/TabNavigatorStyle';

// Auth and Api Imports
import useAuth from '../../auth/useAuth';
import useApi from '../../hooks/useApi';
import userAPI from '../../api/user';

// Screen Imports
// import UserProjectsScreen from './UserProjectsScreen';
// import UserPostsScreen from './UserPostsScreen';
import AboutUser from './AboutScreen';
// import AppText from '../../components/AppText';
import UserProjects from './UserProjects';

const Tab = createMaterialTopTabNavigator();

// const UserProjects = ({route}) => {
//   const userEmail = route.params._id;
//   return (
//     <View style={{flex: 1, marginVertical: 10}}>
//       <View style={{flex: 1}}>
//         <AppText style={{fontFamily: 'Poppins-Medium', fontSize: 18}}>
//           Projects
//         </AppText>
//         <UserProjectsScreen email={userEmail} />
//       </View>
//       <View style={{flex: 1}}>
//         <AppText style={{fontFamily: 'Poppins-Medium', fontSize: 18}}>
//           Posts
//         </AppText>
//         <UserPostsScreen email={userEmail} />
//       </View>
//     </View>
//     // <Tab.Navigator tabBarOptions={TabNavigatorStyle.userProjectsTab}>
//     //   <Tab.Screen name="Projects" component={UserProjectsScreen} />
//     //   <Tab.Screen name="Posts" component={UserPostsScreen} />
//     // </Tab.Navigator>
//   );
// };

const display = () => {
  return (
    <View>
      <Text>Somthing to Display</Text>
    </View>
  );
};

const OtherUserProfile = ({navigation, route}) => {
  // const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const userId = state.entities.auth.data._id;
  const [userProfile, setUserProfile] = useState(null);
  const [checkId, setCheckId] = useState(false);

  const profileApi = useApi(userAPI.userProfile);
  const profileId = route.params._id;
  const otherProfile = route.params.user._id;

  const fetchUserProfile = async () => {
    const result = await profileApi.request(profileId);
    if (result == {}) {
      console.log('Error Fetching Profile');
    }
    console.log('Profile from Api', result);
    setUserProfile(result);
    // dispatch(setProfileData(result));
  };

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

  if (userProfile._id !== otherProfile) {
    setUserProfile(route.params.user);
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
        <Tab.Navigator tabBarOptions={TabNavigatorStyle.otherUserProfileTab}>
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

export default OtherUserProfile;
