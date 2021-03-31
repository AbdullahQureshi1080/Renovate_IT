import React,{useRef,useState} from 'react'
import { View, Text, Modal,StyleSheet,Dimensions,FlatList,Image, TouchableOpacity} from 'react-native'
import AppButton from '../AppButton';
// import AppText from '../AppText';
// import ImageInput from '../Image/ImageInput';

const { width, height } = Dimensions.get("screen");
export default function ImageModal({isVisible,images,onPressClose}) {
    const topRef = useRef();
    const thumbRef = useRef();
    console.log("Images in Modal Gallray", images);
    // const activeIndex = useRef();
    // const [images, setImages]=useState([]);
    const [activeIndex, setActiveIndex]=useState(0);
    const Image_Size = 80; 
    const spacing = 12;
 
    const scrollToActiveIndex = (index)=>{
        // scroll flatlist
        setActiveIndex(index);
    
        topRef?.current?.scrollToOffset({
            offset:index*width,
            animated:true,
        })
      //   scrollFlatlists
      if(index*(Image_Size + spacing) - Image_Size/2 > width/2){
          thumbRef?.current?.scrollToOffset({
              offset:index*(Image_Size + spacing) - width/2 + Image_Size/2,
              animated:true,
          })
      }else{
          thumbRef?.current?.scrollToOffset({
              offset:0,
              animated:true,
          })
      }
    }
    return (
        <Modal visible={isVisible} presentationStyle="formSheet">
             <View style={{ flex: 1, backgroundColor: '#000' }}>
            <View style={{marginVertical:10}}>
                <View style={{ flexDirection: "row", justifyContent: "flex-end", marginHorizontal: 10, }}>
                     <AppButton name="Close"   onPress={onPressClose} />
                     {/* <AppButton name="next"   onPress={onCompleteProject} /> */}
                 </View>
            <FlatList
            ref = {topRef}
            data ={images}
            // keyExtractor={item=>item.Math.random()*10}
            horizontal
            pagingEnabled
            onMomentumScrollEnd={
                ev=>{
                scrollToActiveIndex(Math.floor(ev.nativeEvent.contentOffset.x/width))
            }
        }
            showsVerticalScrollIndicator= {false}
            renderItem={({item,index})=>(
                <View style={{width:width,height:height/1.25}} key={index}>
                    <Image 
                    source={{uri:item}}
                    style={[StyleSheet.absoluteFillObject]}/>
                </View>
            )}
            />
             <FlatList
            ref = {thumbRef}
            data ={images}
            // keyExtractor={item=>item.key.toString()}
            horizontal
            showsVerticalScrollIndicator= {false}
            style={{position:"absolute", bottom:20}}
            contentContainerStyle={{padding:spacing}}
            renderItem={({item,index})=>(
                // <View style={{width,height}}>
                    <TouchableOpacity
                    onPress={()=>scrollToActiveIndex(index)}
                    key={index}
                    >
                        <Image 
                    source={{uri:item}}
                    style={{
                        width:Image_Size, 
                        height:Image_Size, 
                        borderRadius:12,
                        marginRight:spacing,
                        borderWidth:2,
                        borderColor:activeIndex === index ? "#f9813a" : 'transparent',
                    }}/>
                    </TouchableOpacity>
                // </View>
            )}
            />
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
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
  });