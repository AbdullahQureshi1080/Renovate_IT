// Native Imports

import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View,TouchableOpacity,StyleSheet} from 'react-native';
import {
  Card,
  Title,
  Paragraph,
  List,
} from 'react-native-paper';

const title = "Hi, Boss";
const content = "This is attempt at working with react native paper and react native core";

const ShopScreen = ({ navigation }) => (
    <View>
      <TouchableOpacity
      onPress={() =>
        navigation?.push('Details', {
          title,
          content,
        })
      }
      style = {styles.cardDistance}
    >
      <Card>
        <Card.Content>
          <Title>{title}</Title>
          <Paragraph>{content}</Paragraph>
        </Card.Content>
      </Card>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() =>
        navigation?.push('Details', {
          title,
          content,
        })
      }
    >
      <Card theme={{ roundness: 3, background : "#16697a"}}>
        <Card.Content>
          <Title>{title}</Title>
          <Paragraph>{content}</Paragraph>
        </Card.Content>
      </Card>
    </TouchableOpacity>
    
    </View>
  );
  
  

const Stack = createStackNavigator();

const StoreStack= () => {
    return(
        <Stack.Navigator initialRouteName="Shop">
            <Stack.Screen name="Shop" component={ShopScreen} />  
        </Stack.Navigator>
    );
}


const styles = StyleSheet.create({
  cardDistance:{
    marginBottom:10,
  }
})

export default StoreStack;