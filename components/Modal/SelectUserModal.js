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

export default function SelectUserModal({onChangeText,btnName, btnCloseName, isVisible,onPressAdd, onPressCancel,handlePress,style,imageUri,data}) {
    
    return (
        <Modal visible={isVisible} presentationStyle="formSheet">
        <View style={styles.modalView}>
        <View style={{ marginVertical: 10, flexDirection:"row" , justifyContent:"space-between" }}>
            <AppButton name={btnCloseName}onPress={onPressCancel} />
          </View>
          <View style={{ marginVertical: 10 }}>
              <SearchBar placeholder="Search user by email" onChangeText={onChangeText} />
              {/* <ViewUsers data={data}/> */}
              <FlatList 
               data={data}
               keyExtractor={(user, index) => index.toString()}
               renderItem = {({item}) => (
                <View  key={item._id} style={{flexDirection:"row",alignItems: 'center',}} >
                    <View style={{backgroundColor:"rgba(73, 84, 100, 0.1)",flex:1, flexDirection:"row", marginVertical:8, borderRadius:10,}}>
                    <Image source={{uri:item.image?item.image:"https://via.placeholder.com/150"}} style={{ marginLeft:5,height:60, width:60, borderRadius:60, alignSelf: 'center',}}/>
                    <View style={{marginHorizontal:5}}>
                           <AppText style={{fontSize:16}}>{item.name}</AppText>
                            <AppText style={{fontSize:14}}>{item.email}</AppText>
                            <AppText style={{fontSize:14}}>{item.jobcategory}</AppText>
                    </View>
                    </View>
                    <View style={{backgroundColor:"#1b262c", marginHorizontal:5, borderRadius:20,}}>
                    <TouchableOpacity onPress={()=>onPressAdd(item)} >
                    <MaterialIcons name="navigate-next" size={30} color="#e8e8e8" />
                    </TouchableOpacity>
                    </View>
                {/* </View> */}
                </View>
      )}
      />
          </View>
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