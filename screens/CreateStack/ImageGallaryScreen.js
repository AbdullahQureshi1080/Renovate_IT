import React,{useRef, useState,useEffect} from 'react';
// import { FlatList } from 'react-native-gesture-handler';
import {
    StatusBar,
    FlatList,
    Image,
    Animated,
    Text,
    View,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    Easing,
    SafeAreaViewBase,
    SafeAreaView,
} from 'react-native';



import AppButton from '../../components/AppButton';
import ImageGallery from '../../components/Image/ImageGallery';
const { width, height } = Dimensions.get('screen');

// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import { add } from 'react-native-reanimated';


const ImageGallaryScreen = ({navigation,route}) => {
    const topRef = useRef();
    const thumbRef = useRef();
    // const activeIndex = useRef();
    // const [images, setImages]=useState([]);
    const [activeIndex, setActiveIndex]=useState(0);
    const [imageCard, setImageCard] = useState({imgCard:""});
    const Image_Size = 80; 
    const spacing = 12;
    const PROJECT_DATA = route.params.projectData;
    const GALLARY_IMAGES =  route.params.projectData.gallaryImages;

    useEffect(()=>{
        // setImages(arrImages);
        console.log("Data From Project Create Screen",PROJECT_DATA);
        console.log("Data For Image Gallary",GALLARY_IMAGES);
        const imageForThumbnail = GALLARY_IMAGES[activeIndex];
        setImageCard({imgCard:imageForThumbnail});
       console.log("After Change",imageCard);

    },[activeIndex])

    
    const onCompleteProject = ()=>{
        if(PROJECT_DATA.data.hasOwnProperty("_id")){
            console.log("Previous data",PROJECT_DATA)
            const newThumbnailImage = imageCard == ""?imageCard:GALLARY_IMAGES[0] ;
            // const gallaryFormImages = dataNode.filter(item=>item.type == "image");
            const formData = {
              _id:PROJECT_DATA.data._id, 
              title:PROJECT_DATA.data.title,
              description:PROJECT_DATA.data.description,
              creator:PROJECT_DATA.data.creator,
              creatorImage:PROJECT_DATA.data.creatorImage,
              data:PROJECT_DATA.data.data,
              gallaryImages:PROJECT_DATA.gallaryImages,
              thumbnailImage:newThumbnailImage
            }

            const formdataToScreen = {...formData}
            navigation.navigate("UpdateComplete",{projectData:formdataToScreen})
          }
          else{
              console.log("No Ids so a new Project")
                // const gallaryImages = dataNode.filter(item=>item.type == "image");
                // const dataToScreen = {data:dataNode,gallaryImages}
                // navigation.navigate("Gallery",{projectData:dataToScreen})
      
              const thumbnailImage = imageCard == ""?imageCard:GALLARY_IMAGES[0] ;
              const dataToScreen = {...PROJECT_DATA, thumbnailImage}
              navigation.navigate("CompleteProject",{projectData:dataToScreen})
          }
      }

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
        <View style={{ flex: 1, backgroundColor: '#000' }}>
            <View style={{marginVertical:10}}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 10, }}>
                     <AppButton name="back"   onPress={()=>navigation.goBack()} />
                     <AppButton name="next"   onPress={onCompleteProject} />
                 </View>
            <FlatList
            ref = {topRef}
            data ={GALLARY_IMAGES}
            keyExtractor={item=>item.key}
            horizontal
            pagingEnabled
            onMomentumScrollEnd={
                ev=>{
                scrollToActiveIndex(Math.floor(ev.nativeEvent.contentOffset.x/width))
            }
        }
            showsVerticalScrollIndicator= {false}
            renderItem={({item})=>(
                <View style={{width:width,height:height/1.25}}>
                    <Image 
                    source={{uri:item.value}}
                    style={[StyleSheet.absoluteFillObject]}/>
                </View>
            )}
            />
             <FlatList
            ref = {thumbRef}
            data ={GALLARY_IMAGES}
            keyExtractor={item=>item.key.toString()}
            horizontal
            showsVerticalScrollIndicator= {false}
            style={{position:"absolute", bottom:20}}
            contentContainerStyle={{padding:spacing}}
            renderItem={({item,index})=>(
                // <View style={{width,height}}>
                    <TouchableOpacity
                    onPress={()=>scrollToActiveIndex(index)}
                    >
                        <Image 
                    source={{uri:item.value}}
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
    );
};

  export default ImageGallaryScreen;