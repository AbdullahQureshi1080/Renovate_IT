// Native Imports

import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {Card, Title, Paragraph, List} from 'react-native-paper';
import StoreNavigator from './StoreNavigator';
import StoreHome from '../screens/StoreStack/StoreHome';
import CategoryScreen from '../screens/StoreStack/CategoryScreen';

// const title = 'Hi, Boss';
// const content =
//   'This is attempt at working with react native paper and react native core';

// const ShopScreen = ({navigation}) => (
//   <View>
//     <TouchableOpacity
//       onPress={() =>
//         navigation?.push('Details', {
//           title,
//           content,
//         })
//       }
//       style={styles.cardDistance}
//     >
//       <Card>
//         <Card.Content>
//           <Title>{title}</Title>
//           <Paragraph>{content}</Paragraph>
//         </Card.Content>
//       </Card>
//     </TouchableOpacity>
//     <TouchableOpacity
//       onPress={() =>
//         navigation?.push('Details', {
//           title,
//           content,
//         })
//       }
//     >
//       <Card theme={{roundness: 3, background: '#16697a'}}>
//         <Card.Content>
//           <Title>{title}</Title>
//           <Paragraph>{content}</Paragraph>
//         </Card.Content>
//       </Card>
//     </TouchableOpacity>
//   </View>
// );

const Stack = createStackNavigator();

const StoreStack = () => {
  return (
    <Stack.Navigator initialRouteName="Store Home">
      <Stack.Screen
        name="Store Home"
        component={StoreHome}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CategoryScreen"
        component={CategoryScreen}
        options={{
          headerShown: false,
        }}
      />
      {/* <Stack.Screen
        name="Firm Details"
        component={FirmManageScreen}
        options={{
          headerShown: false,
        }}
      /> */}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  cardDistance: {
    marginBottom: 10,
  },
});

export default StoreStack;
