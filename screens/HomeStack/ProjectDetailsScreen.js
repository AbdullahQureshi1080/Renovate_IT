// Native Imports
import 'react-native-gesture-handler';
import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import {Paragraph, Button, Avatar} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector, useDispatch} from 'react-redux';

import {
  MenuProvider,
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

// Components Imports

import AppText from '../../components/AppText';
import Entypo from 'react-native-vector-icons/Entypo';
import {FloatingAction} from 'react-native-floating-action';
import GallaryModal from '../../components/Modal/GallaryModal';
import Comment from '../../api/comment';
import ActivityIndicator from '../../components/ActivityIndicator';
import ErrorMessage from '../../components/AppForm/ErrorMessage';

// import ComponentsStyle from '../../styles/ComponentsStyle';
// import AppButton from '../../components/AppButton';

// Styles Imports
import ScreenStyles from '../../styles/ScreenStyles';

//  Api Imports
import useApi from '../../hooks/useApi';
import userAPI from '../../api/user';

var {width, height} = Dimensions.get('screen');

const ProjectDetailsScreen = ({route, navigation}) => {
  // const dispatch = useDispatch();
  const [idCheck, setCheckId] = useState(true);
  const [deleteError, setDeleteError] = useState(null);

  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState([]);
  const [colorRed, setColorRed] = useState(false);
  const [likedError, setLikedError] = useState(false);

  const state = useSelector((state) => state);
  const userId = state.entities.auth.data._id;
  const userEmail = state.entities.auth.data.email;

  const [isVisible, setIsVisible] = useState(false);

  const deleteApi = useApi(userAPI.deleteProject);
  const likeApi = useApi(userAPI.likeProject);
  const getLikesApi = useApi(userAPI.getLikes);
  const saveApi = useApi(userAPI.saveItem);
  const [text, setText] = useState('');

  const likeProject = async () => {
    //  Call api
    const result = await likeApi.request(userId, projectId, liked);
    if (!result.ok) {
      setLikedError('Error Liking the Project');
      setLiked(false);
      return;
    }
    getLikes();
    if (result.data[0]?.likedStatus === true) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  };

  const getLikes = async () => {
    //  Call api
    const result = await getLikesApi.request(userId, projectId, liked);
    if (!result.ok) {
      setLikedError('Error Getting Likes Project');
      setLiked(false);
      return;
    }
    const likedUser = likes.filter((like) => like.likerId == userId);
    if (likedUser.length > 0) {
      if (likedUser[0]?.likedStatus === true) {
        setLiked(true);
      } else {
        setLiked(false);
      }
    }
    setLikes(result.data);
  };

  const projectId = route.params.item._id;
  const userProjectIds = state.entities.auth.data.projects.map((id) => id);
  useEffect(() => {
    getLikes();
    for (var i = 0; i < userProjectIds.length; i++) {
      if (projectId == userProjectIds[i]) {
        setCheckId(false);
      }
    }
    // console.log(route.params.item.data);
  }, []);

  const handleUpdate = () => {
    //  Update Project
    navigation.navigate('Add', {
      screen: 'UpdateProject',
      params: route.params.item,
    });
  };

  const handleDelete = async () => {
    // delete Project
    const result = await eleteApi.request(userEmail, projectId);
    if (!result.ok) {
      console.log('Could Not Delete Project');
      setDeleteError('Error Deleting Project');
    }
    console.log('Project Deleted');
    navigation.reset({
      index: 0,
      routes: [{name: 'AppHome'}],
    });
  };

  const onPressSave = async (image) => {
    console.log('Image for saving', image);
    let type = 'project';
    const result = saveApi.request(userId, image, type);
    if (!result.ok) {
      console.log('Not able to save at the moment');
    }
    console.log('Item Saved');
    setColorRed(true);
    Alert.alert('Item Saved');
  };

  const renderItem = useCallback(
    ({item, index, drag, isActive}: RenderItemParams<nodeItem>) => {
      return (
        <View key={index}>
          {item.type == 'image' ? (
            <View style={{marginVertical: 2}} key={parseInt(item.key)}>
              <TouchableOpacity onPress={() => setIsVisible(true)}>
                <Image
                  source={{uri: item.value}}
                  style={{width: width, height: height / 2}}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={{marginHorizontal: 20, marginVertical: 5}}
              key={parseInt(item.key)}
            >
              <View>
                <AppText
                  style={{
                    textAlign: 'justify',

                    fontSize: 16,
                  }}
                >
                  {item.value}
                </AppText>
              </View>
            </View>
          )}
        </View>
      );
    },
    [],
  );

  const handleText = (text) => {
    setText(text);
  };
  return (
    <MenuProvider>
      <ActivityIndicator visible={deleteApi.loading} />
      <FlatList
        style={ScreenStyles.projectsDetailScreen}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 10,
                marginHorizontal: 20,
              }}
            >
              <TouchableOpacity
                style={{alignSelf: 'center'}}
                onPress={() => navigation.goBack()}
              >
                <MaterialCommunityIcons
                  name="backspace"
                  size={40}
                  color="#1b262c"
                />
              </TouchableOpacity>
              {!idCheck ? (
                <View>
                  <Menu>
                    <MenuTrigger
                      text={
                        <MaterialIcons
                          name="more-vert"
                          size={40}
                          color="#1b262c"
                        />
                      }
                    />
                    <MenuOptions customStyles={optionsStyles}>
                      <MenuOption onSelect={handleUpdate} text={'Update'} />
                      <MenuOption
                        onSelect={() =>
                          Alert.alert(
                            'Delete',
                            'Are you sure you want to delete this post?',
                            [
                              {
                                text: 'Cancel',
                                onPress: () =>
                                  console.log('Cancel for post deletion'),
                                style: 'cancel',
                              },
                              {text: 'OK', onPress: handleDelete},
                            ],
                            {cancelable: false},
                          )
                        }
                        text={'Delete'}
                      />
                    </MenuOptions>
                  </Menu>
                </View>
              ) : (
                <View></View>
              )}
            </View>
            <GallaryModal
              color={colorRed}
              isVisible={isVisible}
              images={route.params.item.data.gallaryImages.map(
                ({value}) => value,
              )}
              onPressClose={() => setIsVisible(false)}
              onPressSave={(image) => onPressSave(image)}
            />
            <ErrorMessage error={deleteError} />
            <View style={ScreenStyles.projectsDetailScreen.viewBox}>
              <Text style={ScreenStyles.projectsDetailScreen.viewBox.titleText}>
                {route.params.item.title}
              </Text>
              {/* <AppText>{route.params.item.category}</AppText> */}
            </View>
            <View style={ScreenStyles.projectsDetailScreen.AvatarBox}>
              <Avatar.Image
                source={{uri: route.params.item.creatorImage}}
                style={{
                  marginHorizontal: 3,
                }}
              />
              <Text
                style={ScreenStyles.projectsDetailScreen.AvatarBox.nameText}
              >
                {route.params.item.creator}
              </Text>
            </View>
            <View
              style={{
                marginVertical: 15,
                borderBottomColor: '#1b262c',
                borderBottomWidth: 1,
                opacity: 0.5,
                width: width,
                // marginHorizontal: 15,
              }}
            ></View>
          </>
        }
        data={route.params.item.data.data}
        keyExtractor={(item) => parseInt(item.key)}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          <>
            <View
              style={{
                marginVertical: 15,
                borderBottomColor: '#1b262c',
                borderBottomWidth: 1,
                opacity: 0.5,
                width: width - 20,
              }}
            ></View>
            <View>
              <Text
                style={[
                  ScreenStyles.projectsDetailScreen.viewBox.titleText,
                  {
                    marginHorizontal: 15,
                  },
                ]}
              >
                {route.params.item.title}
              </Text>
              <View style={ScreenStyles.projectsDetailScreen.infoBox}>
                <View
                  style={{
                    flexDirection: 'row',
                  }}
                >
                  <Entypo
                    name="thumbs-up"
                    size={20}
                    color="#1b262c"
                    style={{alignSelf: 'center'}}
                  />
                  <AppText
                    style={[
                      ScreenStyles.projectsDetailScreen.contentText,
                      {
                        paddingLeft: 5,
                        alignSelf: 'center',
                      },
                    ]}
                  >
                    {likes.length}
                  </AppText>
                </View>
                <FloatingAction
                  distanceToEdge={15}
                  floatingIcon={
                    <Entypo
                      name="thumbs-up"
                      size={30}
                      color={liked ? '#495464' : '#F4F4F2'}
                      style={{alignSelf: 'center'}}
                    />
                  }
                  onPressMain={likeProject}
                  color={liked ? '#e8e8e8' : '#495464'}
                  // color="#495464"
                  overlayColor="none"
                />
              </View>
            </View>
            <View
              style={{
                marginVertical: 15,
                borderBottomColor: '#1b262c',
                borderBottomWidth: 1,
                opacity: 0.5,
                width: width - 20,
              }}
            ></View>

            <View style={ScreenStyles.projectsDetailScreen.commentBox}>
              <View
                style={{
                  alignSelf: 'center',
                }}
              >
                <Comment
                  onChangeText={(text) => handleText(text)}
                  projectId={projectId}
                  userId={userId}
                  value={text}
                />
              </View>
            </View>
          </>
        }
      />
    </MenuProvider>
  );
};

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});
const optionsStyles = {
  optionsContainer: {
    backgroundColor: '#495464',
    padding: 5,
  },
  optionWrapper: {
    backgroundColor: '#495464',
    margin: 5,
  },
  optionText: {
    color: '#F4F4F2',
  },
};
export default ProjectDetailsScreen;
