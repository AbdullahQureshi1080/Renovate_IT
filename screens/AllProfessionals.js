import * as React from 'react';
import {View,Text,} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { professionals } from '../assets/DummyData';
import ProfessionalAvatar from '../components/ProfessionalAvatar';
import ScreenStyles from '../styles/ScreenStyles'

const AllProfessionals = () =>{
    return(
        <View style={ScreenStyles.allProfessionals}>
          <FlatList 
      data = {professionals}
      numColumns={2}
      renderItem = {(item) => (
          <View style = {{flex:1, justifyContent:"space-between"}}>
              <ProfessionalAvatar 
       key = {item.item.key}
       name = {item.item.name}
       title = {item.item.title}
       onPress = {()=>navigation?.push('Post Details',
       {item : item.item},
         )}
      />
          </View>
      
      )}
      />
        </View>
     );
}

export default AllProfessionals;