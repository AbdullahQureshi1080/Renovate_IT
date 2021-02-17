// Native Imports
import 'react-native-gesture-handler';
import React from 'react';
import {View, Text, Image, ScrollView, Dimensions,StyleSheet} from 'react-native';
import {Paragraph,Avatar,} from 'react-native-paper';

// Components Imports
import AppButton from '../../components/AppButton';

// Styles Imports
import ScreenStyles from '../../styles/ScreenStyles'

// var { width, height } = Dimensions.get('window')

const ProjectDetailsScreen = (props) =>{

   return (
      <ScrollView style = {ScreenStyles.postsDetailScreen}>
         
        <View style = {ScreenStyles.postsDetailScreen.viewBox}>
        <View style = {ScreenStyles.postsDetailScreen.AvatarBox}>
          <Avatar.Image source = {require("../../assets/p1.jpg")} style={{
            marginHorizontal:3
          }}/>
          <Text style = {ScreenStyles.postsDetailScreen.AvatarBox.nameText}>{props.route.params.item.creator}</Text>
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
          <Text style = {ScreenStyles.postsDetailScreen.viewBox.titleText}>RS {props.route.params.item.budget} </Text>
          </View>   
        </View>

          <Text style = {ScreenStyles.postsDetailScreen.viewBox.titleText}>Attachments</Text>
        <View style={{flexDirection:"row"}}>
          {props.route.params.item.images.concat(props.route.params.item.documents).map(image=>
            <View style={styles.container}>
            <Image source = {{uri:image}} style={styles.image}/>
           </View>
          )}
        </View>
      </ScrollView>
    );
   }

   const styles = StyleSheet.create({
    container: {
      backgroundColor: "grey",
      borderRadius: 15,
      display:"flex",
      flexDirection:"row",
      alignItems: "center",
      justifyContent: "center",
      height: 100,
      width: 100,
      overflow: "hidden",
      marginHorizontal:5,
    },
    image: {
      height: "100%",
      width: "100%",
    },
  });
export default ProjectDetailsScreen;