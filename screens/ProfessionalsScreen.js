import 'react-native-gesture-handler';
import React from 'react';
import {View, Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ScreenStyles from '../styles/ScreenStyles'
import ProfessionalAvator from '../components/ProfessionalAvatar';
import LocationBar from '../components/LocationBar';
   const Professionals = () =>{
    return( 
    <View style={ScreenStyles.professionalsScreen}>
         <Text style = {ScreenStyles.professionalsScreen.headTitle}>Top Professionals</Text>
         <View style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
            <ProfessionalAvator name = "Abdul Karim" />
            <ProfessionalAvator name = "Danish Baba"/>
            <ProfessionalAvator name = "Baig Sahab"/>
         </View>
         <Text style = {ScreenStyles.professionalsScreen.headTitle}>Select By Category</Text>
         <LocationBar/>
     </View>
    )} 

export default Professionals;