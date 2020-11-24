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

var { width, height } = Dimensions.get('window')

const ProjectDetailsScreen = (props) =>{

   return (
      <ScrollView style = {ScreenStyles.projectsDetailScreen}>
        <View style = {ScreenStyles.projectsDetailScreen.viewBox}>
        <Text style = {{fontSize:20, fontWeight: "400", marginHorizontal:3}}>{props.route.params.item.title}</Text>
        <Button style={{backgroundColor:"#495464"}} color = "#F4F4F2">Follow</Button>
        </View>
        <View style = {ScreenStyles.projectsDetailScreen.AvatarBox}>
          <Avatar.Image source = {require("../assets/p1.jpg")} style={{
            marginHorizontal:3
          }}/>
          <Text style = {{
            fontSize:16, alignSelf:"center", marginHorizontal: 10,
          }}>{props.route.params.item.name}</Text>
        </View>
        <View style={{
          marginVertical:15,
              borderBottomColor: '#1b262c', 
              borderBottomWidth: 1, 
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
              width: width - 20,}}>
        </View>
        <View style = {ScreenStyles.projectsDetailScreen.commentBox}>
          <Text style = {ScreenStyles.projectsDetailScreen.commentBox.text}>Be the first one to leave a comment !</Text>
          <View 
          style = 
          {{
            alignSelf:"center"
          }}
          >
          <InputText/>
          {/* <Button color="#f4f4f2" icon = "comment-arrow-right-outline" style = {{backgroundColor:"#495464", marginVertical:15, }}/> */}
          <Button icon = "comment-arrow-right-outline" style={{backgroundColor:"#495464", width:Dimensions.get('window').width/3, alignSelf:"center"}} color = "#F4F4F2">Comment</Button>
          </View>
        </View>
      </ScrollView>
    );
   }

export default ProjectDetailsScreen;