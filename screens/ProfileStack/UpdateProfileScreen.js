// Native Imports
import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  Dimensions,
  ScrollView,
  Alert,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';

// Components Imports

import AppFormField from '../../components/AppForm/AppFormField';
import SubmitButton from '../../components/AppForm/SubmitButton';
import AppForm from '../../components/AppForm/AppForm';
import ErrorMessage from '../../components/AppForm/ErrorMessage';
import Switch from '../../components/Switch';
import ActivityIndicator from '../../components/ActivityIndicator';

// Styles Imports
import ScreenStyles from '../../styles/ScreenStyles';
import ComponentsStyle from '../../styles/ComponentsStyle';

import uploadAsPromise from '../../api/imageUpload';

// import firebase from 'firebase';
// require('firebase/firestore');
// require('firebase/firebase-storage');

// Supporting Imports
import * as Yup from 'yup';

// Api Imports
// import authAPI from "../../api/auth";
import userAPI from '../../api/user';
// import useAuth from "../../auth/useAuth";
import useApi from '../../hooks/useApi';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImageInput from '../../components/Image/ImageInput';
// import { setUserData } from '../../store/auth';
// import {setProfileData} from '../../store/user';
import AppFormPicker from '../../components/AppForm/AppFormPicker';
import AppText from '../../components/AppText';

var {width, height} = Dimensions.get('window');

const validationSchema = Yup.object().shape({
  firstname: Yup.string().required().label('First Name'),
  lastname: Yup.string().required().label('Last Name'),
  about: Yup.string().label('About'),
  location: Yup.object().required().nullable().label('Location'),
  jobtitle: Yup.string().min(3).label('Job Title'),
  jobcategory: Yup.object().required().nullable().label('Job Category'),
});
const validationNormalSchema = Yup.object().shape({
  firstname: Yup.string().required().label('First Name'),
  lastname: Yup.string().required().min(3).label('Last Name'),
  // about: Yup.string().label('About'),
  // location: Yup.object().required().nullable().label('Location'),
  // jobtitle: Yup.string().min(3).label('Job Title'),
  // jobcategory: Yup.object().required().nullable().label('Job Category'),
});

const UpdateProfileScreen = ({navigation, route}) => {
  const profileData = route.params.profile;
  const [imageUri, setImageUri] = useState(profileData.image);
  // const [downloadURL, setDownloadURL] = useState(null);
  // const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const userEmail = state.entities.auth.data.email;
  const userId = state.entities.auth.data._id;
  // console.log(userId);
  const [isLoading, setIsLoading] = useState(false);
  const [saveData, setSaveData] = useState(false);
  const [statusProfile, setStatusProfile] = useState(profileData.profileStatus);
  const [switchOn, setSwitchOn] = useState(
    profileData.profileStatus.toLowerCase() == 'professional',
  );
  // const imageApi = useApi(userAPI.imageUpload);
  const updateProfessionalApi = useApi(userAPI.updateProfessionalProfile);
  const updateNormalApi = useApi(userAPI.updateNormalProfile);
  useEffect(() => {
    console.log('Data from Prev Route', profileData);
    console.log('Swicth Status', switchOn);
  }, []);

  // const handleSubmit = async ({
  //   email,
  //   firstname,
  //   lastname,
  //   about,
  //   locationName,
  //   jobtitle,
  //   jobCategory,
  //   image,
  //   profileStatus,
  // }) => {
  //   const jobcategory = jobCategory;
  //   const location = locationName;
  //   // const image = image;
  //   // console.log(jobCategory,workingLocation)
  //   const dataProfessional = {
  //     email,
  //     firstname,
  //     lastname,
  //     about,
  //     location,
  //     jobtitle,
  //     jobcategory,
  //     image,
  //     profileStatus,
  //   };
  //   const dataNormal = {
  //     email,
  //     firstname,
  //     lastname,
  //     image,
  //     profileStatus,
  //   };
  //   // console.log('Data from Handle Submit ', data);
  //   switchOn
  //     ? callingNormalApi(dataNormal)
  //     : callingProfessionalApi(dataProfessional);
  // };

  const callingNormalApi = async ({
    email,
    firstname,
    lastname,
    image,
    profileStatus,
  }) => {
    const result = await updateNormalApi.request(
      email,
      firstname,
      lastname,
      image,
      profileStatus,
    );
    if (!result.ok) {
      setIsLoading(false);
      return setSaveData(true);
    }
    setSaveData(false);
    setIsLoading(false);
    navigation.navigate('User Profile');
  };

  const callingProfessionalApi = async ({
    email,
    firstname,
    lastname,
    about,
    locationName,
    jobtitle,
    jobCategory,
    image,
    profileStatus,
  }) => {
    const jobcategory = jobCategory;
    const location = locationName;
    const result = await updateProfessionalApi.request(
      email,
      firstname,
      lastname,
      about,
      location,
      jobtitle,
      jobcategory,
      image,
      profileStatus,
    );
    if (!result.ok) {
      setIsLoading(false);
      return setSaveData(true);
    }
    setSaveData(false);
    setIsLoading(false);
    navigation.navigate('User Profile');
  };

  const handleFormSave = async ({
    // email,
    firstname,
    lastname,
    about,
    location,
    jobtitle,
    jobcategory,
    // image
  }) => {
    if (imageUri.includes('https://')) {
      console.log('imageUriPrevRoute', imageUri);
      const locationName = location.label;
      const jobCategory = jobcategory.label;
      const result = {
        email: userEmail,
        firstname,
        lastname,
        about,
        locationName,
        jobtitle,
        jobCategory,
        image: imageUri,
        profileStatus: statusProfile,
      };
      // console.log(result);
      setIsLoading(true);
      callingProfessionalApi(result);
    } else {
      console.log('newImageData', imageUri);
      setIsLoading(true);
      let imageUrlFromFb;
      const uploadType = 'profile';

      var type = 'image';
      await uploadAsPromise(imageUri, type, uploadType, userId).then((res) => {
        imageUrlFromFb = res;
      });
      const locationName = location.label;
      const jobCategory = jobcategory.label;
      const result = {
        email: userEmail,
        firstname,
        lastname,
        about,
        locationName,
        jobtitle,
        jobCategory,
        image: imageUrlFromFb,
        profileStatus: statusProfile,
      };
      callingProfessionalApi(result);
    }
  };

  const handleFormNormalSave = async ({firstname, lastname}) => {
    if (imageUri.includes('https://')) {
      console.log('imageUriPrevRoute', imageUri);
      const result = {
        email: userEmail,
        firstname,
        lastname,
        image: imageUri,
        profileStatus: statusProfile,
      };
      // console.log(result);
      setIsLoading(true);
      callingNormalApi(result);
    } else {
      console.log('newImageData', imageUri);
      setIsLoading(true);
      let imageUrlFromFb;
      const uploadType = 'profile';

      var type = 'image';
      await uploadAsPromise(imageUri, type, uploadType, userId).then((res) => {
        imageUrlFromFb = res;
      });
      // const locationName = location.label;
      // const jobCategory = jobcategory.label;
      const result = {
        email: userEmail,
        firstname,
        lastname,
        // about,
        // locationName,
        // jobtitle,
        // jobCategory,
        image: imageUrlFromFb,
        profileStatus: statusProfile,
      };
      callingNormalApi(result);
    }
  };

  const locations = [
    {label: 'Islamabad', value: 1},
    {label: 'Rawalpindi', value: 2},
  ];
  const categories = [
    {label: 'Interior Designer', value: 1},
    {label: 'Architecture', value: 2},
    {label: 'Builder', value: 3},
    {label: 'Supplier', value: 4},
    {label: 'Renovator', value: 5},
  ];

  const onToggleSwitch = () => {
    setSwitchOn(!switchOn);
    setStatusProfile(switchOn ? 'Normal' : 'Professional');
  };

  return (
    <KeyboardAvoidingView>
      <ActivityIndicator visible={isLoading} />
      <ScrollView
        style={ScreenStyles.updateProfileScreen}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <AppForm
            initialValues={{
              firstname: profileData.firstname || '',
              lastname: profileData.lastname || '',
              location: null,
              about: profileData.about || '',
              jobtitle: profileData.jobtitle || '',
              jobcategory: null,
            }}
            onSubmit={
              statusProfile == 'Normal' ? handleFormNormalSave : handleFormSave
            }
            validationSchema={
              statusProfile == 'Normal'
                ? validationNormalSchema
                : validationSchema
            }
          >
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}
            >
              <TouchableOpacity
                style={{alignSelf: 'center'}}
                onPress={() => navigation.goBack()}
              >
                <MaterialCommunityIcons
                  name="backspace"
                  size={40}
                  color="#1b262c"
                />
              </TouchableOpacity>
              <View style={{alignSelf: 'center'}}>
                <SubmitButton name="save" />
              </View>
            </View>
            <View style={{alignSelf: 'center'}}>
              <Text style={styles.titleText}>Edit Profile</Text>
            </View>
            <View style={{alignSelf: 'center'}}>
              <ImageInput
                imageUri={imageUri}
                onChangeImage={(imageUri) => setImageUri(imageUri)}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 10,
              }}
            >
              {switchOn ? (
                <AppText>Switch Off Professional Profile</AppText>
              ) : (
                <AppText>Switch To Professional Profile</AppText>
              )}
              {/* <AppText>{statusProfile}</AppText> */}
              <Switch isSwitchOn={switchOn} onToggleSwitch={onToggleSwitch} />
            </View>
            <View style={{alignSelf: 'center'}}>
              <ErrorMessage
                error="Not able to save User Data"
                visible={saveData}
              />
              {/* <TextInput placeholder={profileData.firstname}/> */}
              <AppText style={styles.labelText}>Firstname</AppText>

              <AppFormField
                style={{
                  ...ComponentsStyle.inputStyleSign,
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                }}
                // label="First Name"
                name="firstname"
                selectionColor="#f4f4f2"
                underlineColor="#495464"
                textColor="#495464"
                placeholder={profileData.firstname}
                placeholderTextColor="#495464"
                //  style={{marginVertical:10,}}
              />
              <AppText style={styles.labelText}>Lastname</AppText>
              <AppFormField
                style={{
                  ...ComponentsStyle.inputStyleSign,
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                }}
                // label="Last Name"
                name="lastname"
                selectionColor="#f4f4f2"
                underlineColor="#495464"
                textColor="#495464"
                placeholder={profileData.lastname}
                placeholderTextColor="#495464"
                //  style={{marginVertical:10,}}
              />
              {switchOn ? (
                <>
                  <AppText style={styles.labelText}>Select Location</AppText>
                  <AppFormPicker
                    items={locations}
                    name="location"
                    placeholder="Location"
                  />
                  <AppText style={styles.labelText}>About</AppText>
                  <AppFormField
                    style={{
                      ...ComponentsStyle.inputStyleSign,
                      backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    }}
                    // label="About"
                    name="about"
                    selectionColor="#495464"
                    underlineColor="#495464"
                    textColor="#495464"
                    multiline={true}
                    numberOfLines={5}
                    placeholder={profileData.about}
                    placeholderTextColor="#495464"
                    // style={{marginVertical:10,}}
                  />
                  <AppText style={styles.labelText}>Job Title</AppText>
                  <AppFormField
                    style={{
                      ...ComponentsStyle.inputStyleSign,
                      backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    }}
                    // label="Job Title"
                    name="jobtitle"
                    selectionColor="#f4f4f2"
                    underlineColor="#f4f4f2"
                    textColor="#495464"
                    placeholder={profileData.jobtitle}
                    placeholderTextColor="#495464"
                    //  style={{marginVertical:10,}}
                  />
                  <AppText style={styles.labelText}>
                    Select Job Category
                  </AppText>
                  <AppFormPicker
                    items={categories}
                    name="jobcategory"
                    placeholder="Job Category"
                  />
                </>
              ) : (
                <View />
              )}
              {/* <AppText style={styles.labelText}>Select Location</AppText>
               <AppFormPicker
                items={locations}
                name="location"
                placeholder="Location"
              />
              <AppText style={styles.labelText}>About</AppText>
              <AppFormField
                style={{
                  ...ComponentsStyle.inputStyleSign,
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                }}
                name="about"
                selectionColor="#495464"
                underlineColor="#495464"
                textColor="#495464"
                multiline={true}
                numberOfLines={5}
                placeholder={profileData.about}
                placeholderTextColor="#495464"
              />
              <AppText style={styles.labelText}>Job Title</AppText>
              <AppFormField
                style={{
                  ...ComponentsStyle.inputStyleSign,
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                }}
                name="jobtitle"
                selectionColor="#f4f4f2"
                underlineColor="#f4f4f2"
                textColor="#495464"
                placeholder={profileData.jobtitle}
                placeholderTextColor="#495464"
                 style={{marginVertical:10,}}
              />
              <AppText style={styles.labelText}>Select Job Category</AppText>
              <AppFormPicker
                items={categories}
                name="jobcategory"
                placeholder="Job Category"
              /> */}
            </View>

            <View
              style={{
                marginVertical: 15,
                borderBottomColor: '#F4f4F2',
                borderBottomWidth: 1,
                opacity: 0.5,
              }}
            ></View>
          </AppForm>
          {/* </View> */}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginVertical: 20,
  },
  child: {
    flex: 2,
    flexDirection: 'column',
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  titleText: {
    fontFamily: 'Poppins-Bold',
    color: '#495464',
    fontSize: 30,
    marginVertical: 10,
    opacity: 0.6,
    alignSelf: 'center',
  },
  text: {
    // fontFamily: "Poppins-Medium",
    color: '#E8E8E8',
    fontSize: 20,
    opacity: 0.8,
  },
  labelText: {fontSize: 15, fontFamily: 'Poppins-Medium', opacity: 0.4},
  btnSign: {
    backgroundColor: '#495464',
    marginVertical: 10,
    width: width / 3,
    alignSelf: 'center',
  },
  mainContainer: {
    backgroundColor: 'grey',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    width: 100,
    overflow: 'hidden',
  },
  profileImage: {
    height: '100%',
    width: '100%',
  },
});

export default UpdateProfileScreen;
