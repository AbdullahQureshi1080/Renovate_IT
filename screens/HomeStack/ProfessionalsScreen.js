// Native Imports
import 'react-native-gesture-handler';
import React, { useState } from 'react';
import {View, Text, ScrollView,Dimensions} from 'react-native';

// Components Imports
import ProfessionalAvator from '../../components/ProfessionalAvatar';
// import LocationBar from '../../components/LocationBar';
import CategoryCard from '../../components/Card/CategoryCard';

// Styles Imports
import ScreenStyles from '../../styles/ScreenStyles'
import { useSelector } from 'react-redux';

import Builder  from '../../assets/svg/builder.svg';

const profileAvatar = {
   border:"none",
   marginVertical:15,
   justifyContent:"center",
   nameText : {
       fontSize : 16,
       marginTop : 5,
       fontWeight:"bold",
       color:"#495464",
       fontFamily: 'Poppins-Bold',
      //  alignSelf: 'center',
   },
   titleText : {
       fontSize : 14,
       fontWeight:"normal",
       color:"#495464",
       width:Dimensions.get('window').width/3,
       fontFamily: 'Poppins-Medium',
       alignSelf: 'center',
   }
 }

// const builder = ()=>{
//    return(
//       <Builder />
//    )
// }

   const Professionals = ({navigation}) =>{
      const [data,setData ] = useState([])
      const state = useSelector(state=>state);
      const professionals = state.entities.data.allusers;
      // console.log("All Professional",professionals);
      
      const categoryScreen = (category)=>{
         // if(category == "Architecture"){
            // console.log("Category:",category)
            // const result = professionals.map((user)=>{
            //    if(user.jobcategory == category){
            //       return user;
            //    }
            // });
            const arrProfessionals = [];
            for(var i=0; i<professionals.length; i++){
               if(professionals[i].jobcategory == category){
                 arrProfessionals.push(professionals[i]);
               }
            }
            // setData(arrProfessionals);
            // console.log("Specific Category Professionals ",arrProfessionals);
            navigation.navigate("All Professionals", {title:category, professionals:arrProfessionals},);
         // }
      }

    return( 
    <ScrollView style={ScreenStyles.professionalsScreen}>
      <Text style = {ScreenStyles.professionalsScreen.headTitle}>Top Professionals</Text>
      <View style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
         {
            professionals.slice(0,3).map((user)=>{
                 return  (    
                     <ProfessionalAvator key={user._id} name = {user.name} title ={user.jobtitle} style={profileAvatar} size={90} imageUri={user.image}/>
                 )
            })
         }
      </View>
      <Text style = {ScreenStyles.professionalsScreen.headTitle}>Select By Category</Text>
      <View>
      <View style={ScreenStyles.professionalsScreen.viewBox}>
            <View style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
               <CategoryCard title = "Interior Designer" source = {require('../../assets/interior-design.jpg')} onPress={()=>categoryScreen("Interior Designer")}/>      
               <CategoryCard title = "Architect" source = {require('../../assets/architecture.jpg')} onPress={()=>categoryScreen("Architecture")}/>
            </View>
            <View style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
               <CategoryCard title = "Renovators" source = {require('../../assets/renovation.jpg')}onPress={()=>categoryScreen("Renovator")}/>
               <CategoryCard title = "Builders" source = {require("../../assets/builder.jpg")} onPress={()=>categoryScreen("Builder")}/>
            </View>
            <View style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
               <CategoryCard title = "Suppliers" source = {require('../../assets/supplier.jpg')} onPress={()=>categoryScreen("Supplier")}/>
            </View>
      </View>
      </View>
   </ScrollView>
    )} 

export default Professionals;