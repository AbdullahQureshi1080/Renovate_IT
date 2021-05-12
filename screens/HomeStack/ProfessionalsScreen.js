// Native Imports
import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, Dimensions} from 'react-native';

// Components Imports
import ProfessionalAvator from '../../components/ProfessionalAvatar';
// import LocationBar from '../../components/LocationBar';
import CategoryCard from '../../components/Card/CategoryCard';

// Styles Imports
import ScreenStyles from '../../styles/ScreenStyles';
import {useSelector} from 'react-redux';

// Api Imports
import useApi from '../../hooks/useApi';
import dataAPI from '../../api/data';

const profileAvatar = {
  border: 'none',
  marginVertical: 15,
  justifyContent: 'center',
  nameText: {
    fontSize: 16,
    marginTop: 5,
    fontWeight: 'bold',
    color: '#495464',
    fontFamily: 'Poppins-Bold',
  },
  titleText: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#495464',
    width: Dimensions.get('window').width / 3,
    fontFamily: 'Poppins-Medium',
    alignSelf: 'center',
  },
};

const Professionals = ({navigation}) => {
  const [professionals, setProfessionals] = useState([]);
  const state = useSelector((state) => state);
  const email = state.entities.auth.data.email;
  const professionalsApi = useApi(dataAPI.getAllUsers);

  useEffect(() => {
    fetchProfessionals();
  }, []);

  const fetchProfessionals = async () => {
    const result = await professionalsApi.request(email);
    if (!result.ok) {
      console.log('Error Fetching Data');
    }
    setProfessionals(result.data);
  };

  const categoryScreen = (category) => {
    const arrProfessionals = [];
    for (var i = 0; i < professionals.length; i++) {
      if (professionals[i].jobcategory == category) {
        arrProfessionals.push(professionals[i]);
      }
    }
    navigation.navigate('All Professionals', {
      title: category,
      professionals: arrProfessionals,
    });
  };

  return (
    <ScrollView style={ScreenStyles.professionalsScreen}>
      <Text style={ScreenStyles.professionalsScreen.headTitle}>
        Top Professionals
      </Text>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        {professionals.slice(0, 3).map((user) => {
          return (
            <ProfessionalAvator
              key={user._id}
              name={user.name}
              title={user.jobtitle}
              style={profileAvatar}
              size={90}
              imageUri={user.image}
            />
          );
        })}
      </View>
      <Text style={ScreenStyles.professionalsScreen.headTitle}>
        Select By Category
      </Text>
      <View>
        <View style={ScreenStyles.professionalsScreen.viewBox}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <CategoryCard
              title="Interior Designer"
              source={require('../../assets/images/interior-design.jpg')}
              onPress={() => categoryScreen('Interior Designer')}
            />
            <CategoryCard
              title="Architect"
              source={require('../../assets/images/architecture.jpg')}
              onPress={() => categoryScreen('Architecture')}
            />
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <CategoryCard
              title="Renovators"
              source={require('../../assets/images/renovation.jpg')}
              onPress={() => categoryScreen('Renovator')}
            />
            <CategoryCard
              title="Builders"
              source={require('../../assets/images/builder.jpg')}
              onPress={() => categoryScreen('Builder')}
            />
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <CategoryCard
              title="Suppliers"
              source={require('../../assets/images/supplier.jpg')}
              onPress={() => categoryScreen('Supplier')}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Professionals;
