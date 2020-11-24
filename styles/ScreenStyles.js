import React from 'react';
import { Dimensions } from 'react-native'

const marginHorizontal = 20;
const ScreenStyle = {
      professionalsScreen:{
        marginHorizontal:20,
        marginVertical:15,
          headTitle : {
              fontSize:20,
              fontWeight:"500",
          }
      },
      projectsDetailScreen:{
        marginHorizontal:marginHorizontal,
        imageStyle:{
          marginVertical:15,
          height: Dimensions.get('window').height/2,
          width:  Dimensions.get('window').width,
        },
        viewBox : {
          // marginVertical:1,
          marginTop:10,
          display:'flex', 
          flexDirection:"row", 
          justifyContent:"space-between",
          // backgroundColor:"#e8e8e8",
        },
        AvatarBox : {
          // marginVertical:1,
          display:'flex', 
          flexDirection:"row", 
          // backgroundColor:"#e8e8e8"
        },
        contentText:{
          marginVertical:10, 
          fontSize:16,
        },
        commentBox:{
          marginVertical:25,
          text : {
            fontSize: 18,
            fontWeight: 'bold',
          }
        }
      }
    }

export default ScreenStyle;
