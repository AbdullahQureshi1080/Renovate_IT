import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Avatar} from 'react-native-paper';
import {useSelector} from 'react-redux';
import ListViewItem from '../../components/List/ListViewItem';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from 'firebase';
require('firebase/firestore');
import userAPI from '../../api/user';
import useApi from '../../hooks/useApi';
import {Alert} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
// import { v1 as uuidv1 } from 'uuid';
// import { auth, db } from "../../config/firebase";
// import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";

const AllMessagesScreen = ({navigation, route}) => {
  const state = useSelector((state) => state);
  const user = state.entities.auth.data;
  const [chatIds, setChatIds] = useState([]);
  const [chats, setChats] = useState([]);

  const chatIdApi = useApi(userAPI.getChatIds);

  const getChatIds = async () => {
    const result = await chatIdApi.request(user.email);
    if (!result.ok) {
      return Alert.alert('Error Retriving Chat Ids');
    }

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

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Chats',
      headerStyle: {
        backgroundColor: '#e8e8e8',
      },
      headerTitleStyle: {
        color: '#1b262c',
        alignSelf: 'center',
      },
      headerTintColor: '#1b262c',
      headerRight: () => (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            width: 80,
            marginRight: 20,
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate('CreateChat')}>
            <MaterialIcons name="create" size={24} color="#1b262c" />
          </TouchableOpacity>
        </View>
      ),
      headerLeft: () => (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            width: 50,
            marginRight: 20,
          }}
        >
          <TouchableOpacity
            style={{alignSelf: 'center'}}
            onPress={() => navigation.goBack()}
          >
            <MaterialCommunityIcons
              name="backspace"
              size={30}
              color="#1b262c"
            />
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={() => navigation.navigate('CreateChat')}>
            <MaterialIcons name="create" size={24} color="#1b262c" />
          </TouchableOpacity> */}
        </View>
      ),
    });
  }, [navigation]);

  const enterChat = (id, chatName) => {
    navigation.navigate('UserChat', {
      id: id,
      chatName: chatName,
    });
  };

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        {chats.map(({id, data: {recieverChatName, senderChatName}}) => (
          <ListViewItem
            key={id}
            id={id}
            chatName={
              recieverChatName === `${user.firstname} ${user.lastname}`
                ? senderChatName
                : recieverChatName
            }
            enterChat={enterChat}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AllMessagesScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
});
