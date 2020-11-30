import * as React from 'react';
import { TextInput } from 'react-native-paper';
const InputText = (props) => {
  const [text, setText] = React.useState('');

  return (
    <TextInput
      placeholder = {props.placeholder}
      label={props.label}
      value={text}
      onChangeText={text => setText(text)}
      style = {props.style}
      underlineColor={props.underlineColor}
      selectionColor={props.selectionColor}
      multiline = {props.multiline}
      clearButtonMode = "always"
      theme={{colors: {primary: props.textColor, text:props.textColor}}}
      disabled={props.disabled}
    />
  );
};

export default InputText;