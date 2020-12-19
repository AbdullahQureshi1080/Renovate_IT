// Native Imports 
import React from 'react';
import { View , Text, ScrollView} from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo';

// Components Import 
import InfoCard from '../../components/Card/InfoCard';

// Styles Imports
import ScreenStyles from '../../styles/ScreenStyles'


const AboutUser = () =>{
    
    return(
        <ScrollView>
            <View style={{flex:1, flexDirection:"row", justifyContent:"space-between"}}>
                <InfoCard subtitle="Thumb-Ups" value={300} />
                <InfoCard subtitle="Following" value={50} />
                <InfoCard subtitle="Followers" value={10} />
            </View>
            <View>
                <View style = {ScreenStyles.userprofileScreen.userAbout}>
                    <Text style = {ScreenStyles.userprofileScreen.userAbout.userAboutTitle}>Location</Text>
                    <Text><Entypo name="location-pin" size={18}/>Location</Text>
                </View>
                <View style = {ScreenStyles.userprofileScreen.userAbout}>
                    <Text style = {ScreenStyles.userprofileScreen.userAbout.userAboutTitle}>Job Title</Text>
                    <Text>Job Title</Text>
                </View>
                <View style = {ScreenStyles.userprofileScreen.userAbout}>
                    <Text style = {ScreenStyles.userprofileScreen.userAbout.userAboutTitle}>About</Text>
                    <Text>About</Text>
                </View>
            </View>
        </ScrollView>
    );
}

export default AboutUser;
