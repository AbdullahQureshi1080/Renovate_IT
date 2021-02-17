import React from 'react'
import { StyleSheet, Text, View,FlatList} from 'react-native'
import { useSelector } from 'react-redux'
import PostCard from '../../components/Card/PostCard';

const UserPostsScreen =()=> {
    const state = useSelector(state=>state);
    const posts = state.entities.user.posts;
    console.log(posts);
    return (
           <View style={{flex: 1}}>
               <FlatList 
               data = {posts}
               renderItem = {(item) => (
               <PostCard 
               key = {item.item._id}
               title = {item.item.title}
               creator = {item.item.creator}
               description = {item.item.description}
               budget = {item.item.budget}
               onPress = {()=>navigation?.push('Post Details',{item : item.item}, )}
               />
                )} />
            </View>
    )
}

const styles = StyleSheet.create({})

export default UserPostsScreen;