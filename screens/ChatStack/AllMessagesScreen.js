// Native Imports
import React from 'react';
import {View, StyleSheet,FlatList} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FloatingAction } from "react-native-floating-action";
import Entypo from 'react-native-vector-icons/Entypo';

// Components Imports
import ListViewItem from '../../components/List/ListViewItem';


const messages = [

    {id:"1",name:"Abdullah Najam",descrition:"The lastest message will be displaye here", image:require('../../assets/p1.jpg')},
    {id:"2",name:"Abdul Karim",descrition:"The lastest message will be displaye here", image:require('../../assets/p1.jpg')},
    {id:"3",name:"James Taylor",descrition:"The lastest message will be displaye here", image:require('../../assets/p1.jpg')},
    {id:"4",name:"Felicity Smoke",descrition:"The lastest message will be displaye here", image:require('../../assets/p1.jpg')},
]



const AllMessagesScreen = ({navigation}) => {
return(
    <View style={styles.mainContainer}>
        <FlatList 
            data = {messages}
            keyExtractor={message => message.id.toString()}
            renderItem = {(item) => (
                <TouchableOpacity>
                    <ListViewItem
                        name={item.item.name}
                        subtitle={item.item.descrition}
                        image={item.item.image}/>
                </TouchableOpacity>
      )}
      />
      <FloatingAction
            distanceToEdge = {vertical=15}
            floatingIcon={<Entypo name="new-message" size={30} color="#F4F4F2" style={{alignSelf:"center",}}/>}
            onPressMain ={()=> console.log("Yo")}
            color = "#495464"
            overlayColor = "none"
            position="right"

        />
    </View>    
);
}

const styles = StyleSheet.create({
    mainContainer : {
        marginHorizontal:20,
        marginVertical:10,
        flex:1,
    },
    itemContainer:{
        flexDirection:"row",
        display:"flex",
    },
    subtitleText:{
        fontFamily:"Poppins-Regular", 
        marginLeft:5,
    }
})

export default AllMessagesScreen;

