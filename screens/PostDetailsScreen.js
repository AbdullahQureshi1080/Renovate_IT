import 'react-native-gesture-handler';
import React from 'react';
import {View, Text, Image, ScrollView, Dimensions} from 'react-native';
import {
   Paragraph,
   Button,
   Avatar,
 } from 'react-native-paper';
import ScreenStyles from '../styles/ScreenStyles'
import InputText from '../components/TextInput';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {postsDummyData} from '../assets/DummyData';
import AppButton from '../components/AppButton';

var { width, height } = Dimensions.get('window')

const ProjectDetailsScreen = (props) =>{

   return (
      <ScrollView style = {ScreenStyles.postsDetailScreen}>
         
        <View style = {ScreenStyles.postsDetailScreen.viewBox}>
        <View style = {ScreenStyles.postsDetailScreen.AvatarBox}>
          <Avatar.Image source = {require("../assets/p1.jpg")} style={{
            marginHorizontal:3
          }}/>
          <Text style = {ScreenStyles.postsDetailScreen.AvatarBox.nameText}>{props.route.params.item.postAuthor}</Text>
        </View>
        <View style={{alignSelf:"center",}}>
        <AppButton name="Message"  onPress={()=>console.log("Message Button")}/>
        </View>
        </View>

        <View style={{
          marginVertical:15,}}>
          <Text style = {ScreenStyles.postsDetailScreen.viewBox.titleText}>{props.route.params.item.title}</Text>
          <Paragraph style={ScreenStyles.postsDetailScreen.contentText}>
          {props.route.params.item.description}
          </Paragraph>
          <View style = {{display:'flex', flexDirection:"row", justifyContent:"space-between"}}>
          <Text style = {ScreenStyles.postsDetailScreen.viewBox.titleText}>Budget</Text>
          <Text style = {ScreenStyles.postsDetailScreen.viewBox.titleText}>{props.route.params.item.budget} RS</Text>
          </View>   
        </View>

        <View style={{
          marginVertical:15,}}>
          <Text style = {ScreenStyles.postsDetailScreen.viewBox.titleText}>Attachments</Text>
           {/* Some Sort of way to get Attachements */}
        </View>
      </ScrollView>
    );
   }

export default ProjectDetailsScreen;