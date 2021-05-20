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
  const firmApi = useApi(userAPI.userFirms);
  const firmsfromProfile = state.entities.auth.data.firms;
  const userfirmIds = firmsfromProfile?.map(({id}) => id);
  const retrivingFirms = async () => {
    const result = await firmApi.request(email);
    if (result == []) {
      console.log('Error retrieving the firms');
      return setError('Could not retrive firms at this moment, refresh. ');
    }
    let userfirms = [];
    for (var i = 0; i < result.length; i++) {
      if (userfirmIds[i] == result[i]._id) {
        userfirms.push(result[i]);
      }
    }

    setFirms(userfirms);
  };
  useEffect(() => {
    retrivingFirms();
    console.log('Firms in remote firm screen', firms);
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
            <AppButton name="reload" onPress={retrivingFirms} />
          </View>
        )}
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
