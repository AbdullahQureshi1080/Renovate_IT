// Native Imports
import React, {useState, useEffect} from 'react';
import {View, Text, Dimensions, FlatList, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Components Imports
// import {professionals} from '../../assets/DummyData';
import ProfessionalAvatar from '../../components/ProfessionalAvatar';
import SearchBar from '../../components/SearchBar';

// Styles Imports
import ScreenStyles from '../../styles/ScreenStyles';

// Api Imports
import useApi from '../../hooks/useApi';
import dataAPI from '../../api/data';
import {useSelector} from 'react-redux';

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
  // const [professionals, setProfessionals] = React.useState(
  //   route.params.professionals,
  // );
  const [category, setCategory] = useState(
    route.params.professionals[0].jobcategory,
  );
  const [professionals, setProfessionals] = useState([]);
  const state = useSelector((state) => state);
  const email = state.entities.auth.data.email;
  const professionalsApi = useApi(dataAPI.getSpecificCategoryProfessional);

  useEffect(() => {
    fetchProfessionals();
  }, []);

  const fetchProfessionals = async () => {
    const result = await professionalsApi.request(email, category);
    if (!result.ok) {
      console.log('Error Fetching Data');
    }
    setProfessionals(result.data);
  };
  const handleSearch = (search) => {
    if (search == '') {
      fetchProfessionals();
      // setProfessionals(route.params.professionals);
      return;
    }
    const searched = professionals.filter(function (item) {
      return item.name.includes(search);
    });
    setProfessionals(searched);
  };

  return (
    <View style={ScreenStyles.allProfessionals}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: 10,
        }}
      >
        <TouchableOpacity
          style={{alignSelf: 'center'}}
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons name="backspace" size={35} color="#1b262c" />
        </TouchableOpacity>
      </View>

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
