// Native Imports
import 'react-native-gesture-handler';
import React,{useState} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View,TouchableOpacity,StyleSheet,Text,Button,Dimensions,Modal} from 'react-native';

import CreatePostScreen from '../screens/CreateStack/CreatePostScreen';
import UpdatePostScreen from '../screens/CreateStack/UpdatePostScreen';
import AppButton from '../components/AppButton';
import CreateProjectScreen from "../screens/CreateStack/CreateProjectScreen";
import ImageGallaryScreen from '../screens/CreateStack/ImageGallaryScreen';
import CompleteProjectScreen from '../screens/CreateStack/CompleteProjectScreen';
import UpdateProjectScreen from '../screens/CreateStack/UpdateProjectScreen';
import UpdateCompleteScreen from '../screens/CreateStack/UpdateCompleteScreen';

// import PopUpModal from '../components/PopUpModal';
// import AppModal from '../components/AppModal';

var { width, height } = Dimensions.get('window');


const Options = ({ navigation }) => (
    <View style={styles.option}>
      <AppButton name="Create Post" onPress={()=>navigation.navigate("CreatePost")} /> 
      <AppButton name="Create Project" onPress={()=>navigation.navigate("CreateProject")} /> 
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
                <Stack.Screen name="UpdatePost" component={UpdatePostScreen} options={{
              headerShown:false
            }} navigation={navigation}/>
             <Stack.Screen name="CreateProject" component={CreateProjectScreen} options={{
              headerShown:false
            }} navigation={navigation}/>
            <Stack.Screen name="Gallery" component={ImageGallaryScreen} options={{
              headerShown:false
            }} />
             <Stack.Screen name="CompleteProject" component={CompleteProjectScreen} options={{
              headerShown:false
            }} />
               <Stack.Screen name="UpdateProject" component={UpdateProjectScreen} options={{
              headerShown:false
            }} />
              <Stack.Screen name="UpdateComplete" component={UpdateCompleteScreen} options={{
              headerShown:false
            }} />
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