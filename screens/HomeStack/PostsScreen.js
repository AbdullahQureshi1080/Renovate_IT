// Native Imports
import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import {useSelector} from 'react-redux';

import {Chip} from 'react-native-paper';

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
  const [selected, setSelected] = useState(false);
  const [categoryOne, setCategoryOne] = useState('');
  const [categoryTwo, setCategoryTwo] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [selectedTwo, setSelectedTwo] = useState(false);
  const [selectedIndexTwo, setSelectedIndexTwo] = useState(-1);
  const [selectedColor, setSelectedColor] = useState('#495464');

  const state = useSelector((state) => state);
  const tokenNotification = state.entities.auth.notificationToken;
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
      console.log('Post Ids not available');
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
    console.log('The Notification Token:', tokenNotification);
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

  const dataSource = ['50000', '150000', '2500000', '25000000'];

  const secondDataSource = ['50000', '150000', '2500000', '25000000'];

  const handleChip = (category, index) => {
    if (selected) {
      setSelected(false);
      setSelectedIndex(-1);
      fetchPosts();
      return;
    }
    if (selected && selectedTwo) {
      combinedSearch();
    }
    setCategoryOne(category);
    setSelectedIndex(index);
    chipBasedSearch(category);
  };

  const handleChipTwo = (category, index) => {
    if (selectedTwo) {
      setSelectedTwo(false);
      setSelectedIndexTwo(-1);
      fetchPosts();
      return;
    }
    if (selected && selectedTwo) {
      combinedSearch();
    }
    setCategoryTwo(category);
    setSelectedIndexTwo(index);
    chipBasedSearchTwo(category);
  };

  const chipBasedSearch = (category) => {
    setSelected(true);
    const searched = posts.filter(function (item) {
      return parseInt(item.budget) >= parseInt(category);
    });
    console.log('Searched Posts', searched);
    // if (searched.length == 0) {
    //   fetchPosts();
    //   return;
    // }
    setPosts(searched);
  };

  const chipBasedSearchTwo = (category) => {
    const search = category.toLowerCase();
    setSelectedTwo(true);
    const searched = posts.filter(function (item) {
      return parseInt(item.budget) <= parseInt(category);
    });
    console.log('Searched Posts', searched);
    // if (searched.length == 0) {
    //   fetchPosts();
    //   return;
    // }
    setPosts(searched);
  };

  const combinedSearch = () => {
    const searchedOne = posts.filter(function (item) {
      return parseInt(item.budget) >= parseInt(categoryOne);
    });
    console.log('Searched Posts', searchedOne);
    const searchedTwo = posts.filter(function (item) {
      return parseInt(item.budget) <= parseInt(categoryTwo);
    });
    console.log('Searched Posts', searchedTwo);

    const mergedSearchedPosts = searchedOne.concat(searchedTwo);
    // if (mergedSearchedPosts.length == 0) {
    //   fetchPosts();
    //   return;
    // }
    setPosts(mergedSearchedPosts);
  };
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <SearchBar placeholder="Post search ...." onChangeText={handleSearch} />
        <AppText style={{marginHorizontal: 20}}>Budget +</AppText>
        <View
          style={{flexDirection: 'row', marginHorizontal: 15, paddingRight: 30}}
        >
          <FlatList
            horizontal={true}
            data={dataSource}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => (
              <View
                style={{
                  margin: 5,
                  flexWrap: 'wrap',
                  alignItems: 'flex-start',
                }}
              >
                <Chip
                  key={index}
                  selected={selectedIndex === index ? selected : false}
                  selectedColor="white"
                  mode="outlined" //changing display mode, default is flat.
                  height={30} //give desirable height to chip
                  textStyle={{
                    color: 'white',
                    fontSize: 13,
                  }} //label properties
                  style={{
                    backgroundColor:
                      selectedIndex === index ? selectedColor : '#e8e8e8',
                  }} //display diff color BG
                  onPress={() => handleChip(item, index)}
                >
                  {`>${item}`}
                </Chip>
              </View>
            )}
          />
        </View>

        <AppText style={{marginHorizontal: 20}}>Budget -</AppText>
        <View
          style={{flexDirection: 'row', marginHorizontal: 15, paddingRight: 30}}
        >
          <FlatList
            horizontal={true}
            data={secondDataSource}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => (
              <View
                style={{
                  margin: 5,
                  flexWrap: 'wrap',
                  alignItems: 'flex-start',
                }}
              >
                <Chip
                  key={index}
                  selected={selectedIndexTwo === index ? selectedTwo : false}
                  selectedColor="white"
                  mode="outlined" //changing display mode, default is flat.
                  height={30} //give desirable height to chip
                  textStyle={{
                    color: 'white',
                    fontSize: 13,
                  }} //label properties
                  style={{
                    backgroundColor:
                      selectedIndexTwo === index ? selectedColor : '#e8e8e8',
                  }} //display diff color BG
                  onPress={() => handleChipTwo(item, index)}
                >
                  {`<${item}`}
                </Chip>
              </View>
            )}
          />
        </View>
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
