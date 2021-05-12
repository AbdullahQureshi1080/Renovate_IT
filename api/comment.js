import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  Button,
  Dimensions,
} from 'react-native';
import {Avatar} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
// import { fetchUsersData } from '../../store/actions';
import AppTextInput from '../components/AppTextInput';
import ProfessionalAvatar from '../components/ProfessionalAvatar';
import {addNewComment, addComment} from '../store/data';
import ComponentsStyle from '../styles/ComponentsStyle';
import ScreenStyle from '../styles/ScreenStyles';
import client from './client';

import dataAPI from './data';
import useApi from '../hooks/useApi';
import ErrorMessage from '../components/AppForm/ErrorMessage';

const Comment = (props) => {
  const [error, setError] = useState(null);

  const [comments, setComments] = useState(null);

  const commentApi = useApi(dataAPI.commentOnProject);
  const getCommentApi = useApi(dataAPI.getProjectComments);

  const fetchComments = async () => {
    const projectId = props.projectId;
    const result = await getCommentApi.request(projectId);
    if (!result.ok) {
      setError('Could not retrive comments at this moment, refresh. ');
      return;
    }
    setComments(new Array(result.data));
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const onCommentSend = async (value) => {
    if (value == '') {
      return;
    }
    const userId = props.userId;
    const projectId = props.projectId;
    const result = await commentApi.request(userId, projectId, value);
    console.log(result.data);
    if (!result.ok) {
      console.log('Could not post comment');
      return;
    }
    console.log('After adding new', comments);
    setComments(new Array(result.data));
  };

  if (comments == null) {
    return <View />;
  }

  return (
    <View style={{flex: 1}}>
      <View>
        <ErrorMessage error={error} visible={error} />
        <FlatList
          numColumns={1}
          horizontal={false}
          data={comments}
          keyExtractor={(comment) => comment.id}
          renderItem={({item}) => (
            <View>
              {item.map((comment, index) => {
                return (
                  <View
                    key={comment.id}
                    style={{
                      flexDirection: 'row',
                      marginVertical: 5,
                      alignContent: 'center',
                    }}
                  >
                    <Avatar.Image
                      source={{uri: comment.commentorImage}}
                      size={30}
                    />
                    <AppText
                      style={{fontFamily: 'Poppins-Bold', marginHorizontal: 5}}
                    >
                      {comment.commentor}
                    </AppText>
                    <AppText style={{flexShrink: 1}}>{comment.comment}</AppText>
                  </View>
                );
              })}
            </View>
          )}
        />
      </View>
      <View style={{flex: 1, alignSelf: 'center'}}>
        <Text style={ScreenStyle.projectsDetailScreen.commentBox.text}>
          Want to Comment?{' '}
        </Text>
        <AppTextInput
          style={ComponentsStyle.inputStyle}
          label="Comment on post"
          selectionColor="#1b262c"
          underlineColor="#1b262c"
          textColor="#1b262c"
          onChangeText={props.onChangeText}
          //  value={}
        />
        <AppButton name="Comment" onPress={() => onCommentSend(props.value)} />
      </View>
    </View>
  );
};

const profileAvatar = {
  border: 'none',
  marginVertical: 15,
  alignItems: 'center',
  nameText: {
    fontSize: 18,
    marginTop: 5,
    color: '#495464',
    fontFamily: 'Poppins-Bold',
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#495464',
    fontFamily: 'Poppins-Medium',
  },
};

export default Comment;
