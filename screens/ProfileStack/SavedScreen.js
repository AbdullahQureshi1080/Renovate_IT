//  Native Imports
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {useSelector} from 'react-redux';

// Componenets Imports
import AppButton from '../../components/AppButton';

//  Api Imports
import useApi from '../../hooks/useApi';
import userAPI from '../../api/user';
import AppText from '../../components/AppText';
import ErrorMessage from '../../components/AppForm/ErrorMessage';
import {Image} from 'react-native';
import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('screen');

export default function SavedScreen() {
  const state = useSelector((state) => state);
  const userId = state.entities.auth.data._id;
  const saveApi = useApi(userAPI.getSavedItems);

  const [saved, setSaved] = useState([]);
  const [savedFromProjects, setSavedFromProjects] = useState([]);
  const [savedFromPosts, setSavedFromPosts] = useState([]);
  const [savedFromStore, setSavedFromStore] = useState([]);
  const [savedFromFirmNotes, setSavedFromFirmNotes] = useState([]);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const fetchSavedItems = async () => {
    const result = await saveApi.request(userId);
    if (!result.ok) {
      console.log('Error Fetching Saved Items');
      return;
    }
    console.log('Fetch Saved Items Successfully', result.data);
    // setSaved(result.data);
    const posts = result.data.filter((obj) => {
      return obj.type == 'post';
    });
    setSavedFromPosts(posts);
    const projects = result.data.filter((obj) => {
      return obj.type == 'project';
    });
    setSavedFromProjects(projects);
    const notes = result.data.filter((obj) => {
      return obj.type == 'note';
    });
    setSavedFromFirmNotes(notes);
    const store = result.data.filter((obj) => {
      return obj.type == 'store';
    });
    setSavedFromStore(store);
  };

  useEffect(() => {
    fetchSavedItems();
  }, []);

  const refreshSavedItems = () => {
    if (saved !== []) {
      setRefresh(true);
      fetchSavedItems();
      setRefresh(false);
    }
  };
  return (
    <View>
      <View style={{marginTop: 20}}>
        <AppText style={styles.titleText}>Saved From Projects</AppText>
        <FlatList
          ListEmptyComponent={() => (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
              }}
            >
              <ErrorMessage error={error} visible={error} />
              <AppText style={{fontSize: 14}}>No Saved Items</AppText>
            </View>
          )}
          horizontal={true}
          refreshing={refresh}
          onRefresh={refreshSavedItems}
          data={savedFromProjects.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
          })}
          keyExtractor={(item) => item._id}
          renderItem={({item}) => (
            <View style={styles.container}>
              <Image source={{uri: item.image}} style={styles.image} />
            </View>
          )}
        />
      </View>
      <View style={{marginTop: 20}}>
        <AppText style={styles.titleText}>Saved From Posts</AppText>
        <FlatList
          ListEmptyComponent={() => (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
              }}
            >
              <ErrorMessage error={error} visible={error} />
              <AppText style={{fontSize: 14}}>No Saved Items</AppText>
            </View>
          )}
          horizontal={true}
          refreshing={refresh}
          onRefresh={refreshSavedItems}
          data={savedFromPosts.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
          })}
          keyExtractor={(item) => item._id}
          renderItem={({item}) => (
            <View style={styles.container}>
              <Image source={{uri: item.image}} style={styles.image} />
            </View>
          )}
        />
      </View>
      <View style={{marginTop: 20}}>
        <AppText style={styles.titleText}>Saved From Notes</AppText>
        <FlatList
          ListEmptyComponent={() => (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
              }}
            >
              <ErrorMessage error={error} visible={error} />
              <AppText style={{fontSize: 14}}>No Saved Items</AppText>
            </View>
          )}
          horizontal={true}
          refreshing={refresh}
          onRefresh={refreshSavedItems}
          data={savedFromFirmNotes.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
          })}
          keyExtractor={(item) => item._id}
          renderItem={({item}) => (
            <View style={styles.container}>
              <Image source={{uri: item.image}} style={styles.image} />
            </View>
          )}
        />
      </View>
      <View style={{marginTop: 20}}>
        <AppText style={styles.titleText}>Saved From Store</AppText>
        <FlatList
          ListEmptyComponent={() => (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
              }}
            >
              <ErrorMessage error={error} visible={error} />
              <AppText style={{fontSize: 14}}>No Saved Items</AppText>
            </View>
          )}
          horizontal={true}
          refreshing={refresh}
          onRefresh={refreshSavedItems}
          data={savedFromStore.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
          })}
          keyExtractor={(item) => item._id}
          renderItem={({item}) => (
            <View style={styles.container}>
              <Image source={{uri: item.image}} style={styles.image} />
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    width: width,
    // margin: 40,
    paddingHorizontal: 5,
    paddingVertical: 10,
    backgroundColor: '#e8e8e8',
    borderRadius: 5,
  },
  columnStyle: {
    // backgroundColor: 'red',
    // margin: 10,
    width: width,
    height: height / 4,
  },
  titleText: {
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
  },
  image: {
    width: width / 1.15,
    height: height / 4,
    borderRadius: 5,
    // margin: 10,
    // marginRight: 20,
  },
});
