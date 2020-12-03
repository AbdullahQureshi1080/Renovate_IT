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
const HomeScreen = ({ navigation }) => (
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
  
  const DetailsScreen = (props) => {
    return (
      <List.Section>
        <List.Subheader>{title}</List.Subheader>
        <List.Item title={content} />
      </List.Section>
    );
  };
  

const Stack = createStackNavigator();

const ChatStackNav = () => {
    return(
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Details" component={DetailsScreen} />   
        </Stack.Navigator>
    );
}


const styles = StyleSheet.create({
  cardDistance:{
    marginBottom:10,
  }
})

export default ChatStackNav;