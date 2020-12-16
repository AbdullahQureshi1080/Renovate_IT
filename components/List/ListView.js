import * as React from 'react';
import {View,Text, FlatList,Dimensions} from 'react-native';
// import { List } from 'react-native-paper';
import ProfessionalAvatar from '../ProfessionalAvatar';
import AppButton from '../AppButton';
import { Button } from 'react-native-paper';
// const [messageData, setMessageData] = React.useState(messages);

const notifications = [
      {id:"1",name:"Abdullah Najam",descrition:"followed you", image:require('../../assets/p1.jpg')},
      {id:"2",name:"Abdul Karim",descrition:"apperciated your work", image:require('../../assets/p1.jpg')},
      {id:"3",name:"James Taylor",descrition:"followed you", image:require('../../assets/p1.jpg')},
      {id:"4",name:"Felicity Smoke",descrition:"apperciated your work", image:require('../../assets/p1.jpg')},
  ]

const messages = [
      
]

export const ListViewNotifications = (props) => (      
    <View>
          {
                notifications.length > 0 ? notifications.map((item,index)=>{
                  return <ProfessionalAvatar
                  key={index}
                  name={item.name}
                  title={item.descrition}
                  style={profileAvatar} 
                  size={40}
                />
          }) : <Text style={{alignSelf:"center", fontFamily:"Poppins-Bold"}}>No Notifications</Text>
          }
    </View> 
)

export const ListViewMessages = ({navigation}) => (
      <View >
          {
                messages.length > 0 ? messages.map((item,index)=>{
                  return <ProfessionalAvatar
                  key={index}
                  name={item.name}
                  title={item.descrition}
                  style={profileAvatar} 
                  size={40}
                />
          }) : <Button
                      style={{
                            backgroundColor:"#495464",
                            color : "#F4F4F2",
                            alignSelf:"center",
                            marginVertical:10, 
                      }}
                      labelStyle={{
                            fontFamily:"Poppins-Medium",
                            fontSize:12,
                      }}
                      onPress={() => navigation.navigate('New Message')}>Send a Message</Button>
          }
    </View> 
  )

  const profileAvatar = {
      border:"none",
      marginVertical:5,
      display:"flex",
      flexDirection:"row",
      flexWrap:"wrap",
      flexShrink:1,
      nameText : {
          fontSize : 14,
          color:"#495464",
          fontFamily: 'Poppins-Bold',
          alignSelf: 'center',
          marginLeft:5,
      },
      titleText : {
          fontSize : 14,
          color:"#495464",
          fontFamily: 'Poppins-Medium',
          alignSelf: 'center',
          marginLeft:5,
      }
    }
    