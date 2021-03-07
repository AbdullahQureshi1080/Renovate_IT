// import React,{useRef, useState,useEffect} from 'react';
// // import { FlatList } from 'react-native-gesture-handler';
// import {
//     StatusBar,
//     FlatList,
//     Image,
//     Animated,
//     Text,
//     View,
//     Dimensions,
//     StyleSheet,
//     TouchableOpacity,
//     Easing,
//     SafeAreaViewBase,
//     SafeAreaView,
// } from 'react-native';
// import AppButton from '../../components/AppButton';
// const { width, height } = Dimensions.get('screen');
// // import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// // import { add } from 'react-native-reanimated';


// const ImageGallery = ({images,index}) => {
//     const topRef = useRef();
//     const thumbRef = useRef();
//     // const [images, setImages]=useState([]);
//     const [activeIndex, setActiveIndex]=useState(index);
//     // const [imageCard, setImageCard] = useState({imgCard:""});
//     const Image_Size = 80; 
//     const spacing = 12;
//     // const PROJECT_DATA = route.params.projectData;
//     // const GALLARY_IMAGES =  route.params.projectData.gallaryImages;

//     // useEffect(()=>{
//     //     sendData=()=>{
//     //         parentCallBack(activeIndex);
//     //     }

//     // },[activeIndex])

    
//     // const onCompleteProject = ()=>{
//     //     const thumbnailImage = imageCard == ""?imageCard:GALLARY_IMAGES[0] ;
//     //     const dataToScreen = {...PROJECT_DATA, thumbnailImage}
//     //     navigation.navigate("CompleteProject",{projectData:dataToScreen})
//     //   }

//       const scrollToActiveIndex = (index)=>{
//           // scroll flatlist
//           setActiveIndex(index);
      
//           topRef?.current?.scrollToOffset({
//               offset:index*width,
//               animated:true,
//           })
//         //   scrollFlatlists
//         if(index*(Image_Size + spacing) - Image_Size/2 > width/2){
//             thumbRef?.current?.scrollToOffset({
//                 offset:index*(Image_Size + spacing) - width/2 + Image_Size/2,
//                 animated:true,
//             })
//         }else{
//             thumbRef?.current?.scrollToOffset({
//                 offset:0,
//                 animated:true,
//             })
//         }
//       }
      
//     return (
//     //   <View style={{flex:1}}>
//     <>
//             <FlatList
//             ref = {topRef}
//             data ={images}
//             keyExtractor={item=>item.key}
//             horizontal
//             pagingEnabled
//             onMomentumScrollEnd={
//                 ev=>{
//                 scrollToActiveIndex(Math.floor(ev.nativeEvent.contentOffset.x/width))
//             }
//         }
//             showsVerticalScrollIndicator= {false}
//             renderItem={({item})=>(
//                 <View style={{width:width,height:height/1.25}}>
//                     <Image 
//                     source={{uri:item.value}}
//                     style={[StyleSheet.absoluteFillObject]}/>
//                 </View>
//             )}
//             />
//              <FlatList
//             ref = {thumbRef}
//             data ={images}
//             keyExtractor={item=>item.key.toString()}
//             horizontal
//             showsVerticalScrollIndicator= {false}
//             style={{position:"absolute", bottom:20}}
//             contentContainerStyle={{padding:spacing}}
//             renderItem={({item,index})=>(
//                 // <View style={{width,height}}>
//                     <TouchableOpacity
//                     onPress={()=>scrollToActiveIndex(index)}
//                     >
//                         <Image 
//                     source={{uri:item.value}}
//                     style={{
//                         width:Image_Size, 
//                         height:Image_Size, 
//                         borderRadius:12,
//                         marginRight:spacing,
//                         borderWidth:2,
//                         borderColor:activeIndex === index ? "#f9813a" : 'transparent',
//                     }}/>
//                     </TouchableOpacity>
//             )}
//             />
//             </>
//             // </View>
//     );
// };

//   export default ImageGallery;