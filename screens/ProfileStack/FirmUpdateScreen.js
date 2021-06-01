import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Linking,
  Modal,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';

// import AppTextInput from '../AppTextInput';
// import GallaryModal from '../Modal/GallaryModal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import AppFormField from '../../components/AppForm/AppFormField';
import AppForm from '../../components/AppForm/AppForm';
import SubmitButton from '../../components/AppForm/SubmitButton';

// const {width, height} = Dimensions.get('screen');

import userAPI from '../../api/user';
import dataAPI from '../../api/data';
import useApi from '../../hooks/useApi';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label('Title'),
  description: Yup.string().required().min(1).label('Description'),
});

import {Avatar} from 'react-native-elements';
import AppButton from '../../components/AppButton';
import AppText from '../../components/AppText';
import ProfessionalAvatar from '../../components/ProfessionalAvatar';
import {ScrollView} from 'react-native';
import SelectUserModal from '../../components/Modal/SelectUserModal';
import {useSelector} from 'react-redux';
import {Alert} from 'react-native';
const {width, height} = Dimensions.get('screen');
export default function FirmUpdateScreen({route, navigation}) {
  const state = useSelector((state) => state);
  const email = state.entities.auth.data.email;
  const [users, setUsers] = useState([]);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [removeSelectedUser, setRemoveSelectedUser] = useState(null);
  const usersApi = useApi(dataAPI.getAllUsers);
  const updateFirmApi = useApi(userAPI.updateFirmData);
  const addMemberApi = useApi(userAPI.addFirmMember);
  const deleteMemberApi = useApi(userAPI.deleteFirmMember);
  const data = route.params.data;
  const [firmMembers, setMembers] = useState(data.members);
  const [firmData, setFirmData] = useState(data);

  const onPressUpdateFirmData = async ({title, description}) => {
    const firmId = data._id;
    const result = await updateFirmApi.request(firmId, title, description);
    if (!result.ok) {
      console.log('Error updating firm data');
      Alert.alert('Error updating firm data');
      return;
    }
    Alert.alert('Updated Firm Data');
    setFirmData(result.data);
  };

  const fetchUsers = async () => {
    const result = await usersApi.request(email);
    if (!result.ok) {
      setError('Could not retrive posts at this moment, refresh. ');
      return;
    }
    let createrId = [firmData.creatorId];
    let memberIds = firmData.members.map(({_id}) => _id);
    let excludedUsers = createrId.concat(memberIds);
    console.log('excluded Ids', excludedUsers);
    let allusers = result.data.filter(
      (user) => !excludedUsers.includes(user._id),
    );
    setUsers(allusers);
  };

  useEffect(() => {
    fetchUsers();
    // console.log(users);
  }, []);

  const handleSearch = (search) => {
    // console.log(route.params);
    let allUsers = [...users];
    const query = search.toLowerCase();
    if (query == '') {
      // Fetch Users for Modal
      fetchUsers();
      return;
    } else if (query !== '') {
      let searched = allUsers.filter(function (item) {
        return item.email.includes(query.toLowerCase());
      });
      setUsers(searched);
    }
  };

  const onPressAdd = (user) => {
    console.log('Selected User from Modal of Users', user);
    setModalVisible3(false);
    setSelectedUser(user);
  };

  const onPressAddUserToFirm = async () => {
    const memberId = selectedUser._id;
    const firmId = firmData._id;
    console.log(
      'Before Sending Request From Adding new member Api',
      firmId,
      memberId,
    );
    const result = await addMemberApi.request(firmId, memberId);
    if (!result.ok) {
      console.log('Error adding new member');
      Alert.alert('Error adding new member');
      return;
    }
    setMembers(result.data.members);
  };

  const onPressRemoveUserFromFirm = async (item) => {
    const memberId = item._id;
    const firmId = firmData._id;
    console.log(
      'Before Sending Request From removing new member Api',
      firmId,
      memberId,
    );
    const result = await deleteMemberApi.request(firmId, memberId);
    if (!result.ok) {
      console.log('Error deleting  member');
      Alert.alert('Error deleting member');
      return;
    }
    console.log('Result From deleting the member Api', result.data);
    console.log('Member removed');
    setMembers(result.data);
    setSelectedUser(null);
  };

  const removingUserFromModal = (item) => {
    console.log('Removing user from modal', item.name);
    setRemoveSelectedUser(item);
    const newMembers = firmData.members.filter((user) => {
      return user._id != item._id;
    });
    console.log('Updated Members', newMembers.length);
    onPressRemoveUserFromFirm(item);
  };

  return (
    <ScrollView style={styles.modalView}>
      <View
        style={{
          marginVertical: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      ></View>
      <View style={{marginVertical: 10}}>
        <AppForm
          initialValues={{
            title: '' || firmData.title,
            description: '' || firmData.description,
          }}
          onSubmit={onPressUpdateFirmData}
          validationSchema={validationSchema}
        >
          <View
            style={{
              marginVertical: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <TouchableOpacity
              style={{alignSelf: 'center'}}
              onPress={() =>
                navigation.navigate('Firm Details', {item: firmData})
              }
            >
              <MaterialCommunityIcons
                name="backspace"
                size={35}
                color="#1b262c"
              />
            </TouchableOpacity>
            <View style={{alignSelf: 'center'}}>
              <SubmitButton name="Update" />
            </View>
          </View>
          <View style={{alignSelf: 'center'}}>
            <AppText style={styles.titleText}>Update Firm Details</AppText>
          </View>
          <View style={{marginVertical: 10}}>
            <AppText
              style={{
                marginVertical: 10,
                fontSize: 14,
                fontFamily: 'Poppins-Bold',
                color: '#495464',
              }}
            >
              Title
            </AppText>
            <AppFormField
              name="title"
              placeholder={firmData.title}
              underlineColor="#495464"
              textColor="#495464"
              value={firmData.title}
            />
            <AppText
              style={{
                marginVertical: 10,
                fontSize: 14,
                fontFamily: 'Poppins-Bold',
                color: '#495464',
              }}
            >
              Description
            </AppText>
            <AppFormField
              name="description"
              placeholder={firmData.description}
              multiline={true}
              numberOfLines={5}
              underlineColor="#495464"
              textColor="#495464"
              value={firmData.description}
            />
          </View>
        </AppForm>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <AppText
            style={{
              marginVertical: 10,
              fontSize: 15,
              // fontFamily: 'Poppins-Bold',
            }}
          >
            Members
          </AppText>
        </View>
        <FlatList
          data={firmMembers}
          numColumns={3}
          keyExtractor={(item) => item._id}
          renderItem={({item}) => (
            <>
              <TouchableOpacity onPress={() => removingUserFromModal(item)}>
                <MaterialCommunityIcons name="delete" size={20} />
              </TouchableOpacity>
              <View>
                <ProfessionalAvatar
                  key={item?._id}
                  name={item?.name}
                  title={item?.jobtitle}
                  style={profileAvatar}
                  size={65}
                  imageUri={item?.image}
                  placeholdertext={'add user'}
                />
              </View>
            </>
          )}
        />
        <View>
          <SelectUserModal
            btnName="Add"
            btnCloseName="Cancel"
            isVisible={modalVisible3}
            onChangeText={(value) => handleSearch(value)}
            onPressAdd={(user) => onPressAdd(user)}
            onPressCancel={() => setModalVisible3(false)}
            data={users}
          />
          <View
            style={{
              marginHorizontal: 5,
              paddingHorizontal: 10,
            }}
          >
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}
            >
              <AppText style={styles.labelText}>Other Users</AppText>
              <TouchableOpacity
                onPress={onPressAddUserToFirm}
                disabled={!selectedUser}
              >
                <AppText style={{fontFamily: 'Poppins-Bold'}}>Save</AppText>
              </TouchableOpacity>
            </View>
            <ProfessionalAvatar
              key={selectedUser?._id}
              name={selectedUser?.name}
              title={selectedUser?.jobtitle}
              style={profileAvatar}
              size={80}
              imageUri={selectedUser?.image}
              placeholdertext={'add user'}
              onPress={() => {
                setModalVisible3(true);
              }}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  modalView: {
    // height: '100%',
    margin: 20,
    backgroundColor: '#e8e8e8',
    borderRadius: 20,
    padding: 35,
    // alignItems: "center",
    shadowColor: '#e5e5e5',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  container: {
    backgroundColor: 'grey',
    borderRadius: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    width: 100,
    overflow: 'hidden',
    marginHorizontal: 5,
  },
  image: {
    height: '100%',
    width: '100%',
  },
});

const profileAvatar = {
  // marginVertival:100,
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
    width: width / 5,
    fontFamily: 'Poppins-Medium',
  },
};
