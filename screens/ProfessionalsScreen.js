import 'react-native-gesture-handler';
import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ScreenStyles from '../styles/ScreenStyles'
import ProfessionalAvator from '../components/ProfessionalAvatar';
import LocationBar from '../components/LocationBar';
import CategoryCard from '../components/CategoryCard';
      

   const Professionals = ({navigation}) =>{
    return( 
    <ScrollView style={ScreenStyles.professionalsScreen}>
      <Text style = {ScreenStyles.professionalsScreen.headTitle}>Top Professionals</Text>
      <View style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
         <ProfessionalAvator name = "Abdul Karim" title = "Interior Designer" />
         <ProfessionalAvator name = "Danish Baba" title = "Renovator" />
         <ProfessionalAvator name = "Baig Sahab"  title = "Builder" />
      </View>
      <Text style = {ScreenStyles.professionalsScreen.headTitle}>Select By Category</Text>
      <LocationBar location = "Islamabad,Pakistan"/>
      <View>
         {/* <CategoryCards onPress={(props)=>navigation.navigate('All Professionals',{title:props.title})}/> */}
      <View style={ScreenStyles.professionalsScreen.viewBox}>
            <View style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
               <CategoryCard title = "Interior Designer" onPress={(props)=>navigation.navigate('All Professionals',{title:"Interior Designer"})}/>      
               <CategoryCard title = "Architect" onPress={(props)=>navigation.navigate('All Professionals',{title:"Architect"})}/>
            </View>
            <View style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
               <CategoryCard title = "Renovators" onPress={(props)=>navigation.navigate('All Professionals',{title:"Renovators"})}/>
               <CategoryCard title = "Builders" onPress={(props)=>navigation.navigate('All Professionals',{title:"Builders"})}/>
            </View>
            <View style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
               <CategoryCard title = "Suppliers" onPress={(props)=>navigation.navigate('All Professionals',{title:"Suppliers"})}/>
            </View>
      </View>
      </View>
   </ScrollView>
    )} 

export default Professionals;