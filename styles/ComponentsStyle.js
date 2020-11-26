import React from 'react';
import { Dimensions } from 'react-native'

const marginHorizontal = 20;
const ComponentsStyle = {
        searchBarStyle : {
            marginHorizontal:marginHorizontal,
            marginVertical:15,
            borderRadius: 5,
            shadowColor:"#1b262c",
            shadowOffset: {
                width: 0,
                height: 5,
            },
            shadowOpacity: 0.34,
            shadowRadius: 6.27,
            elevation: 10,
            backgroundColor: "#e8e8e8",
            border:"none",
            // fontSize:12,
        },
        projectCardStyle:{
            borderRadius : 5,
            marginHorizontal: marginHorizontal,
            marginVertical : 10,
            backgroundColor: "#e8e8e8",
            border:"none",
            shadowColor:"#1b262c",
            shadowOffset: {
                width: 0,
                height: 5,
            },
            shadowOpacity: 0.34,
            shadowRadius: 6.27,
            elevation: 10,
            titleStyle: {
                fontSize : 20,
                fontWeight : "600",
                marginHorizontal:6,
            },
           subtitleStyle: {
                fontSize : 16,
                fontWeight : "normal",
                marginHorizontal:6,
            }
        },
        postCardStyle:{
            borderRadius : 5,
            marginHorizontal: marginHorizontal,
            marginVertical : 10,
            backgroundColor: "#e8e8e8",
            shadowColor:"#1b262c",
            border:"none",
            shadowOffset: {
                width: 0,
                height: 5,
            },
            shadowOpacity: 0.34,
            shadowRadius: 6.27,
            elevation: 10,
            titleStyle: {
                fontSize : 20,
                fontWeight : "600",
                
            },
            subtitleStyle: {
                fontSize : 16,
                fontWeight : "normal",
                
            },
        },
        professionalAvatar:{
            // marginHorizontal:marginHorizontal-5,
            marginVertival:100,
            // width:100,
            // height:100,
            border:"none",
            marginVertical:15,
            nameText : {
                fontSize : 16,
                marginTop : 5,
                fontWeight:"bold",
                color:"#495464"
            },
            titleText : {
                fontSize : 14,
                fontWeight:"normal",
                color:"#495464",
                width:Dimensions.get('window').width/3,

                // marginTop : 5,
            }
        },
        categoryCardStyle:{
            height: Dimensions.get('window').height/4,
            width:  Dimensions.get('window').width/2.3,
            backgroundColor:"#e8e8e8",
            border:"none",
            marginVertical:10,
            titleStyle: {
                fontSize : 18,
                fontWeight : "bold",
                color : "#495464",
            },
            cardCover:{
                height: Dimensions.get('window').height/5,
                width:  Dimensions.get('window').width/2.3,
            }
        },
        inputStyle:{
            marginVertical : 15,
            backgroundColor: "#E8E8E8",
            width: Dimensions.get('window').width/1.25,
        }
    }

export default ComponentsStyle;
