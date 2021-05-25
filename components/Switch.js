import * as React from 'react';
import {Switch} from 'react-native-paper';

const SwitchProfile = ({isSwitchOn, onToggleSwitch}) => {
  return <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />;
};

export default SwitchProfile;
