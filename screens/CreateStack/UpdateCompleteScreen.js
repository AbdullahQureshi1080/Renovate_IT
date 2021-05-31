import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import * as Yup from 'yup';

import AppFormField from '../../components/AppForm/AppFormField';
import SubmitButton from '../../components/AppForm/SubmitButton';
import AppForm from '../../components/AppForm/AppForm';

// import Screen from "../../components/Screen";
import FormImagePicker from '../../components/AppForm/FormImagePicker';
import FormDocumentPicker from '../../components/AppForm/FormDocumentPicker';

import firebase from 'firebase';
import ActivityIndicator from '../../components/ActivityIndicator';

import userAPI from '../../api/user';
import useApi from '../../hooks/useApi';

import {addProject, editProject} from '../../store/user';
import {addDataProject, editAppProject} from '../../store/data';

import AppText from '../../components/AppText';

import ScreenStyles from '../../styles/ScreenStyles';
import uploadAsPromise from '../../api/imageUpload';
import AppFormPicker from '../../components/AppForm/AppFormPicker';

// const categories = ["Interior Design","Architecture","Building","Renovation"];
const categories = [
  {label: 'Interior Design', value: 1},
  {label: 'Architecture', value: 2},
  {label: 'Building', value: 3},
  {label: 'Renovation', value: 4},
];
const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label('Title'),
  // category:Yup.string().required().label("Category"),
  category: Yup.object().required().nullable().label('Category'),
  description: Yup.string().label('Description'),
});

function UpdateCompleteScreen({navigation, route}) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const email = state.entities.auth.data.email;
  const userId = state.entities.auth.data._id;
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [saveData, setSaveData] = useState(false);
  const [error, setError] = useState();
  const [images, setImages] = useState([]);
  // const[showModal,setShowModal] =useState();
  useEffect(() => {
    console.log(userId);
    // console.log(route.params)
    const data = route.params.projectData;
    console.log(data);
    setData(data);
    // console.log(data);
    setImages(data.gallaryImages);
  }, []);

  const updateApi = useApi(userAPI.updateProject);
  const handleSubmit = async ({title, description, category, data}) => {
    console.log('Handle Submit', title, description, category, data);
    const id = route.params.projectData._id;
    // setIsLoading(false);
    const result = await updateApi.request(
      id,
      title,
      description,
      category,
      data,
    );
    console.log(result.data);
    // // console.log(result);
    if (!result.ok) {
      // console.log(result.data);
      setError(result.data);
      setIsLoading(false);
      return setSaveData(true);
    }
    setSaveData(false);
    setIsLoading(false);
    // dispatch(editAppProject(result.data));
    // dispatch(addDataProject(result.data));
    navigation.navigate('AppHome');
  };

  const handleFormSubmit = async ({title, description, category}) => {
    const projectCategory = category.label;
    // if(data.PROJECT_DATA.data)
    // const imgs =  route.params.projectData.PROJECT_DATA.data.data;
    console.log(title, description, projectCategory, images);

    setIsLoading(true);
    // console.log("Going In Loop");
    const arrImages = [...images];
    const arrValuesImages = images.map((img) => img.value);
    const arrKeysImages = images.map((img) => img.key);

    console.log('Array Images Before Upload', arrValuesImages);
    const imagesToUpload = [];
    for (var i = 0; i < arrValuesImages.length; i++) {
      if (arrImages[i].value.startsWith('file')) {
        imagesToUpload.push(arrImages[i]);
      }
    }
    console.log('Images to Upload', imagesToUpload);
    if (imagesToUpload.length <= 0) {
      const uploadType = 'projects';
      for (var i = 0; i < imagesToUpload.length; i++) {
        var imageFile = imagesToUpload[i].value;
        var type = 'image';
        const imageIndex = imagesToUpload.findIndex(
          (obj) => obj.key == arrKeysImages[i],
        );
        await uploadAsPromise(imageFile, type, uploadType, userId).then(
          (res) => {
            arrImages[imageIndex].value = res;
          },
        );
      }
      console.log('Coming out of loop - Images');
      console.log('Array Images After Upload', arrImages);
      const ProjectData = {
        title,
        description,
        category: projectCategory,
        data: data,
      };
      console.log(ProjectData);
      handleSubmit(ProjectData);
    } else {
      // console.log("Coming out of loop - Images");
      console.log('Array Images Altered Upload', arrImages);
      const ProjectData = {
        title,
        description,
        category: projectCategory,
        data: data,
      };
      console.log(ProjectData);
      handleSubmit(ProjectData);
    }
    // // let exists = Object.values(obj).includes("test1");
    // // if (arrValuesImages.some(v=> str.includes())) {
    //     // There's at least one
    // // }
    // // console.log("Array Images Keys", arrKeysImages)
    // // // const arrDocuments = [];
    // // const uploadType = "projects";
    // // for (var i = 0; i < arrImages.length; i++) {
    // //   var imageFile = arrImages[i].value;
    // //   var type = "image";
    // // const imageIndex = arrImages.findIndex(obj=>obj.key==arrKeysImages[i])
    // //   await uploadAsPromise(imageFile,type,uploadType,userId).then((res) => {
    // //     arrImages[imageIndex].value = res;
    // //   });
    // // }
    // console.log("Coming out of loop - Images");
    // console.log("Array Images After Upload", arrImages);
    // const ProjectData = {
    //   title,
    //   description,
    //   category:projectCategory,
    //   data:data,
    // };
    // console.log(ProjectData);
    // // handleSubmit(ProjectData);
  };

  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <ActivityIndicator visible={isLoading} />
      <ScrollView
        style={ScreenStyles.createProjectScreen}
        showsVerticalScrollIndicator={false}
      >
        <AppForm
          initialValues={{
            title: route.params.projectData.title || '',
            category: route.params.projectData.category || '',
            description: route.params.projectData.description || '',
            //   title:"",
            //   category:"",
            //   description:"",
          }}
          onSubmit={handleFormSubmit}
          validationSchema={validationSchema}
        >
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
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
              <SubmitButton name="Update" />
            </View>
          </View>
          <View style={{alignSelf: 'center'}}>
            <AppText style={styles.titleText}>Update Project</AppText>
          </View>
          <AppText style={styles.labelText}>Project Title</AppText>
          <AppFormField
            maxLength={255}
            name="title"
            placeholder={route.params.projectData.title}
            style={{marginVertical: 10}}
          />
          <AppText style={styles.labelText}>Project Description</AppText>
          <AppFormField
            maxLength={255}
            multiline
            name="description"
            numberOfLines={7}
            placeholder={route.params.projectData.description}
            style={{marginVertical: 10}}
          />
          <AppText style={styles.labelText}>Project Category</AppText>
          <AppFormPicker
            items={categories}
            name="category"
            placeholder="Category"
            //   selected={data.PROJECT_DATA.data.category}
          />
          {/* <AppText style={styles.labelText}>Project Collaborators</AppText>
        <AppFormField
          maxLength={255}
          multiline
          name="collaborators"
          // numberOfLines={7}
          placeholder="Add a collaborator"
          style={{marginVertical:10,}}
          onPress={showModal}
        /> */}
        </AppForm>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  titleText: {
    fontFamily: 'Poppins-Bold',
    color: '#495464',
    fontSize: 30,
    marginVertical: 7,
    opacity: 0.6,
    alignSelf: 'center',
  },
  subTitleText: {
    fontFamily: 'Poppins-Medium',
    color: '#495464',
    fontSize: 20,
    marginVertical: 5,
    opacity: 0.8,
    // alignSelf: "center",
  },
  labelText: {fontSize: 15, fontFamily: 'Poppins-Medium', opacity: 0.4},
});

export default UpdateCompleteScreen;
