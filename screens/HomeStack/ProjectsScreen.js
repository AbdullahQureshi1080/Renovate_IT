// Native Imports
import React, {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
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

const Tab = createMaterialTopTabNavigator();

const Projects = ({navigation}) => {
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
      setProjects(projects);
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

  return (
    <View style={{flex: 1}}>
      <SearchBar
        placeholder="Project search ...."
        onChangeText={handleSearch}
      />
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
