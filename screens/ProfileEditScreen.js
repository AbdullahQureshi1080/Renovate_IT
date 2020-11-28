import 'react-native-gesture-handler';
import React from 'react';
import { View,Text,ScrollView,Image, ImageBackground, Dimensions} from 'react-native';
import { Button,List,TextInput } from 'react-native-paper';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import MaterialComunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import Entypo from 'react-native-vector-icons/Entypo';
import ScreenStyles from '../styles/ScreenStyles'
import InputText from '../components/TextInput';
import ProfessionalAvatar from '../components/ProfessionalAvatar';
// import ProfessionalAvator from '../components/ProfessionalAvatar';
// import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
// import TabNavigatorStyle from '../styles/TabNavigatorStyle';
// import InfoCard from '../components/InfoCard';

const ProfileEditScreen=()=>{
    return(
        <ScrollView style={ScreenStyles.profileEditScreen}>
            <View style={ScreenStyles.profileEditScreen.inputView}>
                <ProfessionalAvatar style = {profileAvatar} size = {120}/>
                <Button style={{backgroundColor:"#495464", alignSelf:"center",width:Dimensions.get('window').width/2, marginHorizontal:10}} color = "#F4F4F2">Upload Picture</Button>
            </View>
            <View style={ScreenStyles.profileEditScreen.inputView}>
            <Text style={ScreenStyles.profileEditScreen.textLabel}>First Name</Text>
            <InputText placeholder="First Name" />
            </View>
            <View style={ScreenStyles.profileEditScreen.inputView}>
            <Text style={ScreenStyles.profileEditScreen.textLabel}>Last Name</Text>
            <InputText placeholder="Last Name"/>
            </View>
            <View style={ScreenStyles.profileEditScreen.inputView}>
            <Text style={ScreenStyles.profileEditScreen.textLabel}>Job Title</Text>
            <InputText placeholder="Job Title"/>
            </View>
            <View style={ScreenStyles.profileEditScreen.inputView}>
            <Text style={ScreenStyles.profileEditScreen.textLabel}>Location</Text>
            <InputText placeholder="Location"/>
            </View>
            <View style={ScreenStyles.profileEditScreen.inputView}>
            <Text style={ScreenStyles.profileEditScreen.textLabel}>About</Text>
            <InputText placeholder="About" multiline={true}/>
            </View>
        </ScrollView>
    );
}

const profileAvatar = {
    border:"none",
    marginTop:15,
    alignItems: 'center',
    // marginBottom: ,
    nameText : {
        fontSize : 16,
        marginTop : 5,
        fontWeight:"bold",
        color:"#495464",
    },
    titleText : {
        fontSize : 14,
        fontWeight:"normal",
        color:"#495464",
    }
}

export default ProfileEditScreen;
