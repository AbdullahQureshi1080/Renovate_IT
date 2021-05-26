//  Native Imports
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {useSelector} from 'react-redux';

//  Api Imports
import useApi from '../../hooks/useApi';
import userAPI from '../../api/user';

//  Components Import
import AppText from '../../components/AppText';
import AppButton from '../../components/AppButton';
import FirmCard from '../../components/Card/FirmCard';
import ErrorMessage from '../../components/AppForm/ErrorMessage';

export default function RemoteFirmScreen({navigation}) {
  const state = useSelector((state) => state);
  const email = state.entities.auth.data.email;
  const [firms, setFirms] = useState([]);
  const [error, setError] = useState(null);
  const userFirmApi = useApi(userAPI.getUserFirms);

  const fetchUserFirms = async () => {
    const result = await userFirmApi.request(email);
    if (result.length <= 0) {
      console.log('Error retrieving the firms', result);
      return setError('Could not retrive firms at this moment, refresh. ');
    }
    setFirms(result.data);
  };

  useEffect(() => {
    // fetchFirms();
    fetchUserFirms();
  }, []);

  return (
    <View style={{flex: 1}}>
      <FlatList
        ListEmptyComponent={() => (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
            }}
          >
            <ErrorMessage error={error} visible={error} />
            <AppText style={{fontSize: 14}}>No Firms</AppText>
            <AppButton name="reload" onPress={fetchUserFirms} />
          </View>
        )}
        keyExtractor={(item) => item._id}
        data={firms.sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        })}
        renderItem={({item}) => (
          <FirmCard
            key={item._id}
            title={item.title}
            creator={item.creator}
            description={item.description}
            members={item.members?.length}
            onPress={() => navigation?.push('Firm Details', {item: item})}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
