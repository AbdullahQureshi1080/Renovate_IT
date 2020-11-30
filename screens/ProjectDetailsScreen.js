import 'react-native-gesture-handler';
import React from 'react';
import {View, Text, Image, ScrollView, Dimensions,StyleSheet} from 'react-native';
import {
   Paragraph,
   Button,
   Avatar,
 } from 'react-native-paper';
import ScreenStyles from '../styles/ScreenStyles'
import InputText from '../components/TextInput';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { FloatingAction } from "react-native-floating-action";
var { width, height } = Dimensions.get('window')

const ProjectDetailsScreen = (props) =>{

   return (
      <ScrollView style = {ScreenStyles.projectsDetailScreen}>
        <View style = {ScreenStyles.projectsDetailScreen.viewBox}>
        <Text style = {ScreenStyles.projectsDetailScreen.viewBox.titleText}>{props.route.params.item.title}</Text>
        <Button style={{backgroundColor:"#495464"}} color = "#F4F4F2">Follow</Button>
        </View>
        <View style = {ScreenStyles.projectsDetailScreen.AvatarBox}>
          <Avatar.Image source = {require("../assets/p1.jpg")} style={{
            marginHorizontal:3
          }}/>
          <Text style = {ScreenStyles.projectsDetailScreen.AvatarBox.nameText}>{props.route.params.item.name}</Text>
        </View>
        <View style={{
          marginVertical:15,
              borderBottomColor: '#1b262c', 
              borderBottomWidth: 1, 
              opacity:0.5,
              width: width - 20,}}>
        </View>
        <View>
          <Paragraph style={ScreenStyles.projectsDetailScreen.contentText}>
          {props.route.params.item.content.textbar1}
          </Paragraph>
          <Image style = {ScreenStyles.projectsDetailScreen.imageStyle} source={require('../assets/img1.jpg')}/>
          <Image style = {ScreenStyles.projectsDetailScreen.imageStyle} source={require('../assets/img2.jpg')}/>
          <Paragraph  style={ScreenStyles.projectsDetailScreen.contentText}>
          {props.route.params.item.content.textbar2}
          </Paragraph>
        </View>
        <View style={{
          marginVertical:15,
              borderBottomColor: '#1b262c', 
              borderBottomWidth: 1, 
              opacity:0.5,
              width: width - 20,
              }}>
        </View>
        <View>
             <Text style = {ScreenStyles.projectsDetailScreen.viewBox.titleText}>{props.route.params.item.title}</Text>
             <View style = {ScreenStyles.projectsDetailScreen.infoBox}>
             <Entypo name="thumbs-up" size={20} color="#1b262c"/>
            <Text style={{...ScreenStyles.projectsDetailScreen.contentText},{alignSelf:"center",}} >{props.route.params.item.likes}</Text>
             </View>     
        </View> 
        <View style={{
          marginVertical:15,
              borderBottomColor: '#1b262c', 
              borderBottomWidth: 1, 
              opacity:0.5,
              width: width - 20,
              }}>
        </View>
       
        <View style = {ScreenStyles.projectsDetailScreen.commentBox}>
          <Text style = {ScreenStyles.projectsDetailScreen.commentBox.text}>Want to Comment? </Text>
          <View 
          style = 
          {{
            alignSelf:"center"
          }}
          >
          <InputText  style={ComponentsStyle.inputStyle}  label="Comment on post" selectionColor="#1b262c" underlineColor="#1b262c"  textColor="#1b262c"/>
          <Button icon = "comment-arrow-right-outline" style={{backgroundColor:"#495464", width:Dimensions.get('window').width/3, alignSelf:"center"}} color = "#F4F4F2">Comment</Button>
          </View>
        </View>
        <FloatingAction
            distanceToEdge = {vertical=15}
            floatingIcon={<Entypo name="thumbs-up" size={30} color="#F4F4F2" style={{alignSelf:"center",}}/>}
            onPressMain ={()=> console.log("Yo")}
            color = "#495464"
            overlayColor = "none"
        />
      </ScrollView>
    );
   }

   const styles = StyleSheet.create({
    actionButtonIcon: {
      fontSize: 20,
      height: 22,
      color: 'white',
    },
  });
export default ProjectDetailsScreen;