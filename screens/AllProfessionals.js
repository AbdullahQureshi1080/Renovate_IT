import * as React from 'react';
import {View,Text,} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { professionals } from '../assets/DummyData';
import ProfessionalAvatar from '../components/ProfessionalAvatar';
import SearchBar from '../components/SearchBar';
import ScreenStyles from '../styles/ScreenStyles'

const AllProfessionals = (navigation) =>{
    return(
        <View style={ScreenStyles.allProfessionals}>
          <SearchBar placeholder = "What kind of services you need?"/>
          {/* <Button icon = ""/> */}
          <FlatList 
            data = {professionals}
             numColumns={3}
            renderItem = {(item) => (
              <View style = {{flex:1, flexDirection:"column", justifyContent:'space-between', marginHorizontal:15}}>
              <ProfessionalAvatar 
                key = {item.item.key}
                name = {item.item.name}
                title = {item.item.title}
                // onPress = {()=>navigation?.push('')}
            />
          </View>
      )}
      />
        </View>
     );
}

export default AllProfessionals;