import React, {useState} from 'react'
import { View, Text,Linking, Modal,StyleSheet,Dimensions,TouchableOpacity,Image } from 'react-native'
import AppButton from '../AppButton';
import AppText from '../AppText';
// import AppTextInput from '../AppTextInput';
import GallaryModal from "../Modal/GallaryModal";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


import {Avatar } from "react-native-elements";
const { width, height } = Dimensions.get("screen");
export default function ViewModal({btnName,btnCloseName, onPressCancel,onPressDelete,isVisible, data}) {
  const [isGallaryVisible, setIsGallaryVisible] = useState(false);
  console.log(data);
  const  loadInBrowser = (url) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  }
    return (
        <Modal visible={isVisible} presentationStyle="formSheet">
        <View style={styles.modalView}>
        <View style={{ marginVertical: 10, flexDirection:"row" , justifyContent:"space-between" }}>
            <AppButton name={btnCloseName}onPress={onPressCancel} />
            <AppButton name={btnName} onPress={onPressDelete} />
          </View>
          <View style={{ marginVertical: 10 }}>
              <View style={{flexDirection:"row"}}> 
              <Avatar
               rounded
               source={{
                    uri: data.noterImage,
                 }}
                 containerStyle={{
                     marginHorizontal:5,
                    //  alignSelf:"center",
                 }}
                 />
              <AppText style={{ marginVertical: 10, fontSize:18, fontFamily:"Poppins-Bold", color:"#495464", alignSelf: 'center',}}>{data.noter}</AppText>
              </View>
            <AppText style={{ marginVertical: 10, fontSize:20, fontFamily:"Poppins-Regular", color:"#495464"}}>{data.note}</AppText>
            <GallaryModal isVisible={isGallaryVisible} images={data.images} onPressClose={()=>setIsGallaryVisible(false)}/>
            {/* <View style={{flexDirection:"row", marginVertical:10,}}> */}
              {(!data.images && !data.documents)?
              (
                <View/>
              )
              :
              (
                <View>
                {(data.images && data.documents)?
                  (
                    <View>
                      <View style={{flexDirection:"row"}}>
                    {data?.images.map(image=>
                        <TouchableOpacity style={styles.container} onPress={()=>setIsVisible(true)}>
                           <Image source = {{uri:image}} style={styles.image} />
                        </TouchableOpacity>
                    )}
                  </View>
                  <View style={{flexDirection:"row"}}>
                  {data?.documents.map(image=>
                      <TouchableOpacity style={styles.container} onPress={()=>loadInBrowser(image)}>
                         <MaterialCommunityIcons color="white" name="pdf-box" size={40} />
                      </TouchableOpacity>
        
                  )}
                </View> 
                    </View>
                    
                  ):(
                    <View>
                      {(data.images && !data.documents)?
                      (
                        <View style={{flexDirection:"row"}}>
                    {data?.images.map(image=>
                        <TouchableOpacity style={styles.container} onPress={()=>setIsVisible(true)}>
                           <Image source = {{uri:image}} style={styles.image} />
                        </TouchableOpacity>
                    )}
                  </View>
                      )
                      :
                      (
                        <View style={{flexDirection:"row"}}>
                  {data?.documents.map(image=>
                      <TouchableOpacity style={styles.container} onPress={()=>loadInBrowser(image)}>
                         <MaterialCommunityIcons color="white" name="pdf-box" size={40} />
                      </TouchableOpacity>
        
                  )}
                </View> 
                      )}
                    </View>
                  )
                }
               
                </View>

              )}
        {/* </View> */}
        {/* <View style={{flexDirection:"row"}}>
          {data?.documents.map(image=>
              <TouchableOpacity style={styles.container} onPress={()=>loadInBrowser(image)}>
                 <MaterialCommunityIcons color="white" name="pdf-box" size={40} />
              </TouchableOpacity>

          )}
        </View> */}
          </View>
          
        </View>
      </Modal>
    )
}

const styles = StyleSheet.create({
    modalView: {
      // height: "50%",
      margin: 20,
      backgroundColor: "#e8e8e8",
      borderRadius: 20,
      padding: 35,
      // alignItems: "center",
      shadowColor: "#e5e5e5",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    container: {
      backgroundColor: "grey",
      borderRadius: 15,
      display:"flex",
      flexDirection:"row",
      alignItems: "center",
      justifyContent: "center",
      height: 100,
      width: 100,
      overflow: "hidden",
      marginHorizontal:5,
    },
    image: {
      height: "100%",
      width: "100%",
    },
  });