// Native Imports
import * as React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Card} from 'react-native-paper';

// Styles Imports
import ComponentsStyle from '../styles/ComponentsStyle';
import AppText from './AppText';

const AppCard = (props) => {
  return (
    <Card style={ComponentsStyle.AppCardStyle}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 15,
          marginVertical: 10,
        }}
      >
        <AppText style={ComponentsStyle.AppCardStyle.titleStyle}>
          {props.title}
        </AppText>
        <TouchableOpacity
          onPress={props.onPress}
          style={{borderBottomWidth: 1}}
        >
          <AppText style={ComponentsStyle.AppCardStyle.subtitleStyle}>
            {props?.buttonName}
          </AppText>
        </TouchableOpacity>
      </View>
      <View style={{marginVertical: 15}}>{props.component}</View>
    </Card>
  );
};

export default AppCard;
