// Native Imports
import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';

// Components Imports
import ListViewItem from '../../components/List/ListViewItem';

const notifications = [
  // {id:"1",name:"Abdullah Najam",descrition:"followed you", image:require('../../assets/p1.jpg')},
  // {id:"2",name:"Abdul Karim",descrition:"apperciated your work", image:require('../../assets/p1.jpg')},
  // {id:"3",name:"James Taylor",descrition:"followed you", image:require('../../assets/p1.jpg')},
  // {id:"4",name:"Felicity Smoke",descrition:"apperciated your work", image:require('../../assets/p1.jpg')},
];

const AllNotificationScreen = ({navigation}) => {
  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={notifications}
        keyExtractor={(message) => message.id.toString()}
        renderItem={(item) => (
          <ListViewItem
            name={item.item.name}
            subtitle={item.item.descrition}
            image={item.item.image}
          />
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
