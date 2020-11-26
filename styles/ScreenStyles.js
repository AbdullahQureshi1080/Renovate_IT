import React from 'react';
import { Dimensions } from 'react-native'

const marginHorizontal = 20;
const ScreenStyle = {
      userprofileScreen:{
        marginHorizontal:marginHorizontal-5,
        marginVertical: 10,
      },
      professionalsScreen:{
        marginHorizontal:20,
        marginVertical:15,
          headTitle : {
              fontSize:20,
              fontWeight:"500",
          },
        viewBox : {
          display:"flex", 
          flexDirection:"column", 
          justifyContent:"space-between"
        }
        
      },
      allProfessionals:{
        marginHorizontal:marginHorizontal,
        marginVertical:15,
        flex: 1,
        justifyContent : 'center',
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
          titleText:
          {fontSize:20, fontWeight: "800",}
        },
        AvatarBox : {
          // marginVertical:1,
          display:'flex', 
          flexDirection:"row", 
          // backgroundColor:"#e8e8e8"
          nameText:{
            fontSize:16, 
            alignSelf:"center", 
            marginHorizontal: 10, 
            fontWeight:"bold",
            color:"#495464"
          }
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
        },
        infoBox:{
          display:'flex', 
          flexDirection:"row", 
        }
      },
      postsDetailScreen:{
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
          titleText:
          {fontSize:20, fontWeight: "800",}
        },
        AvatarBox : {
          // marginVertical:1,
          display:'flex', 
          flexDirection:"row", 
          // backgroundColor:"#e8e8e8"
          nameText:{
            fontSize:16, 
            alignSelf:"center", 
            marginHorizontal: 10, 
            fontWeight:"bold",
            color:"#495464"
          }
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
        },
        infoBox:{
          display:'flex', 
          flexDirection:"row", 
        }
      }
    }

export default ScreenStyle;
