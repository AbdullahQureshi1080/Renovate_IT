// Native Imports
import * as React from 'react';
import { TextInput } from 'react-native-paper';


const AppTextInput = (props) => {
  // const [text, setText] = React.useState('');

  return (
    <TextInput
      placeholder = {props.placeholder}
      label={props.label}
      // value={text}
      onBlur={props.onBlur}
      onChangeText={props.onChangeText}
      style = {props.style}
      underlineColor={props.underlineColor}
      selectionColor={props.selectionColor}
      multiline = {props.multiline}
      theme={{colors: {primary: props.textColor, text:props.textColor}}}
      disabled={props.disabled}
      textContentType={props.textContentType}
      secureTextEntry={props.secureTextEntry}
    />
  );
};

export default AppTextInput;