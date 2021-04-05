import React, {useState} from 'react'
import { View, Text, Modal,StyleSheet,Dimensions,TouchableWithoutFeedback,FlatList, Image,TouchableOpacity} from 'react-native'
import AppButton from '../AppButton';
import AppText from '../AppText';
import AppTextInput from '../AppTextInput';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SearchBar from '../../components/SearchBar';
// import { Touchable } from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';
const { width, height } = Dimensions.get("screen");

// const ViewUsers =({data})=>{
//     console.log("In view all users")
//     console.log(data);
//     return (
//         <View>
//             {
//                 data.map((user)=>{

//                     <View  key={user._id}>
//                         <View style={{backgroundColor:"red"}}>
//                             <Text>shkgfd</Text>
//                         </View>
//                         <Text>{user.name}</Text></View>
//         })
//             }
//         </View>
//     )
//         }
    // return data.map(function(user, i){
    //     // const jsonData = JSON.stringify(user) ;
     
    //       <View key={i} style={{backgroundColor:"red",flex:1,}}>
    //         <AppText>{user.name}</AppText>
    //         {/* <View>
    //           <Text>{news.text}</Text>
    //         </View> */}
    //       </View>
    //   })
//     return data.map((user)=>{

//             <View  key={user._id}>
//                 <View style={{backgroundColor:"red"}}>
//                     <Text>shkgfd</Text>
//                 </View>
//                 <Text>{user.name}</Text></View>
// }
//     )}


export default function SelectUserModal({onChangeText,btnName, btnCloseName, isVisible,onPressAdd, onPressCancel,handlePress,style,imageUri,data}) {
    
    // const ViewUsers =({data})=>{
    //     console.log("In view all users")
    //     console.log(data);
    //     return data.map(function(user, i){
    //         // const jsonData = JSON.stringify(user) ;
         
    //           <View key={i} style={{backgroundColor:"red",flex:1,}}>
    //             <AppText>{user.name}</AppText>
    //             {/* <View>
    //               <Text>{news.text}</Text>
    //             </View> */}
    //           </View>
    //       })
    // }
    
    return (
        <Modal visible={isVisible} presentationStyle="formSheet">
        <View style={styles.modalView}>
        <View style={{ marginVertical: 10, flexDirection:"row" , justifyContent:"space-between" }}>
            <AppButton name={btnCloseName}onPress={onPressCancel} />
            {/* <AppButton name={btnName} onPress={onPressAdd} /> */}
          </View>
          <View style={{ marginVertical: 10 }}>
              <SearchBar placeholder="Search user by email" onChangeText={onChangeText} />
              {/* <ViewUsers data={data}/> */}
              <FlatList 
               data={data}
               keyExtractor={(user, index) => index.toString()}
               renderItem = {({item}) => (
                <TouchableOpacity  onPress={()=>onPressAdd(item)} key={item._id} style={{backgroundColor:"rgba(73, 84, 100, 0.1)",flex:1, flexDirection:"row", marginVertical:8, borderRadius:10,}}>
                {/* <View  key={item._id}style={{backgroundColor:"rgba(73, 84, 100, 0.1)",flex:1, flexDirection:"row", marginVertical:8, borderRadius:10,}}> */}
                    <Image source={{uri:item.image?item.image:"https://via.placeholder.com/150"}} style={{ marginLeft:5,height:60, width:60, borderRadius:60, alignSelf: 'center',}}/>
                    <View style={{marginHorizontal:5}}>
                           <AppText style={{fontSize:16}}>{item.name}</AppText>
                            <AppText style={{fontSize:14}}>{item.email}</AppText>
                            <AppText style={{fontSize:14}}>{item.jobcategory}</AppText>
                    </View>
                {/* </View> */}
                </TouchableOpacity>
      )}
      />
          {/* <TouchableWithoutFeedback onPress={handlePress}>
      <View style={{...styles.container, ...style}}>
        {!imageUri && (
          <MaterialIcons color="white" name="add" size={40} />
        )}
        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      </View>
    </TouchableWithoutFeedback> */}
          </View>
          {/* {
              data.map((user)=>{
                return(
                    <View id={user._id}><Text>{user}</Text></View>
                )
            })
          } */}
        </View>
      </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
    backgroundColor: "grey",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    height: 100,
    width: 100,
    overflow: "hidden",
  },
    modalView: {
      // height: "50%",
      margin: 20,
      backgroundColor: "#e8e8e8",
      borderRadius: 20,
      padding: 35,
      // alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      height:"90%"
    },
  });