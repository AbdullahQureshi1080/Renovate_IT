import React from 'react'
import { StyleSheet, Text, View,FlatList} from 'react-native'
import { useSelector } from 'react-redux'
import PostCard from '../../components/Card/PostCard';

const UserPostsScreen =({navigation})=> {
    const state = useSelector(state=>state);
    const posts = state.entities.user.posts;
    console.log(posts);
    return (
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
}

const styles = StyleSheet.create({})

export default UserPostsScreen;