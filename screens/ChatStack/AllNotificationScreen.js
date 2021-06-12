// Native Imports

import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList, Alert} from 'react-native';
import {useSelector} from 'react-redux';
// Components Imports
import ListViewItem from '../../components/List/ListViewItem';
import {Button, Divider, Avatar} from 'react-native-paper';

import AppText from '../../components/AppText';

import userAPI from '../../api/user';
import useApi from '../../hooks/useApi';

const AllNotificationScreen = ({navigation}) => {
  const state = useSelector((state) => state);
  const user = state.entities.auth.data;
  const [notifications, setNotifications] = useState([]);
  const notificationsApi = useApi(userAPI.getUserNotifications);

  const fetchNotifications = async () => {
    const result = await notificationsApi.request(user._id);
    if (!result.ok) {
      return Alert.alert('Error Retriving notifications');
    }
    console.log('notifications array in chat screen', result.data);
    setNotifications(result.data);
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item._id}
        renderItem={({item}) => (
          <>
            <View
              style={{
                marginHorizontal: 15,
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
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginHorizontal: 20,
  },
});

export default AllNotificationScreen;
