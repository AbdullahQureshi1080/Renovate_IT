// Native Imports
import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import {useSelector} from 'react-redux';

// Components Imports
import PostCard from '../../components/Card/PostCard';
import AppButton from '../../components/AppButton';
import AppText from '../../components/AppText';
import SearchBar from '../../components/SearchBar';
import ErrorMessage from '../../components/AppForm/ErrorMessage';

// Api Imports
import dataAPI from '../../api/data';
import useApi from '../../hooks/useApi';
import userAPI from '../../api/user';

const Posts = ({navigation, route}) => {
  const state = useSelector((state) => state);
  const userEmail = state.entities.auth.data.email;
  const [error, setError] = useState(null);
  const postsApi = useApi(dataAPI.getAllPosts);
  const postApi = useApi(userAPI.userPosts);
  const [posts, setPosts] = useState([]);
  const [userPostIds, setUserPostIds] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const fetchUserPostIds = async () => {
    // User Post Ids
    const result = await postApi.request(userEmail);
    if (result.length == 0) {
      console.log('Could Not Get Post Ids');
    }
    setUserPostIds(result);
  };

  const fetchPosts = async () => {
    const result = await postsApi.request();
    if (!result.ok) {
      setError('Could not retrive posts at this moment, refresh. ');
      return;
    }
    setPosts(result.data);
  };

  useEffect(() => {
    fetchUserPostIds();
    fetchPosts();
  }, []);

  const handleSearch = (search) => {
    if (search == '') {
      fetchPosts();
      return;
    }
    const searched = posts.filter(function (item) {
      return item.title.includes(search);
    });
    setPosts(searched);
  };

  const refreshPosts = () => {
    if (posts !== []) {
      setRefresh(true);
      fetchPosts();
      setRefresh(false);
    }
  };

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <SearchBar placeholder="Post search ...." onChangeText={handleSearch} />
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
              <AppText style={{fontSize: 14}}>No Posts</AppText>
              <AppButton name="reload" onPress={fetchPosts} />
            </View>
          )}
          refreshing={refresh}
          onRefresh={refreshPosts}
          data={posts.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
          })}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <PostCard
              key={item._id}
              title={item.title}
              creator={item.creator}
              description={item.description}
              budget={item.budget}
              onPress={() =>
                navigation?.push('Post Details', {
                  item: item,
                  userPostIds: userPostIds,
                })
              }
            />
          )}
        />
      </View>
    </View>
  );
};

export default Posts;
