import React from 'react'
import { StyleSheet, Text, View,FlatList} from 'react-native'
import { useSelector } from 'react-redux'
import PostCard from '../../components/Card/PostCard';
// import { setUserPosts } from '../../store/user';

const UserPostsScreen =({navigation})=> {
    const state = useSelector(state=>state);
//     const posts = state.entities.data.posts;
//     const userPostsIdObjs = state.entities.user.posts;
//     console.log(userPostsIdObjs);
//     const  userPostIds = userPostsIdObjs.map(({ id }) => id);
//     console.log("Ids",userPostIds);
//     console.log("All",posts);
//     // const _id = action.payload;
//     // const userPosts = posts.filter(function(post){return post._id != _id})
//    const userPosts = posts.filter((post) => userPostIds.includes(post._id))
//     console.log("UserPosts",userPosts);
    // setUserPosts()
        const posts = state.entities.user.posts;

    return (
           posts === [] ? (
            <View style={{flex:1, }}>
                <Text>No Posts</Text>
            </View>
            
            ) : (
                <View style={{flex: 1,marginVertical:10,} }>
                <FlatList 
                data = {posts}
                renderItem = {(item) => (
                 //    console.log(item)
                 <PostCard 
                 key = {item.item._id}
                 title = {item.item.title}
                 creator = {item.item.creator}
                 description = {item.item.description}
                 budget = {item.item.budget}
                 onPress = {()=>navigation.navigate('Post Details',
                 {item : item.item},
                   )}
                />
                 )} />
             </View>
                
            )     
    )
}

const styles = StyleSheet.create({})

export default UserPostsScreen;