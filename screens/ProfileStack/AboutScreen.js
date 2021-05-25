// Native Imports
import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

// Components Import
import AppButton from '../../components/AppButton';
import AppText from '../../components/AppText';
import InfoCard from '../../components/Card/InfoCard';
// Styles Imports
import ScreenStyles from '../../styles/ScreenStyles';
import {useIsFocused} from '@react-navigation/native';


const AboutUser = ({navigation, route}) => {
  const state = useSelector((state) => state);
  const [userProfile, setUserProfile] = useState(route.params);


  useEffect(() => {
    setUserProfile(route.params);
  }, [userProfile]);

  return (
    <View>
      {userProfile.profileStatus == 'Normal' ? (
        <View
          style={{
            flex: 1,
            height: 400,
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            // backgroundColor: 'red',
          }}
        >
          <AppText style={{fontSize: 14}}> No Profile Data </AppText>
        </View>
      ) : userProfile?.hasOwnProperty('about') &&
        userProfile.about &&
        userProfile.location &&
        userProfile.jobtitle !== null ? (
        <View>
          <View style={ScreenStyles.userprofileScreen.userAbout}>
            <AppText
              style={ScreenStyles.userprofileScreen.userAbout.userAboutTitle}
            >
              Location
            </AppText>
            <AppText
              style={ScreenStyles.userprofileScreen.userAbout.userAboutText}
            >
              {userProfile.location}
            </AppText>
          </View>
          <View style={ScreenStyles.userprofileScreen.userAbout}>
            <AppText
              style={ScreenStyles.userprofileScreen.userAbout.userAboutTitle}
            >
              Job Title
            </AppText>
            <AppText
              style={ScreenStyles.userprofileScreen.userAbout.userAboutText}
            >
              {userProfile.jobtitle}
            </AppText>
          </View>
          <View style={ScreenStyles.userprofileScreen.userAbout}>
            <AppText
              style={ScreenStyles.userprofileScreen.userAbout.userAboutTitle}
            >
              About
            </AppText>
            <AppText
              style={ScreenStyles.userprofileScreen.userAbout.userAboutText}
            >
              {userProfile.about}
            </AppText>
          </View>
        </View>
      ) : (
        <View style={styles.notSetContainer}>
          {/* {userProfile.profileStatus == 'Normal' ? (
            <AppText style={{fontSize: 14}}> No Profile </AppText>
          ) : ( */}
          <>
            <AppText style={{fontSize: 14}}> Set up your profile </AppText>
            <AppText style={{fontSize: 14}}>
              {' '}
              Let people know what you do !{' '}
            </AppText>
            <AppButton
              name="Set Profile"
              style={styles.button}
              onPress={() =>
                navigation.navigate('Edit Profile', {profile: userProfile})
              }
            />
          </>
          {/* )} */}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  // button:{
  //     width:"100%",
  // }
  notSetContainer: {
    flexDirection: 'column',
    alignSelf: 'center',
    alignItems: 'center',
    marginVertical: 20,
    justifyContent: 'center',
    alignContent: 'center',
    width: '70%',
    // backgroundColor:"red",
  },
});

export default AboutUser;
