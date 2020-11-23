import React from 'react';

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
        },
        projectCardStyle:{
            borderRadius : 5,
            marginHorizontal: marginHorizontal,
            marginVertical : 10,
            backgroundColor: "#e8e8e8",
            titleStyle: {
                fontSize : 20,
                fontWeight : "600",
            },
           subtitleStyle: {
                fontSize : 16,
                fontWeight : "normal",
            }
        },
        postCardStyle:{
            borderRadius : 5,
            marginHorizontal: marginHorizontal,
            marginVertical : 10,
            backgroundColor: "#e8e8e8",
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
            // marginHorizontal:marginHorizontal,
            marginVertical:15,
            nameText : {
                fontSize : 16,
                marginTop : 5,
            }
        }
    }

export default ComponentsStyle;
