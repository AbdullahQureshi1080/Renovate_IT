// Native Imports 
import React from 'react';
import { View , Text, ScrollView,StyleSheet} from 'react-native'
import {useSelector} from "react-redux";
// import Entypo from 'react-native-vector-icons/Entypo';

// Components Import 
// import InfoCard from '../../components/Card/InfoCard';
import AppButton from '../../components/AppButton';

// Styles Imports
import ScreenStyles from '../../styles/ScreenStyles'
import AppText from '../../components/AppText';


const AboutUser = ({navigation}) =>{
    const state =useSelector((state)=>state);
    const profile = state.entities.user.profile;
    console.log(profile);
    return(
        <ScrollView>
            {/* <View style={{flex:1, flexDirection:"row", justifyContent:"space-between"}}>
                <InfoCard subtitle="Thumb-Ups" value={300} />
                <InfoCard subtitle="Following" value={50} />
                <InfoCard subtitle="Followers" value={10} />
            </View> */}
            {/* ["about","jobtitle","location"] */}
            {( profile.hasOwnProperty( "about") && (profile.about && profile.location && profile.jobtitle !== null))?(
                <View>
                <View style = {ScreenStyles.userprofileScreen.userAbout}>
                    <AppText style = {ScreenStyles.userprofileScreen.userAbout.userAboutTitle}>Location</AppText>
                    <AppText style = {ScreenStyles.userprofileScreen.userAbout.userAboutText}>
                        {/* <Entypo name="location-pin" size={18}/> */}
                        {profile.location}
                        </AppText>
                </View>
                <View style = {ScreenStyles.userprofileScreen.userAbout}>
                    <AppText style = {ScreenStyles.userprofileScreen.userAbout.userAboutTitle}>Job Title</AppText>
                    <AppText style = {ScreenStyles.userprofileScreen.userAbout.userAboutText}>{profile.jobtitle}</AppText>
                </View>
                <View style = {ScreenStyles.userprofileScreen.userAbout}>
                    <AppText style = {ScreenStyles.userprofileScreen.userAbout.userAboutTitle}>About</AppText>
                    <AppText style = {ScreenStyles.userprofileScreen.userAbout.userAboutText}>{profile.about}</AppText>
                </View>
            </View>
            ):(
                <View style={styles.notSetContainer }>
                    <AppText style={{fontSize:14,}}> Set up your profile </AppText>
                    <AppText style={{fontSize:14,}}> Let people know what you do ! </AppText>
                    <AppButton name= "Set Profile" style={styles.button}  onPress={()=>navigation.navigate("Edit Profile",{profile:profile})}/>
                </View>
            )}
            
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    // button:{
    //     width:"100%",
    // }
    notSetContainer:{
        flexDirection:"column",
        alignSelf:"center",
        alignItems:"center",
        marginVertical:20,
        justifyContent:"center",
        alignContent:"center",
        width:"70%",
        // backgroundColor:"red",
    }
})

export default AboutUser;
