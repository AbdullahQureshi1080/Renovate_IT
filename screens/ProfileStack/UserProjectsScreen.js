import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

// Components Imports
import ProjectCard from '../../components/Card/ProjectCard';
import AppButton from '../../components/AppButton';
import AppText from '../../components/AppText';
import ErrorMessage from '../../components/AppForm/ErrorMessage';

//  Api Imports
import dataAPI from '../../api/data';
import useApi from '../../hooks/useApi';
import userAPI from '../../api/user';

export default UserProjectsScreen = ({navigation, route, email}) => {
  const [error, setError] = useState(null);
  const state = useSelector((state) => state);
  // const userEmail = state.entities.auth.data.email;
  const projectsApi = useApi(dataAPI.getAllProjects);
  const projectApi = useApi(userAPI.userProjects);
  const [projects, setProjects] = useState([]);
  const [userProjectIds, setUserProjectIds] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const useremail = route.params.email;
  const fetchUserProjectIds = async () => {
    // User Post Ids
    const result = await projectApi.request(useremail);
    if (result.length == 0) {
      console.log('No Projects for the User');
    }
    setUserProjectIds(result);
  };

  const fetchProjects = async () => {
    const result = await projectsApi.request();
    if (!result.ok) {
      setError('Could not retrive projects at this moment, refresh. ');
      return;
    }
    const userProjects = result.data.filter((project) =>
      userProjectIds.includes(project._id),
    );
    setProjects(userProjects);
  };

  useEffect(() => {
    fetchUserProjectIds();
  }, []);
  useEffect(() => {
    fetchProjects();
  }, [userProjectIds]);

  const refreshProjects = () => {
    if (projects !== []) {
      setRefresh(true);
      fetchProjects();
      setRefresh(false);
    }
  };

  return (
    <View style={{flex: 1}}>
      <FlatList
        // horizontal={true}
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
              navigation.navigate('Project Details', {
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

const styles = StyleSheet.create({});
