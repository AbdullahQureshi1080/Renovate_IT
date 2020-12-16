// Native Imports
import 'react-native-gesture-handler';
import React from 'react';
import {View, Text, ScrollView,Dimensions} from 'react-native';

// Components Imports
import ProfessionalAvator from '../../components/ProfessionalAvatar';
import LocationBar from '../../components/LocationBar';
import CategoryCard from '../../components/Card/CategoryCard';

// Styles Imports
import ScreenStyles from '../../styles/ScreenStyles'

      

const profileAvatar = {
   border:"none",
   marginVertical:15,
   nameText : {
       fontSize : 16,
       marginTop : 5,
       fontWeight:"bold",
       color:"#495464",
       fontFamily: 'Poppins-Bold',
   },
   titleText : {
       fontSize : 14,
       fontWeight:"normal",
       color:"#495464",
       width:Dimensions.get('window').width/3,
       fontFamily: 'Poppins-Medium',
   }
 }

   const Professionals = ({navigation}) =>{
    return( 
    <ScrollView style={ScreenStyles.professionalsScreen}>
      <Text style = {ScreenStyles.professionalsScreen.headTitle}>Top Professionals</Text>
      <View style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
         <ProfessionalAvator name = "Abdul Karim" title = "Interior Designer" style={profileAvatar} size={90}/>
         <ProfessionalAvator name = "Danish Baba" title = "Renovator" style={profileAvatar}  size={90} />
         <ProfessionalAvator name = "Baig Sahab"  title = "Builder" style={profileAvatar}  size={90}/>
      </View>
      <Text style = {ScreenStyles.professionalsScreen.headTitle}>Select By Category</Text>
      {/* <LocationBar/> */}
      <View>
      <View style={ScreenStyles.professionalsScreen.viewBox}>
            <View style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
               <CategoryCard title = "Interior Designer" source = {require('../../assets/interior-design.jpg')} onPress={(props)=>navigation.navigate('All Professionals',{title:"Interior Designer"})}/>      
               <CategoryCard title = "Architect" source = {require('../../assets/architecture.jpg')} onPress={(props)=>navigation.navigate('All Professionals',{title:"Architect"})}/>
            </View>
            <View style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
               <CategoryCard title = "Renovators" source = {require('../../assets/renovation.jpg')} onPress={(props)=>navigation.navigate('All Professionals',{title:"Renovators"})}/>
               <CategoryCard title = "Builders" source = {require('../../assets/builder.jpg')} onPress={(props)=>navigation.navigate('All Professionals',{title:"Builders"})}/>
            </View>
            <View style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
               <CategoryCard title = "Suppliers" source = {require('../../assets/supplier.jpg')} onPress={(props)=>navigation.navigate('All Professionals',{title:"Suppliers"})}/>
            </View>
      </View>
      </View>
   </ScrollView>
    )} 

export default Professionals;