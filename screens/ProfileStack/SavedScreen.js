//  Native Imports
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  PermissionsAndroid,
  Image,
  TouchableOpacity,
  ProgressBarAndroid,
  ToastAndroid,
  TextInput,
} from 'react-native';
import {useSelector} from 'react-redux';
import Share from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';
// import firebase from 'firebase';
// require('firebase/firestore');
// require('firebase/firebase-storage');

// Componenets Imports
import SavedItemList from '../../components/List/SavedItemList';
import ErrorMessage from '../../components/AppForm/ErrorMessage';
import AppText from '../../components/AppText';

//  Api Imports
import useApi from '../../hooks/useApi';
import userAPI from '../../api/user';
import {Dimensions} from 'react-native';
import {Alert} from 'react-native';

const {width, height} = Dimensions.get('screen');

export default function SavedScreen() {
  const state = useSelector((state) => state);
  const userId = state.entities.auth.data._id;
  const saveApi = useApi(userAPI.getSavedItems);

  const [saved, setSaved] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [savedFromProjects, setSavedFromProjects] = useState([]);
  const [savedFromPosts, setSavedFromPosts] = useState([]);
  const [savedFromStore, setSavedFromStore] = useState([]);
  const [savedFromFirmNotes, setSavedFromFirmNotes] = useState([]);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [imageToShare, setImageToShare] = useState('');

  const fetchSavedItems = async () => {
    const result = await saveApi.request(userId);
    if (!result.ok) {
      console.log('Error Fetching Saved Items');
      return;
    }
    // console.log('Fetch Saved Items Successfully', result.data);
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

  const actualDownload = async (item) => {
    var date = new Date();
    var ext = getExtention(item);
    ext = '.' + ext[0];
    const {config, fs} = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path:
          PictureDir +
          '/image_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          // ext,
          '.png',
        description: 'Image',
      },
    };
    config(options)
      .fetch('GET', item)
      .progress((received, total) => {
        console.log('progress', received / total);
        setProgress(received / total);
      })
      .then((res) => {
        setLoading(false);
        setProgress(100);
        ToastAndroid.showWithGravity(
          'Download Completed!',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
        );
        Alert.alert('Image Downloaded Successfully.');
      })
      .catch((err) => {
        console.log('Error', err);
      });
  };

  const getExtention = (filename) => {
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };

  const downloadFile = async (item) => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'App needs access to memory to download the file ',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        actualDownload(item);
      } else {
        Alert.alert(
          'Permission Denied!',
          'You need to give storage permission to download the file',
        );
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const fs = RNFetchBlob.fs;
  let imagePath = null;
  const blobRS = (item) =>
    RNFetchBlob.config({
      fileCache: true,
    })
      .fetch('GET', item)
      // the image is now dowloaded to device's storage
      .then((resp) => {
        // the image path you can use it directly with Image component
        imagePath = resp.path();
        // setImageToShare(imagePath);
        return resp.readFile('base64');
      })
      .then(async (base64Data) => {
        var base64Data = `data:image/png;base64,` + base64Data;
        // here's base64 encoded image
        const shareResponse = await Share.open({
          message: 'Shared From Renovate It',
          title: 'Image from saved Images',
          url: base64Data,
        });
        console.log('Item to share - from share', shareResponse);
        // setImageToShare(base64Data);
        // remove the file from storage
        return fs.unlink(imagePath);
      })
      .catch((err) => {
        console.log('Error', err);
      });

  const onPressDownload = async (item) => {
    console.log('Item to download', item);
    downloadFile(item);
  };

  const onPressShare = async (item) => {
    console.log('Item to share', item);
    await blobRS(item);
  };

  return (
    <View>
      <View style={{marginTop: 20}}>
        <AppText style={styles.titleText}>Saved From Projects</AppText>
        <SavedItemList
          data={savedFromProjects}
          refresh={refresh}
          refreshSavedItems={refreshSavedItems}
          onPressDownload={(item) => onPressDownload(item)}
          onPressShare={(item) => onPressShare(item)}
        />
      </View>
      <View style={{marginTop: 20}}>
        <AppText style={styles.titleText}>Saved From Posts</AppText>
        <SavedItemList
          data={savedFromPosts}
          refresh={refresh}
          refreshSavedItems={refreshSavedItems}
          onPressDownload={(item) => onPressDownload(item)}
          onPressShare={(item) => onPressShare(item)}
        />
      </View>
      <View style={{marginTop: 20}}>
        <AppText style={styles.titleText}>Saved From Notes</AppText>
        <SavedItemList
          data={savedFromFirmNotes}
          refresh={refresh}
          refreshSavedItems={refreshSavedItems}
          onPressDownload={(item) => onPressDownload(item)}
          onPressShare={(item) => onPressShare(item)}
        />
      </View>
      <View style={{marginTop: 20}}>
        <AppText style={styles.titleText}>Saved From Store</AppText>
        <SavedItemList
          data={savedFromStore}
          refresh={refresh}
          refreshSavedItems={refreshSavedItems}
          onPressDownload={(item) => onPressDownload(item)}
          onPressShare={(item) => onPressShare(item)}
        />
        {loading ? (
          <ProgressBarAndroid
            styleAttr="Large"
            indeterminate={false}
            progress={this.state.progress}
          />
        ) : null}
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
