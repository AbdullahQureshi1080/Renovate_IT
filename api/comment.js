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
import ErrorMessage from '../components/AppForm/ErrorMessage';


const Comment=(props) =>{
    const [error,setError] = useState(null)
    // const dispatch = useDispatch();
    // const state = useSelector(state => state);
    // const projects = state.entities.data.projects;
    // const project = projects.filter(project=>project._id == props.projectId);

    const [comments, setComments] = useState(null);
    // const [newComments, setNewComments] = useState(null);
    // const [projectId, setProjectId] = useState(props.projectId)
    // const projectComments = project.map(project=>project.comments);
    // setComments(comments);
    
    const commentApi = useApi(dataAPI.commentOnProject);
    const getCommentApi = useApi(dataAPI.getProjectComments);
    // const [text, setText] = useState("")
    // const users = state.userState.users;
    
   
    const fetchComments= async()=>{
        // const userId = props.userId;
        const projectId = props.projectId;
        const result = await getCommentApi.request(projectId);
        if(!result.ok){
           setError("Could not retrive comments at this moment, refresh. ")
           return;
        }
        // console.log(result.data);
        // console.log("This happens")
        setComments(new Array(result.data));
     }

    useEffect(()=>{
        fetchComments();
        // console.log("Projects in Comment Section",projects);
        // console.log("Selected Project in Comment Section",project);
        // if(newComments == null){
        //     setComments(comments);
        // }
        // else{
        //     if(newComments.length > comments.length){
        //         setComments(new Array(newComments));
        //     }
        //     else{
        //         return
        //     }
        // }
        // console.log("Project Comments",comments);
        // console.log("New Project Comments",newComments);

},[comments]);


    const onCommentSend = async (value) => {
        if(value == ""){
            return;
        }
        const userId = props.userId;
        const projectId = props.projectId;
        const result = await commentApi.request(
          userId,
     projectId,
        value,
        )
        console.log(result.data)
        if(!result.ok){
            console.log("Could not post comment")
            return;
        }
        // setComments({comments:result.data});
        console.log("After adding new",comments)
        // dispatch(addNewComment(value,projectId));
        // dispatch(addComment({value,projectId}))
        setComments(new Array (result.data))

        // value = "",
        
    }

    if(comments == null){
        return <View/>
    }

    return (
        <View style={{flex:1}}>
            {/* <Text>Hihyaaghjdgsjd</Text> */}
           
            <View>
            <ErrorMessage error={error} visible={error}/>
 <FlatList
                numColumns={1}
                horizontal={false}
                data={comments}
                keyExtractor={comment=> comment.commentorId}
                renderItem={({ item }) => (
                    <View>
                        {
                            item.map((comment,index)=>{
                                return(
                                    <View key={index.toString()} style={{flexDirection:"row", marginVertical:5, alignContent:"center", }}>
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
            //  value={}
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