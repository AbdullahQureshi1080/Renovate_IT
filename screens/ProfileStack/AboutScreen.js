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

// Api Imports
import useApi from '../../hooks/useApi';
import userAPI from '../../api/user';

const AboutUser = ({navigation, route}) => {
  const isFocused = useIsFocused();

  const state = useSelector((state) => state);
  // const profile = state.entities.user.profile;
  const [userProfile, setUserProfile] = useState(route.params);

  // useEffect(() => {
  //   console.log('Route Params', route.params);
  //   setUserProfile(route.params);
  // }, []);

  useEffect(() => {
    setUserProfile(route.params);
  }, [userProfile]);

  return (
    <View>
      {/* <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
        <InfoCard subtitle="Likes" value={300} />
        <InfoCard subtitle="Following" value={50} />
        <InfoCard subtitle="Followers" value={10} />
      </View> */}
      {/* ["about","jobtitle","location"] */}
      {userProfile?.hasOwnProperty('about') &&
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
