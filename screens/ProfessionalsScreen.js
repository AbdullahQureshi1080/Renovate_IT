import 'react-native-gesture-handler';
import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ScreenStyles from '../styles/ScreenStyles'
import ProfessionalAvator from '../components/ProfessionalAvatar';
import LocationBar from '../components/LocationBar';
import CategoryCard from '../components/CategoryCard';


const CategoryCards = (props) =>(
<View style={ScreenStyles.professionalsScreen.viewBox}>
      <View style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
       <CategoryCard title = "Interior Designer" onPress={props.onPress}/>
       <CategoryCard title = "Architect"/>
      </View>
      <View style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
       <CategoryCard title = "Renovators"/>
       <CategoryCard title = "Builders"/>
      </View>
      <View style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
       <CategoryCard title = "Suppliers"/>
      </View>
</View>
);
      

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
          <CategoryCards onPress={()=>navigation?.push('All Professionals')}/>
        </View>
         
     </ScrollView>
    )} 

export default Professionals;