import React, { useState,useEffect } from 'react'
import { StyleSheet , View, Text,Image,FlatList,Button, Dimensions} from 'react-native'
import { Avatar } from 'react-native-paper';
import {useDispatch, useSelector} from "react-redux";
import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
// import { fetchUsersData } from '../../store/actions';
import AppTextInput from '../components/AppTextInput';
import ProfessionalAvatar from '../components/ProfessionalAvatar';
import { addNewComment,addComment } from '../store/data';
import ComponentsStyle from '../styles/ComponentsStyle';
import ScreenStyle from '../styles/ScreenStyles';
import client from './client';


import dataAPI from "./data";
import useApi from "../hooks/useApi";


const Comment=(props) =>{
    const dispatch = useDispatch();
    const state = useSelector(state => state);
    const projects = state.entities.data.projects;
    const project = projects.filter(project=>project._id == props.projectId);
    console.log("Projects in Comment Section",projects);
    console.log("Selected Project in Comment Section",project);
    const [comments, setComments] = useState(projectComments);
    // const [projectId, setProjectId] = useState(props.projectId)
    const projectComments = project.map(project=>project.comments);
    // setComments(comments);
    console.log("Project Comments",comments);

    const commentApi = useApi(dataAPI.commentOnProject);
    // const [text, setText] = useState("")
    // const users = state.userState.users;

    // useEffect(() => {
    //     // setComments(comments);
    //     // function matchUserToComment(comments) {
    //     //     for (let i = 0; i < comments.length; i++) {
    //     //         if (comments[i].hasOwnProperty('user')) {
    //     //             continue;
    //     //         }
    //     if(comments.length > prevLength)
    //     //         const user = users.find(x => x.uid === comments[i].creator)
    //     //         if (user == undefined) {
    //     //             fetchUsersData(comments[i].creator, false)
    //     //         } else {
    //     //             comments[i].user = user
    //     //         }
    //     //     }
    //         setComments(comments)
    //     // }

    // },[props.projectId,comments])
    //     function matchUserToComment(comments) {
    //         for (let i = 0; i < comments.length; i++) {
    //             if (comments[i].hasOwnProperty('user')) {
    //                 continue;
    //             }

    //             const user = users.find(x => x.uid === comments[i].creator)
    //             if (user == undefined) {
    //                 fetchUsersData(comments[i].creator, false)
    //             } else {
    //                 comments[i].user = user
    //             }
    //         }
    //         setComments(comments)
    //     }


    //     if (props.route.params.project !== postId) {
    //         firebase.firestore()
    //             .collection('posts')
    //             .doc(props.route.params.uid)
    //             .collection('userPosts')
    //             .doc(props.route.params.postId)
    //             .collection('comments')
    //             .get()
    //             .then((snapshot) => {
    //                 let comments = snapshot.docs.map(doc => {
    //                     const data = doc.data();
    //                     const id = doc.id;
    //                     return { id, ...data }
    //                 })
    //                 matchUserToComment(comments)
    //             })
    //         setPostId(props.route.params.postId)
    //     } else {
    //         matchUserToComment(comments)
    //     }
    // }, [props.route.params.postId, users])


    const onCommentSend = (value) => {
        if(value == ""){
            return;
        }
        const userId = props.userId;
        const projectId = props.projectId;
        const result = commentApi.request(
          userId,
     projectId,
        value,
        )
        console.log(result.data)
        if(!result.ok){
            console.log("Could not post comment")
            return;
        }
        // setComments(result.data);
        // dispatch(addNewComment(value,props.projectId))
    }

    return (
        <View style={{flex:1}}>
            {/* <Text>Hihyaaghjdgsjd</Text> */}
           
            <View>
 <FlatList
                numColumns={1}
                horizontal={false}
                data={comments}
                keyExtractor={comment=> comment.commentorId}
                renderItem={({ item }) => (
                    <View>
                        {
                            item.map(comment=>{
                                return(
                                    <View style={{flexDirection:"row", marginVertical:5, alignContent:"center", }}>
                                       <Avatar.Image source={{uri:comment.commentorImage}} size={30}/>
                                        <AppText style={{fontFamily:"Poppins-Bold", marginHorizontal:5,}}>{comment.commentor}</AppText>
                                        <AppText style={{flexShrink:1}}>{comment.comment}</AppText>
                                    </View>
                                )
                            })
                        }
                    </View>
                )}
            />
            </View>
            <View style={{flex:1, alignSelf: 'center',}}>
            <Text style = {ScreenStyle.projectsDetailScreen.commentBox.text}>Want to Comment? </Text>
            <AppTextInput 
             style={ComponentsStyle.inputStyle}  
             label="Comment on post" 
             selectionColor="#1b262c" 
             underlineColor="#1b262c"  
             textColor="#1b262c"
             onChangeText={props.onChangeText}
             />
            <AppButton name="Comment" onPress={()=>onCommentSend(props.value)}/>
            
            </View>
           
        </View>
    )
}

const profileAvatar = {
    border:"none",
    marginVertical:15,
    alignItems: 'center',
    nameText : {
        fontSize : 18,
        marginTop : 5,
        color:"#495464",
        fontFamily: 'Poppins-Bold',
    },
    titleText : {
        fontSize : 16,
        fontWeight:"normal",
        color:"#495464",
        fontFamily: 'Poppins-Medium',
    }
}

export default Comment;