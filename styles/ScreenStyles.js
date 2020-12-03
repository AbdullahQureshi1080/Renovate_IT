import React from 'react';
import { Dimensions } from 'react-native'

const marginHorizontal = 20;
const ScreenStyle = {
      // fontFamily:"Poppins-Regular" ,
      profileEditScreen:{
        fontFamily: 'Poppins-Regular',
        marginHorizontal: marginHorizontal,
        // alignContent: 'center',
        // alignItems: 'center',
        alignSelf: 'center',
        inputView:{
          marginVertical:5,
          width: Dimensions.get('window').width/1.25,
        },
        textLabel:{
          fontSize:16,
          // fontWeight:"bold",
          fontFamily: 'Poppins-Bold',
          color:"#495464"
        },
      },
      userprofileScreen:{
        // fontFamily: 'Poppins-Regular',
        marginHorizontal:marginHorizontal,
        marginVertical: 10,
        color:"#495464",
        userAbout:{
          marginVertical:15,
          userAboutTitle:{
            marginVertical:5,
            fontSize:20,
            // fontWeight:"bold",
            color:"#495464",
            fontFamily: 'Poppins-Bold',
          },
          userAboutText:{
            marginVertical:5,
            fontSize:18,
            fontWeight:"normal",
            color:"#495464",
            fontFamily: 'Poppins-Regular',
          }
        },
        
      },
      professionalsScreen:{
        // fontFamily: 'Poppins-Regular',
        marginHorizontal:20,
        marginVertical:15,
          headTitle : {
              fontSize:20,
              // fontWeight:"bold",
              fontFamily: 'Poppins-Bold',
              color:"#495464",

          },
        viewBox : {
          display:"flex", 
          flexDirection:"column", 
          justifyContent:"space-between"
        }
        
      },
      allProfessionals:{
        fontFamily: 'Poppins-Medium',
        marginHorizontal:marginHorizontal,
        marginVertical:15,
        flex: 1,
        justifyContent : 'center',
      },
      projectsDetailScreen:{
        fontFamily: 'Poppins-Regular',
        marginHorizontal:marginHorizontal,
        imageStyle:{
          marginVertical:15,
          height: Dimensions.get('window').height/2,
          width:  Dimensions.get('window').width,
        },
        viewBox : {
          marginTop:10,
          display:'flex', 
          flexDirection:"row", 
          justifyContent:"space-between",
          titleText:
          {fontSize:18, 
            // fontWeight: "800",
          fontFamily: 'Poppins-Bold', 
           color:"#495464",
}
        },
        AvatarBox : {
          display:'flex', 
          flexDirection:"row", 
          nameText:{
            fontSize:16, 
            alignSelf:"center", 
            marginHorizontal: 10, 
            // fontWeight:"bold",
            color:"#495464",
            fontFamily: 'Poppins-Bold',
          }
        },
        contentText:{
          marginVertical:10, 
          fontSize:16,
          fontFamily:'Poppins-Regular',
          color:"#495464",

        },
        commentBox:{
          marginVertical:25,
          text : {
            fontSize: 18,
            fontWeight: 'bold',
            fontFamily: 'Poppins-Regular',
            color:"#495464",
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
          marginTop:10,
          display:'flex', 
          flexDirection:"row", 
          justifyContent:"space-between",
          titleText:
          {
            fontSize:20, 
            // fontWeight: "800", 
            fontFamily: 'Poppins-Bold',
            color:"#495464",
          }
        },
        AvatarBox : {
          display:'flex', 
          flexDirection:"row", 
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
          fontFamily: 'Poppins-Regular',
          color:"#495464",

        },
      },
        infoBox:{
          display:'flex', 
          flexDirection:"row", 
        }
      }

export default ScreenStyle;
