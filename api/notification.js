import firestore from '@react-native-firebase/firestore';
import {serverKey} from '../config/firebase';
import {create} from 'apisauce';
import client from './client';
import user from '../store/user';
import {useSelector} from 'react-redux';

// const firebaseAdmin = require('firebase-admin');
const notificationClient = create({baseURL: 'https://fcm.googleapis.com/fcm/'});

export const saveTokenToDatabase = async (userId, token) => {
  await firestore()
    .collection('users')
    .doc(userId)
    .update({
      tokens: firestore.FieldValue.arrayUnion(token),
    });
};

export const saveNewTokenToDatabase = async (userId, token) => {
  await firestore()
    .collection('users')
    .doc(userId)
    .set({
      tokens: firestore.FieldValue.arrayUnion(token),
    });
};

export const getAllTokensExceptUser = async (userId) => {
  let users = [];
  const allusers = await firestore().collection('users').get();
  const usersData = allusers.forEach((user) => {
    if (user.id !== userId) {
      users.push(user.data().tokens);
    }
  });
  const tokens = [].concat.apply([], users);
  return tokens;
};
// }

export const getAllTokens = async () => {
  let users = [];
  const allusers = await firestore().collection('users').get();
  const usersData = allusers.forEach((user) => {
    console.log('User ID: ', user.id, user.data());
    users.push(user.data().tokens);
  });
  //   var merged = [].concat.apply([], arrays);
  const tokens = [].concat.apply([], users);
  return tokens;
};

export const getToken = async (userId) => {
  //   let users = [];
  const user = await firestore().collection('users').doc(userId).get();
  // console.log('User in get Token', user.exists);
  if (user.exists) {
    const tokens = user.data().tokens;
    return tokens;
  }
  return [];
  //   return user;
};

export const saveNotification = async (userId, notification) => {
  await firestore()
    .collection('users')
    .doc(userId)
    .update({
      notifcations: firestore.FieldValue.arrayUnion(notification),
    });
};

export const sendNotification = (recievers, notification, data) =>
  notificationClient.post(
    'send',
    {
      registration_ids: recievers,
      collapse_key: 'type_a',
      notification: {
        body: notification?.body,
        title: notification?.title,
        image: notification?.image,
      },
      data: {
        body: data.body,
        title: data.title,
      },
    },
    {headers: {Authorization: `key=${serverKey}`}},
  );

const addNewNotification = (userId, message, users) =>
  client.post('notifications/saveNotification', {userId, message, users});

const getNotifications = (userId, message) =>
  client.post('notifications/getNotifications', {userId});

export default {
  addNewNotification,
  getNotifications,
};
