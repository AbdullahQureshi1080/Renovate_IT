// Native Imports
import * as React from 'react';
import {View, Text, Dimensions, FlatList} from 'react-native';

// Components Imports
import {professionals} from '../../assets/DummyData';
import ProfessionalAvatar from '../../components/ProfessionalAvatar';
import SearchBar from '../../components/SearchBar';

// Styles Imports
import ScreenStyles from '../../styles/ScreenStyles';

const profileAvatar = {
  marginVertival: 100,
  border: 'none',
  marginVertical: 15,
  justifyContent: 'center',
  nameText: {
    fontSize: 14,
    marginTop: 5,
    color: '#495464',
    fontFamily: 'Poppins-Bold',
  },
  titleText: {
    fontSize: 12,
    color: '#495464',
    width: Dimensions.get('window').width / 3,
    fontFamily: 'Poppins-Medium',
  },
};

const AllProfessionals = ({navigation, route}) => {
  const [professionals, setProfessionals] = React.useState(
    route.params.professionals,
  );
  const [search, setSearch] = React.useState([]);

  const handleSearch = (search) => {
    if (search == '') {
      setProfessionals(route.params.professionals);
      return;
    }
    const searched = professionals.filter(function (item) {
      return item.name.includes(search);
    });
    setProfessionals(searched);
  };

  return (
    <View style={ScreenStyles.allProfessionals}>
      <FlatList
        ListHeaderComponent={
          <SearchBar
            placeholder="Search by name ...."
            onChangeText={handleSearch}
          />
        }
        data={professionals}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        renderItem={({item}) => (
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'space-between',
              marginHorizontal: 15,
            }}
          >
            <ProfessionalAvatar
              key={item._id}
              name={item.name}
              title={item.jobtitle}
              style={profileAvatar}
              size={90}
              imageUri={item.image}
              onPress={() =>
                navigation.navigate('Profile', {
                  screen: 'Other User',
                  params: {_id: item._id, user: item},
                })
              }
            />
          </View>
        )}
      />
    </View>
  );
};

export default AllProfessionals;
