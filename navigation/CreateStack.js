// Native Imports
import 'react-native-gesture-handler';
import React,{useState} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View,TouchableOpacity,StyleSheet,Text,Button,Dimensions,Modal} from 'react-native';
// import {
//   Card,
//   Title,
//   Paragraph,
//   List,
// } from 'react-native-paper';

import CreatePostScreen from '../screens/CreateStack/CreatePostScreen';
import AppButton from '../components/AppButton';
import PopUpModal from '../components/PopUpModal';
// import AppModal from '../components/AppModal';

var { width, height } = Dimensions.get('window');


const Options = ({ navigation }) => (
    <View style={styles.option}>
      {/* <PopUpModal/> */}
      <AppButton name="Create Post" onPress={()=>navigation.navigate("CreatePost")} /> 
    </View>
)
  


const Stack = createStackNavigator();

const CreateStack = ({navigation}) => {
    return(
        <Stack.Navigator initialRouteName="Options">
            <Stack.Screen name="Options" component={Options}  options={{
              headerShown:false
            }} navigation={navigation}/>
            <Stack.Screen name="CreatePost" component={CreatePostScreen} options={{
              headerShown:false
            }} navigation={navigation}/>
        </Stack.Navigator>
    );
}


const styles = StyleSheet.create({
  cardDistance:{
    marginBottom:10,
  },
  option:{
    flex:1,
    justifyContent:"center",
    alignContent:"center",
    alignSelf:"center"
  }
})

export default CreateStack;