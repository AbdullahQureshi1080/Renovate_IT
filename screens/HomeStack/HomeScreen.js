// Native Imports
import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setUserPosts, setUserProjects} from '../../store/user';

// Components Imports
import HomeNavigator from '../../navigation/HomeNavigator';

// Api Imports
import useApi from '../../hooks/useApi';
import userAPI from '../../api/user';

const HomeScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const email = state.entities.auth.data.email;
  const posts = state.entities.data.posts;
  const projects = state.entities.data.projects;
  const userPostsIdObjs = state.entities.user.postIds;
  const userProjectsIdObjs = state.entities.user.projectIds;

  const [postIds, setPostIds] = useState([]);
  const [projectIds, setProjectIds] = useState([]);

  // const userPostIds = userPostsIdObjs.map(({id}) => id);
  // const userProjectIds = userProjectsIdObjs.map(({id}) => id);

  // const userPosts = posts.filter((post) => userPostIds.includes(post._id));

  // const userProjects = projects.filter((project) =>
  //   userProjectIds.includes(project._id),
  // );

  //  const _id = action.payload;
  //  const userPosts = posts.filter(function(post){return post._id != _id})

  // ------------------------------------------------

  const userPostsApi = useApi(userAPI.userPosts);
  const userProjectsApi = useApi(userAPI.userProjects);

  const getIdsForPostsProjects = async () => {
    const userPostsIds = await userPostsApi.request(email);
    const userProjectsIds = await userProjectsApi.request(email);
    setPostIds(userPostsIds);
    setProjectIds(userProjectsIds);
  };

  const userPostIds = postIds.map(({id}) => id);
  const userProjectIds = projectIds.map(({id}) => id);

  const userPosts = posts.filter((post) => userPostIds.includes(post._id));

  const userProjects = projects.filter((project) =>
    userProjectIds.includes(project._id),
  );

  useEffect(() => {
    getIdsForPostsProjects();
    dispatch(setUserPosts(userPosts));
    dispatch(setUserProjects(userProjects));
  }, []);

  useEffect(() => {
    console.log('User Post Ids Obj', userPostsIdObjs);
    console.log('User Project Ids Obj', userProjectsIdObjs);
    console.log('Post Ids', userPostIds);
    console.log('All Post', posts);
    console.log('Project Ids', userProjectIds);
    console.log('All Projects', projects);
    // console.log('UserPosts', userPosts);
    // console.log('UserProjects', userProjects);
    dispatch(setUserPosts(userPosts));
    dispatch(setUserProjects(userProjects));
  }, [projects, posts]);

  return <HomeNavigator />;
};

export default HomeScreen;
