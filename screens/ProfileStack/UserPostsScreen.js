import React from 'react'
import { StyleSheet, Text, View,FlatList} from 'react-native'
import { useSelector } from 'react-redux'
import AppButton from '../../components/AppButton';
import AppText from '../../components/AppText';
import PostCard from '../../components/Card/PostCard';
// import { setUserPosts } from '../../store/user';

const UserPostsScreen =({navigation})=> {
    const state = useSelector(state=>state);
    const posts = state.entities.user.posts;

    return (
           posts.length === 0 ? (
            <View style={{flex:1, justifyContent:"center"}}>
                <AppText style={{alignSelf: 'center' , fontSize:15,}}>You have no posts</AppText>
                <AppButton name="Create Post" onPress={()=>navigation.navigate("CreatePost")}/>
            </View>
            
            ) : (
                <View style={{flex: 1,marginVertical:10,} }>
                <FlatList 
                data = {posts}
                renderItem = {({item}) => (
                 //    console.log(item)
                 <PostCard 
                 key = {item._id}
                 title = {item.title}
                 creator = {item.creator}
                 description = {item.description}
                 budget = {item.budget}
                 onPress = {()=>navigation.navigate('Post Details',
                 {item : item},
                   )}
                />
                 )} />
             </View>
                
            )     
    )
}

const styles = StyleSheet.create({})

export default UserPostsScreen;