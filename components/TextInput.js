import * as React from 'react';
import { TextInput } from 'react-native-paper';
import ComponentsStyle from '../styles/ComponentsStyle';

const InputText = () => {
  const [text, setText] = React.useState('');

  return (
    <TextInput
      label="Leave a comment"
      value={text}
      onChangeText={text => setText(text)}
      style = {ComponentsStyle.inputStyle}
    //   error = {true}
     underlineColor="#1b262c"
     selectionColor="#1b262c"
     multiline = {true}
     clearButtonMode = "always"
    />
  );
};

export default InputText;