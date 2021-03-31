// Native Imports
import 'react-native-gesture-handler';
import React,{useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

// Components Imports
import PostCard from '../../components/Card/PostCard';
// import {postsDummyData} from '../../assets/DummyData';
import dataAPI from '../../api/data';
import useApi from '../../hooks/useApi';
// import { setAppPosts } from '../../store/data';
import AppButton from '../../components/AppButton';
import AppText from '../../components/AppText';
// import SearchBar from '../../components/SearchBar';
import ErrorMessage from '../../components/AppForm/ErrorMessage';
// import { getFocusedRouteNameFromRoute } from '@react-navigation/native';


const UserPostsScreen =({navigation})=> {
    const state = useSelector(state=>state);
    const userPostsIdObjs = state.entities.user.postIds;
   
    const  userPostIds = userPostsIdObjs.map(({ id }) => id);
   
   //  const _id = action.payload;
   //  const userPosts = posts.filter(function(post){return post._id != _id})
  
      
   const [error,setError] = useState(null)
   const postsApi = useApi(dataAPI.getAllPosts)


   const [posts,setPosts]=useState([]);
   const [refresh,setRefresh]=useState(false);
   
   const fetchPosts = async()=>{
      const result = await postsApi.request();
      if(!result.ok){
         setError("Could not retrive posts at this moment, refresh. ")
         return;
      }
      // console.log(result.data);
      // console.log("This happens")
      const userPosts = result.data.filter((post) => userPostIds.includes(post._id))
      setPosts(userPosts);
   }

   useEffect(()=>{
      fetchPosts();

   },[])

//    const handleSearch = (search) => {
//       // console.log(route.params);
//       if(search == ""){
//       //   setPosts(posts);
//       fetchPosts();
//         return
//       }
//       const searched = posts.filter(function (item) {
//         return item.title.includes(search);
//       })
//       setPosts(searched)
//       // .map(function ({ Country, Slug, ISO2 }) {
//       //   return { Country, Slug, ISO2 };
//       // });
  
//     }; 

    const refreshPosts=()=>{
       if(posts !== []){
          setRefresh(true)
          fetchPosts();
          setRefresh(false);
       }
    }
   
return(
   <View style={{flex:1}} >
      {/* {
         posts == [] ? 
      (    */}
         
        
             {/* <SearchBar placeholder = "Post search ...."  onChangeText={handleSearch}/> */}
            
             <FlatList 
            // style={{marginVertical:50}}
            // inverted
            ListEmptyComponent ={
               () => (
                  <View style={{flex:1, justifyContent:"center", alignItems:"center", alignSelf:"center"}}>
                     <ErrorMessage error={error} visible={error}/>
                     <AppText  style={{fontSize:14,}}>
                          No Posts 
                     </AppText>
                     <AppButton name="reload" onPress={fetchPosts}/>
                  </View>
              )
            } 
            refreshing={refresh}
            onRefresh={refreshPosts}
            // data = {posts}
            data={ posts.sort((a, b) => {return new Date(b.date) - new Date(a.date);         })}
            keyExtractor={(item, index) => index.toString()}
            renderItem = {({item}) => (
            <PostCard 
             key = {item._id}
             title = {item.title}
             creator = {item.creator}
             description = {item.description}
             budget = {item.budget}
             onPress = {()=>navigation?.push('Post Details',
             {item : item},
               )}
            />
            )}
            />
   </View>
   )
   // return (
    //        posts.length === 0 ? (
    //         <View style={{flex:1, justifyContent:"center"}}>
    //             <AppText style={{alignSelf: 'center' , fontSize:15,}}>You have no posts</AppText>
    //             <AppButton name="Create Post" onPress={()=>navigation.navigate("CreatePost")}/>
    //         </View>
            
    //         ) : (
    //             <View style={{flex: 1,marginVertical:10,} }>
    //             <FlatList 
    //             inverted
    //             data = {posts}
    //             keyExtractor={(item, index) => index.toString()}
    //             renderItem = {({item}) => (
    //              //    console.log(item)
    //              <PostCard 
    //              key = {item._id}
    //              title = {item.title}
    //              creator = {item.creator}
    //              description = {item.description}
    //              budget = {item.budget}
    //              onPress = {()=>navigation.navigate('Post Details',
    //              {item : item},
    //                )}
    //             />
    //              )} />
    //          </View>
                
    //         )     
    // )
}

const styles = StyleSheet.create({})

export default UserPostsScreen;