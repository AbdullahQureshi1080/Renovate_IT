import * as React from 'react';
import { View, } from 'react-native';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import TextInput from '../components/TextInput';
import {Picker} from '@react-native-picker/picker';

const LocationBar = (props) => {
  const [visible, setVisible] = React.useState(false);
  
  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const [data,setData] = React.useState("Islamabad");

  return (
    <View style = {{marginVertical:15, alignSelf:"center", display:"flex", flexDirection:"row", }}>
    
    <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title style={{fontSize:16, fontWeight:"bold"}}>Change Location</Dialog.Title>
          <Dialog.Content>
            <Picker
              selectedValue={data}
              style={{height: 50, width:250, alignSelf:"center", fontFamily:"Poppins-Regular", fontSize:16,}}
              onValueChange={(itemValue, itemIndex) =>
                setData( itemValue)
              }
              >
                <Picker.Item label="Islamabad" value="Islamabad" />
                <Picker.Item label="Rawalpindi" value="Rawalpindi" />
            </Picker>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog} style={{backgroundColor:"#495464", }} color = "#e8e8e8">Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <Button style={{backgroundColor:"#e8e8e8", width:250, }} color = "#222831" icon = {()=> <Entypo name = "location-pin" size = {18} />} onPress={showDialog} >{data}, Pakistan</Button>
    </View>
  );
};

export default LocationBar;