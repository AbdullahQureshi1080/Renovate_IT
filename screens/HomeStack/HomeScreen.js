// Native Imports
import 'react-native-gesture-handler';
import React,{ useEffect } from 'react';
import {useDispatch,useSelector} from "react-redux";
import TopNavigator from '../../navigation/TopNavigator';
import { setUserPosts,setUserProjects } from '../../store/user';
import { BackHandler,Alert } from 'react-native';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

//   useEffect(() => {
//     BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
//     return () => {
//       BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
//     };
//   }, []);

const HomeScreen = ({navigation,route}) =>{
 const dispatch = useDispatch();
 const state = useSelector(state=>state);
 const posts = state.entities.data.posts;
 const projects = state.entities.data.projects;
 const userPostsIdObjs = state.entities.user.postIds;
 const userProjectsIdObjs = state.entities.user.projectIds;

 const  userPostIds = userPostsIdObjs.map(({ id }) => id);
 const  userProjectIds = userProjectsIdObjs.map(({ id }) => id);

//  const _id = action.payload;
//  const userPosts = posts.filter(function(post){return post._id != _id})
const userPosts = posts.filter((post) => userPostIds.includes(post._id))

 const userProjects = projects.filter((project) => userProjectIds.includes(project._id))


// //  For Exiting App
//  function handleBackButtonClick() {
//     let routeName = getFocusedRouteNameFromRoute(route) ?? 'AppHome';
//     console.log(routeName);
//     if (routeName === 'AppHome') {
//         BackHandler.exitApp();
//         return true;
//     }
//     navigation.goBack()
//     return true
//     // else return false;
//     // else{
//     //     navigation.goBack();
//     //     return true;
//     // }
//   }

useEffect(()=>{
    console.log("User Post Ids Obj",userPostsIdObjs);
    console.log("User Project Ids Obj",userProjectsIdObjs);
    console.log("Post Ids",userPostIds);
    console.log("All Post",posts);
    console.log("Project Ids",userProjectIds);
    console.log("All Projects",projects);
    console.log("UserPosts",userPosts);
    console.log("UserProjects",userProjects);
     dispatch(setUserPosts(userPosts));
     dispatch(setUserProjects(userProjects));
    
 },[projects,posts])


//   useEffect(() => {
//     BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
//     return () => {
//       BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
//     };
//   }, []);

//   useEffect(() => {
//     const backAction = () => {
//       Alert.alert("Hold on!", "Do you want to exit the app?", [
//         {
//           text: "Cancel",
//           onPress: () => null,
//           style: "cancel"
//         },
//         { text: "YES", onPress: () => BackHandler.exitApp() }
//       ]);
//       return true;
//     };

//     const backHandler = BackHandler.addEventListener(
//       "hardwareBackPress",
//       backAction
//     );

//     return () => backHandler.remove();
//   }, []);

return(
    <TopNavigator/>
);

}

export default HomeScreen;