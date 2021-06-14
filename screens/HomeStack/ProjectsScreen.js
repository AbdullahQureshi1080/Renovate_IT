// Native Imports
import React, {useEffect, useState} from 'react';
import {View, Text, Alert, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import TabNavigatorStyle from '../../styles/TabNavigatorStyle';

// Components Imports
import ProjectCard from '../../components/Card/ProjectCard';
import Posts from './PostsScreen';
import SearchBar from '../../components/SearchBar';
import AppButton from '../../components/AppButton';
import AppText from '../../components/AppText';
import ErrorMessage from '../../components/AppForm/ErrorMessage';

//  Api Imports
import dataAPI from '../../api/data';
import useApi from '../../hooks/useApi';
import userAPI from '../../api/user';

import {Chip} from 'react-native-paper';

const Tab = createMaterialTopTabNavigator();

const Projects = ({navigation}) => {
  const [selected, setSelected] = useState(false);
  const [categoryOne, setCategoryOne] = useState('');
  const [categoryTwo, setCategoryTwo] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [selectedTwo, setSelectedTwo] = useState(false);
  const [selectedIndexTwo, setSelectedIndexTwo] = useState(-1);
  const [selectedColor, setSelectedColor] = useState('#495464');
  const [error, setError] = useState(null);
  const state = useSelector((state) => state);
  const userEmail = state.entities.auth.data.email;
  const projectsApi = useApi(dataAPI.getAllProjects);
  const projectApi = useApi(userAPI.userProjects);
  const [projects, setProjects] = useState([]);
  const [userProjectIds, setUserProjectIds] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const fetchUserProjectIds = async () => {
    // User Post Ids
    const result = await projectApi.request(userEmail);
    if (result.length == 0) {
      console.log('Project Ids not available');
    }
    setUserProjectIds(result);
  };

  const fetchProjects = async () => {
    const result = await projectsApi.request();
    if (!result.ok) {
      setError('Could not retrive projects at this moment, refresh. ');
      return;
    }
    setProjects(result.data);
  };

  useEffect(() => {
    fetchUserProjectIds();
    fetchProjects();
  }, []);

  // -----------------------------------------------------------------
  const handleSearch = (search) => {
    if (search == '') {
      fetchProjects();
      return;
    }
    const searched = projects.filter(function (item) {
      return item.title.includes(search);
    });
    setProjects(searched);
  };

  const refreshProjects = () => {
    if (projects !== []) {
      setRefresh(true);
      fetchProjects();
      setRefresh(false);
    }
  };

  const dataSource = [
    'Interior Design',
    'Architecture',
    'Building',
    'Renovation',
  ];

  const secondDataSource = ['Interior', 'Kitchen', 'House', 'Room'];

  const handleChip = (category, index) => {
    if (selected) {
      setSelected(false);
      setSelectedIndex(-1);
      fetchProjects();
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
      fetchProjects();
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
    const searched = projects.filter(function (item) {
      return item.category === category;
    });
    console.log('Searched Projects', searched);
    if (searched.length == 0) {
      fetchProjects();
      return;
    }
    setProjects(searched);
  };

  const chipBasedSearchTwo = (category) => {
    const search = category.toLowerCase();
    setSelectedTwo(true);
    const searched = projects.filter(function (item) {
      return item.title.toLowerCase().includes(search);
    });
    console.log('Searched Projects', searched);
    if (searched.length == 0) {
      fetchProjects();
      return;
    }
    setProjects(searched);
  };

  const combinedSearch = () => {
    const searchedOne = projects.filter(function (item) {
      return item.category === categoryOne;
    });
    console.log('Searched Projects', searchedOne);
    const searchedTwo = projects.filter(function (item) {
      return item.title.toLowerCase().includes(categoryTwo);
    });
    console.log('Searched Projects', searchedTwo);

    const mergedSearchedProjects = searchedOne.concat(searchedTwo);
    if (mergedSearchedProjects.length == 0) {
      fetchProjects();
      return;
    }
    setProjects(mergedSearchedProjects);
  };
  return (
    <View style={{flex: 1}}>
      <SearchBar
        placeholder="Project search ...."
        onChangeText={handleSearch}
      />

      {/* ------- */}

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
                {item}
              </Chip>
            </View>
          )}
        />
      </View>

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
                {item}
              </Chip>
            </View>
          )}
        />
      </View>

      {/* -------- */}

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
            <AppText style={{fontSize: 14}}>No Projects</AppText>
            <AppButton name="reload" onPress={fetchProjects} />
          </View>
        )}
        refreshing={refresh}
        onRefresh={refreshProjects}
        data={projects.sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        })}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <ProjectCard
            key={item._id}
            title={item.title}
            creator={item.creator}
            description={item.description}
            creatorImage={item.creatorImage}
            coverImage={item.data.thumbnailImage.value}
            onPress={() =>
              navigation?.push('Project Details', {
                item: item,
                userProjectIds: userProjectIds,
              })
            }
          />
        )}
      />
    </View>
  );
};

const ProjectsScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName={Projects}
      tabBarOptions={TabNavigatorStyle.subTabBarStyle}
    >
      <Tab.Screen name="Projects" component={Projects} />
      <Tab.Screen name="Posts" component={Posts} />
    </Tab.Navigator>
  );
};

export default ProjectsScreen;
