import 'react-native-gesture-handler';
import React from 'react';
import { View,Text,ScrollView,Image, ImageBackground, Dimensions} from 'react-native';
import { Button,List,TextInput } from 'react-native-paper';
import ScreenStyles from '../styles/ScreenStyles'
import InputText from '../components/TextInput';
import ProfessionalAvatar from '../components/ProfessionalAvatar';
import ComponentsStyle from '../styles/ComponentsStyle';


const ProfileEditScreen=()=>{
    return(
        <ScrollView style={ScreenStyles.profileEditScreen}>
            <View style={ScreenStyles.profileEditScreen.inputView}>
                <ProfessionalAvatar style = {profileAvatar} size = {120}/>
                <Button style={{backgroundColor:"#495464", alignSelf:"center",width:Dimensions.get('window').width/2, marginHorizontal:10}} color = "#F4F4F2">Upload Picture</Button>
            </View>
            <View style={ScreenStyles.profileEditScreen.inputView}>
            <Text style={ScreenStyles.profileEditScreen.textLabel}>First Name</Text>
            <InputText  style={ComponentsStyle.inputStyle} textColor="#1b262c" selectionColor = "#1b262c" placeholder="First Name"  />
            </View>
            <View style={ScreenStyles.profileEditScreen.inputView}>
            <Text style={ScreenStyles.profileEditScreen.textLabel}>Last Name</Text>
            <InputText  style={ComponentsStyle.inputStyle} textColor="#1b262c" selectionColor = "#1b262c" placeholder="Last Name"/>
            </View>
            <View style={ScreenStyles.profileEditScreen.inputView}>
            <Text style={ScreenStyles.profileEditScreen.textLabel}>Job Title</Text>
            <InputText  style={ComponentsStyle.inputStyle} textColor="#1b262c" selectionColor = "#1b262c" placeholder="Job Title"/>
            </View>
            <View style={ScreenStyles.profileEditScreen.inputView}>
            <Text style={ScreenStyles.profileEditScreen.textLabel}>Location</Text>
            <InputText  style={ComponentsStyle.inputStyle} textColor="#1b262c" selectionColor = "#1b262c" placeholder="Location"/>
            </View>
            <View style={ScreenStyles.profileEditScreen.inputView}>
            <Text style={ScreenStyles.profileEditScreen.textLabel}>About</Text>
            <InputText  style={ComponentsStyle.inputStyle} textColor="#1b262c" selectionColor = "#1b262c" placeholder="About" multiline={true}/>
            </View>
        </ScrollView>
    );
}

const profileAvatar = {
    border:"none",
    marginTop:15,
    alignItems: 'center',
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
