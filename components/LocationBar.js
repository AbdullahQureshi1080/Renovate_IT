// Native Imports
import * as React from 'react';
import { View, } from 'react-native';
import { Button, Dialog, Portal } from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import {Picker} from '@react-native-picker/picker';


const LocationBar = (props) => {
  const [visible, setVisible] = React.useState(false);
  
  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const [data,setData] = React.useState("Islamabad");

  return (
    <View style = {{marginVertical:15, alignSelf:"center", display:"flex", flexDirection:"row", backgroundColor:"#e8e8e8" }}>
    
    <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title style={{fontSize:16, fontWeight:"bold"}}>Change Location</Dialog.Title>
          <Dialog.Content>
            <Picker
              selectedValue={data}
              style={{height: 50, width:250, alignSelf:"center", fontFamily:"Poppins-Regular", fontSize:16, color:"#f4f4f2"}}
              onValueChange={(itemValue, itemIndex) =>
                setData( itemValue)
              }
              >
                <Picker.Item label="Islamabad" value="Islamabad" />
                <Picker.Item label="Rawalpindi" value="Rawalpindi" />
            </Picker>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog} style={{backgroundColor:"#f4f4f2", }} color = "#495464">Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <Button style={{backgroundColor:"#e8e8e8", width:250, }} color = "#222831" icon = {()=> <Entypo name = "location-pin" size = {18} />} onPress={showDialog} >{data}, Pakistan</Button>
    </View>
  );
};

export default LocationBar;