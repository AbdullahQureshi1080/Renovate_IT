import * as React from 'react';
import {View, Text, FlatList, Dimensions} from 'react-native';
// import { List } from 'react-native-paper';
import ProfessionalAvatar from '../ProfessionalAvatar';
import AppButton from '../AppButton';
import {Button, Divider, Avatar} from 'react-native-paper';
// const [messageData, setMessageData] = React.useState(messages);

// import firebase from "firebase";
// import { useSelector } from 'react-redux';
import ListViewItem from './ListViewItem';
import CardViewList from './CardViewList';
import AppText from '../AppText';
// require("firebase/firestore");

export const ListViewNotifications = ({notifications}) => (
  <View style={{width: '100%'}}>
    {notifications.length > 0 ? (
      notifications.map((item, index) => {
        return (
          <>
            <View
              style={{
                marginHorizontal: 15,
                // flexDirection: 'row',
                // width: '70%',
                marginVertical: 2,
              }}
            >
              <View style={{flexDirection: 'row'}}>
                <Avatar.Image source={{uri: item.userImage}} size={30} />
                <AppText style={{marginHorizontal: 5, alignSelf: 'center'}}>
                  {item.userName}
                </AppText>
              </View>
              <AppText>{item.message}</AppText>
            </View>
            <Divider />
          </>
        );
      })
    ) : (
      <Text style={{alignSelf: 'center', fontFamily: 'Poppins-Bold'}}>
        No Notifications
      </Text>
    )}
  </View>
);

export const ListViewMessages = ({navigation, chats, enterChat}) => (
  <View>
    {chats.length > 0 ? (
      chats.map((item, index) => {
        return (
          <CardViewList
            key={item.id}
            id={item.id}
            enterChat={enterChat}
            chatName={item.data.recieverChatName}
            style={{backgroundColor: '#e8e8e8'}}
          />
        );
      })
    ) : (
      <Button
        style={{
          backgroundColor: '#495464',
          color: '#F4F4F2',
          alignSelf: 'center',
          marginVertical: 10,
        }}
        labelStyle={{
          fontFamily: 'Poppins-Medium',
          fontSize: 12,
        }}
        onPress={() => navigation.navigate('CreateChat')}
      >
        Send a Message
      </Button>
    )}
  </View>
);

const profileAvatar = {
  border: 'none',
  marginVertical: 5,
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  flexShrink: 1,
  nameText: {
    fontSize: 14,
    color: '#495464',
    fontFamily: 'Poppins-Bold',
    alignSelf: 'center',
    marginLeft: 5,
  },
  titleText: {
    fontSize: 14,
    color: '#495464',
    fontFamily: 'Poppins-Medium',
    alignSelf: 'center',
    marginLeft: 5,
  },
};
