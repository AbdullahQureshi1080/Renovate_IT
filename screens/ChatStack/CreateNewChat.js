import React, {useEffect, useLayoutEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Button, Input, Image, Avatar, Icon} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
// import {createNewChat, addChat} from '../../store/user';
import AppButton from '../../components/AppButton';
// import { db } from "../../config/firebase";
import firebase from 'firebase';
require('firebase/firestore');
import {Alert} from 'react-native';
import useApi from '../../hooks/useApi';
import userAPI from '../../api/user';

const CreateNewChat = ({navigation}) => {
  // const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const allUsers = state.entities.data.allusers;
  const sender = state.entities.auth.data;
  const email = state.entities.auth.data.email;
  const chatApi = useApi(userAPI.createChat);
  // const [recieverEmail, setRecieverEmail] = useState('');
  const [input, setInput] = useState('');
  // const [chatName, setChatName] = useState('');
  // const [chatId, setChatId] = useState([])

  // const chatId = "";

  const [chatIds, setChatIds] = useState([]);

  const chatIdApi = useApi(userAPI.getChatIds);

  const getChatIds = async () => {
    const result = await chatIdApi.request(email);
    if (!result.ok) {
      return Alert.alert('Error Retriving Chat Ids');
    }

    setChatIds(result.data);
  };

  useEffect(() => {
    getChatIds();
    // console.log("User Id in Create Chat", userId)
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Create Chat',
      headerStyle: {
        backgroundColor: '#e8e8e8',
      },
      headerTitleStyle: {
        color: '#1b262c',
        // alignSelf: "center",
      },
      headerTintColor: '#1b262c',
    });
  }, [navigation]);

  // const chatID = () => {
  //   const senderID = userId;
  //   const recieverID = recieverId;
  //   const chatIDpre = [];
  //   chatIDpre.push(senderID);
  //   chatIDpre.push(recieverID);
  //   chatIDpre.sort();
  //   return chatIDpre.join('_');
  // };

  const getReciever = (input) => {
    const user = allUsers.find((user) => user.email === input.toLowerCase());
    if (user === undefined) {
      Alert.alert('No User with this email');
    } else if (user._id === sender._id) {
      return console.log(
        'Its the same user, can have chat with the same account id',
      );
    } else {
      // console.log("Reciever User",user.email);
      // setRecieverEmail(user.email)
      // setChatName(user.name)
      return user;
    }
  };

  const createChat = async () => {
    console.log('In Create Chat');
    const chatUserIds = [];
    const senderID = sender._id;
    // getRecieverId(input);
    const reciever = getReciever(input);
    if (reciever == undefined) return Alert.alert('Cannot Create Chat');
    chatUserIds.push(senderID);
    chatUserIds.push(reciever._id);
    // chatUserIds.sort();
    const chatId = chatUserIds.join('_');

    const checkIfChatExists = chatIds.filter((id) => {
      return id == chatId;
    });
    console.log('Checking Chat Id if exixts', checkIfChatExists);
    if (checkIfChatExists.length > 0) {
      navigation.navigate('All Messages');
      return Alert.alert('Chat Already Exists');
    }
    // console.log('Data for Chat Api', sender.email, reciever.email, chatId);

    const result = await chatApi.request(sender.email, reciever.email, chatId);
    if (!result.ok) {
      return Alert.alert('Chat cannot be created at this moment, try again');
    }

    await firebase
      .firestore()
      .collection('chats')
      .doc(chatId)
      .set({
        senderChatName: `${sender.firstname} ${sender.lastname}`,
        recieverChatName: reciever.name,
        // messages:[],
      })
      .then(() => {
        navigation.navigate('All Messages');
      })
      .catch((error) => alert(error));
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="Enter a chat name"
        value={input}
        onChangeText={(text) => setInput(text)}
        // leftIcon={
        //   <Icon name="chat-plus-outline" type="MaterialCommunityIcons" size={24} color="#1b262c" />
        // }
      />
      <AppButton
        name="Create New Chat"
        onPress={createChat}
        containerStyle={styles.button}
        disabled={!input}
      />
    </View>
  );
};

export default CreateNewChat;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e8e8e8',
    padding: 30,
    height: '100%',
  },
  button: {
    marginTop: 10,
    width: 200,
    alignSelf: 'center',
  },
});
