// Native Imports
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

import firebase from 'firebase';
require('firebase/firestore');
// Components Imports
import AppCard from '../../components/AppCard';
import {
  ListViewNotifications,
  ListViewMessages,
} from '../../components/List/ListView';

import userAPI from '../../api/user';
import useApi from '../../hooks/useApi';
import {useFocusEffect} from '@react-navigation/native';

const ChatScreen = ({navigation, route}) => {
  const state = useSelector((state) => state);
  const user = state.entities.auth.data;
  // const chatFromRedux = state.entities.auth.data.chats.map(({id}) => id);
  // console.log('chat Ids from store', chatFromRedux);
  const [chatIds, setChatIds] = useState([]);
  const [chats, setChats] = useState([]);

  const chatIdApi = useApi(userAPI.getChatIds);

  const getChatIds = async () => {
    const result = await chatIdApi.request(user.email);
    if (!result.ok) {
      return Alert.alert('Error Retriving Chat Ids');
    }
    console.log('Chat array in chat screen', chats);
    setChatIds(result.data);
  };

  useEffect(() => {
    getChatIds();
  }, []);

  useEffect(() => {
    getChatIds();
  }, [navigation, route]);

  useFocusEffect(
    React.useCallback(() => {
      //   alert('Screen was focused');
      // Do something when the screen is focused
      getChatIds();
      return () => {
        // alert('Screen was unfocused');
        // Do something when the screen is unfocused
        // Useful for cleanup functions
        setChatIds([]);
      };
    }, []),
  );

  useEffect(() => {
    console.log('chatIds in Chat Screen', chatIds);
    const unsubscribe = firebase
      .firestore()
      .collection('chats')
      .onSnapshot((snapshot) => {
        const chat = snapshot.docs.filter((doc) => chatIds.includes(doc.id));
        console.log('chats from intersection', chat);

        setChats(
          chat.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          })),
        );
      });
    return unsubscribe;
  }, [chatIds]);

  const enterChat = (id, chatName) => {
    navigation.navigate('UserChat', {
      id: id,
      chatName: chatName,
    });
  };

  return (
    <View style={styles.screenContainer}>
      <AppCard
        title="Inbox"
        buttonName="View All"
        component={
          <ListViewMessages
            navigation={navigation}
            chats={chats}
            enterChat={enterChat}
          />
        }
        onPress={() => {
          navigation.navigate('All Messages');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    // marginHorizontal:20,
    marginVertical: 15,
  },
});

export default ChatScreen;
