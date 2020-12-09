import React from 'react';
import { Dimensions } from 'react-native'

const marginHorizontal = 20;
const ComponentsStyle = {
        infoCardStyle:{ 
            marginVertical:15,
            marginHorizontal:5,
            width:Dimensions.get('window').width/3.8,
            display:"flex",
            justifyContent: 'center',
            backgroundColor:"#e8e8e8",
            borderRadius: 5,
            shadowColor:"#1b262c",
            shadowOffset: {
                width: 0,
                height: 5,
            },
            shadowOpacity: 0.34,
            shadowRadius: 6.27,
            elevation: 10,
            valueStyle: {
                fontSize : 16,
                // fontWeight : "bold",
                marginBottom: 10,
                fontFamily: 'Poppins-Bold',
            },
            subtitleStyle: {
                fontSize : 14,
                // fontWeight : "600",
                fontFamily: 'Poppins-Medium',
            },
        },
        searchBarStyle : {
            fontFamily: 'Poppins-Regular',
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
                fontSize : 18,
                fontWeight : "500",
                marginHorizontal:6,
                // fontFamily:"Poppins-Regular",
            },
           subtitleStyle: {
                fontSize : 16,
                fontWeight : "normal",
                marginHorizontal:6,
                // fontFamily:"Poppins-Regular" ,
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
                fontSize : 16,
                fontWeight : "600",
                // fontFamily: 'Poppins-Regular',
                
            },
            subtitleStyle: {
                fontSize : 14,
                // fontWeight : "normal",
                fontWeight : "600",
                // fontFamily: 'Poppins-Bold',
                
            },
        },
        AppCardStyle:{
            borderRadius : 5,
            marginHorizontal: marginHorizontal,
            height: Dimensions.get('window').height/2.4,
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
                fontSize : 16,
                fontWeight : "600",
                // fontFamily: 'Poppins-Regular',
                
            },
            subtitleStyle: {
                fontSize : 14,
                // fontWeight : "normal",
                fontWeight : "600",
                // fontFamily: 'Poppins-Bold',
                
            },
        },
        categoryCardStyle:{
            // fontFamily: 'Poppins-Medium',
            height: Dimensions.get('window').height/4,
            width:  Dimensions.get('window').width/2.3,
            backgroundColor:"#e8e8e8",
            border:"none",
            marginVertical:10,
            titleStyle: {
                fontSize : 18,
                // fontWeight : "700",
                color : "#495464",
                fontFamily: 'Poppins-Bold',
            },
            cardCover:{
                height: Dimensions.get('window').height/5,
                width:  Dimensions.get('window').width/2.3,
            }
        },
        inputStyle:{
            marginVertical : 15,
            backgroundColor: 'rgba(232, 232, 232, 0.7)',
            opacity: 0.6,
            color:"#f4f4f2",
            fontFamily: 'Poppins-Regular',
            width: Dimensions.get('window').width/1.25,
        },
        inputStyleSign:{
            marginVertical : 15,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            opacity: 0.6,
            color:"#f4f4f2",
            fontFamily: 'Poppins-Regular',
            width: Dimensions.get('window').width/1.25,
        }
    }

export default ComponentsStyle;
