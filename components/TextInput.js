import * as React from 'react';
import { TextInput } from 'react-native-paper';
import ComponentsStyle from '../styles/ComponentsStyle';

const InputText = (props) => {
  const [text, setText] = React.useState('');

  return (
    <TextInput
      placeholder = {props.placeholder}
      label={props.label}
      value={text}
      onChangeText={text => setText(text)}
      style = {ComponentsStyle.inputStyle}
    //   error = {true}
     underlineColor="#1b262c"
     selectionColor="#1b262c"
     multiline = {props.multiline}
     clearButtonMode = "always"
     theme={{colors: {primary: '#1b262c'}}}
    />
  );
};

export default InputText;