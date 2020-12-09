import * as React from 'react';
import {View,Text,Dimensions, StyleSheet,Image} from 'react-native';


const ListViewItem = ({name,image,subtitle}) => {
 return(
     <View style={styles.container}>
        <Image style={styles.image} source={image}/>
       <View>
        <Text style={styles.titleText}>{name}</Text>
        <Text style={styles.subtitleText}>{subtitle}</Text>
       </View>
     </View>
 );
}

const styles = StyleSheet.create({
    container:{
        display:"flex",
        flexDirection:"row",
        marginVertical:10,
    },
    image:{
        width:70,
        height:70,
        borderRadius:35,
        marginRight:10,
    },
    titleText:{
        fontFamily:"Poppins-Bold", 
        // alignSelf:"center",
        marginLeft:5,
    },
    subtileText:{
        fontFamily:"Poppins-Regular", 
        // alignSelf:"center",
        marginLeft:5,
    }
})

export default ListViewItem;