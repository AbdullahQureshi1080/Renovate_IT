import React from 'react';
import { View,Text,ScrollView,Image, ImageBackground, Dimensions} from 'react-native';

const TabNavigatorStyle = {
    mainTabBarStyle:{
    showIcon: true,
    showLabel: false,
    activeTintColor:"#1b262c",
    inactiveTintColor:"#495464",
    indicatorStyle: {
        height: '100%',
        backgroundColor: '#e8e8e8'
    },
    shifting:true,
    pressColor:"#495464",
    style : {
    height:60,
    backgroundColor:'#F4F4F2',
    marginHorizontal:20,
    marginTop:15,
    borderRadius:5,
    }
},
subTabBarStyle:{
    showIcon: true,
    showLabel: true,
    activeTintColor:"#1b262c",
    inactiveTintColor:"#495464",
    indicatorStyle: {
      height: '100%',
      backgroundColor: '#e8e8e8'
    },
    style : {
        backgroundColor:'#F4F4F2',
        fontWeight:'bold',
        fontSzie : 50,
        marginHorizontal:20,
        marginBottom:15,
        borderRadius: 5,
        fontFamily: 'Poppins-Medium',
    }
},
userProfileTab:{
    scrollEnabled:true,
    activeTintColor:"#1b262c",
    inactiveTintColor:"#495464",
    indicatorStyle: {
        height: '10%',
        backgroundColor: '#1b262c'
    },
    style : {
     backgroundColor:'#F4F4F2',
     },
     labelStyle:{
         fontSize:12,
         fontWeight:"800",
         fontFamily: 'Poppins-Regular',
     },
     tabStyle: { width: Dimensions.get('window').width/3 }
     
},
userProjectsTab:{
    swipeEnabled:true,
    shifting:true,
    activeTintColor:"#1b262c",
    inactiveTintColor:"#495464",
    indicatorStyle: {
        height: '10%',
        backgroundColor: '#1b262c'
    },
    style : {
     backgroundColor:'#F4F4F2',
     width: Dimensions.get('window').width/2,
     alignSelf: 'center',
     fontFamily: 'Poppins-Regular',
     },
     labelStyle:{
         fontSize:12,
         fontWeight:"800",
         fontFamily: 'Poppins-Regular',
     },
}
}

export default TabNavigatorStyle;
