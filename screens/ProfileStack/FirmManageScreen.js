//  Native Imports
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Alert,
  FlatList,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {Dimensions} from 'react-native';

// Componets Imports
import TextModal from '../../components/Modal/TextModal';
import AppText from '../../components/AppText';
import {
  MenuProvider,
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import NoteViewList from '../../components/List/NoteViewList';
import ViewModal from '../../components/Modal/ViewModal';
import uploadAsPromise from '../../api/imageUpload';
import NoteModal from '../../components/Modal/NoteModal';

import ActivityIndicator from '../../components/ActivityIndicator';
import ErrorMessage from '../../components/AppForm/ErrorMessage';
import FirmDetailsModal from '../../components/Modal/FirmDetailsModal';
import UpdateNoteModal from '../../components/Modal/UpdateNoteModal';

//  Api Imports
import useApi from '../../hooks/useApi';
import userAPI from '../../api/user';

export default function FirmManageScreen({navigation, route}) {
  const [text, setText] = useState('');
  // const [addStatus,setAddStatus]=useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const [isVisible3, setIsVisible3] = useState(false);
  const [isVisible4, setIsVisible4] = useState(false);
  // const [updateVisible, setUpdateVisible] = useState(false);
  const state = useSelector((state) => state);
  const userId = state.entities.auth.data._id;
  const firms = state.entities.auth.data.firms;
  const email = state.entities.auth.data.email;
  const [notes, setNotes] = useState([]);
  const [modalData, setModalData] = useState('');
  const [firmData, setFirmData] = useState(route.params.item);
  const [images, setImages] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState([]);
  // const [input, setInput] = useState("");
  const [idCheck, setCheckId] = useState(true);
  const userfirmIds = firms.map(({id}) => id);
  const firmId = route.params.item._id;
  const creatorId = route.params.item.creatorId;
  const firmMembers = route.params.item.members;
  const noteApi = useApi(userAPI.createNote);
  const notesApi = useApi(userAPI.getNotes);
  const updateNoteApi = useApi(userAPI.updateNote);
  const deleteNoteApi = useApi(userAPI.deleteNote);
  const deleteFirmApi = useApi(userAPI.deleteFirm);
  const [deleteError, setDeleteError] = useState(null);

  const [delHide, setDelHide] = useState(false);
  // const state = useSelector(state=>state)
  // const userId = state.entities.auth.data._id;
  const name = `${state.entities.auth.data.firstname} ${state.entities.auth.data.lastname}`;
  useEffect(() => {
    console.log('User Id', userId);
    console.log('Creator Id', creatorId);
    console.log('name', name);
    if (userId == creatorId) {
      setCheckId(false);
      setDelHide(true);
    }
  }, []);

  const fetchNotes = async () => {
    const result = await notesApi.request(firmId);
    if (!result.ok) {
      Alert.alert('Unable to fetch notes, try again');
      console.log('Unable to fetch notes, try again');
      return;
    }
    setNotes(new Array(result.data));
  };

  useEffect(() => {
    fetchNotes();
    // console.log('Notes in manage firm', notes);
  }, []);

  const handleText = (value) => {
    setText(value);
  };

  const handleAdd = async () => {
    console.log('Add Note');
    if (text == '') {
      Alert.alert('Cannot have empty note');
      return;
    }
    // setAddStatus(false)
    setIsLoading(true);
    const arrImages = [];
    const arrDocuments = [];
    const uploadType = 'note';
    for (var i = 0; i < images.length; i++) {
      var imageFile = images[i];
      var type = 'image';
      await uploadAsPromise(imageFile, type, uploadType, userId).then((res) => {
        arrImages.push(res);
      });
    }
    console.log('Coming out of loop - Images');
    console.log(arrImages);
    for (var i = 0; i < documents.length; i++) {
      var documentFile = documents[i];
      var type = 'doc';
      await uploadAsPromise(documentFile, type, uploadType, userId).then(
        (res) => {
          arrDocuments.push(res);
        },
      );
      console.log('Coming out of loop - Documents ');
      console.log(arrDocuments);
    }
    const note = text;
    const data = {firmId, note, email, arrImages, arrDocuments};
    console.log('Data in add note', data);
    setIsVisible(false);
    const result = await noteApi.request(
      firmId,
      note,
      email,
      arrImages,
      arrDocuments,
    );
    if (!result.ok) {
      Alert.alert('Unable to add note, try again');
      console.log('Unable to add note, try again');
      setIsLoading(false);
      return;
    }
    setNotes(new Array(result.data));
    setIsLoading(false);
    setText('');
    setImages([]);
    setDocuments([]);
  };

  // const handleLike = ()=>{

  // }

  const handleDelete = (email, noteId, firmId) => {
    Alert.alert('Delete Note', 'Are you sure you want to delete the note', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => deleteNote(email, noteId, firmId)},
    ]);
  };

  const deleteNote = async (email, noteId, firmId) => {
    console.log('In handle delete', email, noteId, firmId);
    const result = await deleteNoteApi.request(email, noteId, firmId);
    if (!result.ok) {
      Alert.alert('Unable to delete note, try again');
      console.log('Unable to delete note, try again');
      return;
    }
    setIsVisible2(false);
    setNotes(new Array(result.data));
  };

  const handleFirmDelete = async () => {
    console.log('Handle firm delete');
    const result = await deleteFirmApi.request(email, firmId, firmMembers);
    if (!result.ok) {
      console.log('Could Not Delete Firm');
      setDeleteError('Error Deleting Firm');
      return;
    }
    console.log('Firm Deleted');
    navigation.navigate('User Profile');
  };

  const handleViewModal = (note) => {
    setIsVisible2(true);
    setModalData(note);
  };

  const handleAddImage = (uri) => {
    setImages([...images, uri]);
  };
  const handleRemoveImage = (uri) => {
    setImages(images.filter((imageUri) => imageUri !== uri));
  };

  const handleAddDocument = (uri) => {
    setDocuments([...documents, uri]);
  };
  const handleRemoveDocument = (uri) => {
    setDocuments(documents.filter((documentUri) => documentUri !== uri));
  };

  const handleUpdateNote = async (noteId) => {
    console.log('In handle Update Note');
    console.log(
      'Updating Note',
      email,
      noteId,
      firmId,
      text,
      images,
      documents,
    );
    // console.log("Add Note")
    if (text == '') {
      Alert.alert('Cannot have empty note');
      return;
    }
    // setAddStatus(false)
    // setIsLoading(true)
    const arrImages = [];
    const arrDocuments = [];
    const uploadType = 'note';
    for (var i = 0; i < images.length; i++) {
      if (images[i].includes('https://')) {
        arrImages.push(images[i]);
        continue;
      }
      var imageFile = images[i];
      var type = 'image';
      await uploadAsPromise(imageFile, type, uploadType, userId).then((res) => {
        arrImages.push(res);
      });
    }
    console.log('Coming out of loop - Images');
    console.log(arrImages);
    for (var i = 0; i < documents.length; i++) {
      if (documents[i].includes('https://')) {
        arrDocuments.push(documents[i]);
        continue;
      }
      var documentFile = documents[i];
      var type = 'doc';
      await uploadAsPromise(documentFile, type, uploadType, userId).then(
        (res) => {
          arrDocuments.push(res);
        },
      );
      console.log('Coming out of loop - Documents ');
      console.log(arrDocuments);
    }
    const note = text;
    const data = {firmId, note, email, arrImages, arrDocuments};
    console.log('Data in add note', data);
    setIsVisible2(false);
    setIsVisible4(false);
    const result = await updateNoteApi.request(
      email,
      noteId,
      firmId,
      note,
      arrImages,
      arrDocuments,
    );
    // // const result = await noteApi.request(firmId,note,email,arrImages,arrDocuments);
    if (!result.ok) {
      Alert.alert('Unable to update note, try again');
      console.log('Unable to update note, try again');
      setIsLoading(false);
      return;
    }
    setNotes(new Array(result.data));
    setIsLoading(false);
    setText('');
    setImages([]);
    setDocuments([]);
  };

  return (
    <MenuProvider>
      <ActivityIndicator visible={isLoading} />
      <SafeAreaView style={styles.container}>
        <>
          <ErrorMessage error={deleteError} />
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
              <MaterialCommunityIcons
                name="backspace"
                size={40}
                color="#1b262c"
              />
            </TouchableOpacity>
            {!idCheck ? (
              <View>
                <Menu>
                  <MenuTrigger
                    text={
                      <MaterialIcons
                        name="more-vert"
                        size={40}
                        color="#1b262c"
                      />
                    }
                  />
                  <MenuOptions customStyles={optionsStyles}>
                    <MenuOption
                      onSelect={() => setIsVisible3(true)}
                      text={'See Details'}
                      // customStyles={{flexDirection:"row", justifyContent:"flex-end",alignSelf: "flex-end"}}
                    />
                    {/* {!idCheck? */}
                    <MenuOption
                      onSelect={() =>
                        Alert.alert(
                          'Delete',
                          'Are you sure you want to delete the firm?',
                          [
                            {
                              text: 'Cancel',
                              onPress: () =>
                                console.log('Cancel for Firm deletion'),
                              style: 'cancel',
                            },
                            {text: 'OK', onPress: () => handleFirmDelete()},
                          ],
                          {cancelable: false},
                        )
                      }
                      text={'Delete'}
                    />
                    {/* :(<View/>) } */}
                    {/* <MenuOption onSelect={()=>console.log("Handle Update")} text={"Edit Details"} /> */}
                  </MenuOptions>
                </Menu>
              </View>
            ) : (
              <View>
                <Menu>
                  <MenuTrigger
                    text={
                      <MaterialIcons
                        name="more-vert"
                        size={40}
                        color="#1b262c"
                      />
                    }
                  />
                  <MenuOptions customStyles={optionsStyles}>
                    <MenuOption
                      onSelect={() => setIsVisible3(true)}
                      text={'See Details'}
                    />
                  </MenuOptions>
                </Menu>
              </View>
            )}
          </View>
          <View style={styles.firmDetails}>
            <AppText style={styles.titleText}>
              {route.params.item.title}
            </AppText>
            <AppText style={styles.detailsText}>
              {route.params.item.description}
            </AppText>
          </View>
          <View
            style={{
              marginVertical: 15,
              borderBottomColor: '#1b262c',
              borderBottomWidth: 1,
              opacity: 0.5,
              alignSelf: 'center',
              width: Dimensions.get('screen').width - 20,
            }}
          ></View>
          <NoteModal
            btnName="Add"
            btnCloseName="Cancel"
            isVisible={isVisible}
            onChangeText={(value) => handleText(value)}
            onPressAdd={handleAdd}
            onPressCancel={() => setIsVisible(false)}
            titleMessage={'Add note details'}
            images={images}
            documents={documents}
            handleAddImage={handleAddImage}
            handleRemoveImage={handleRemoveImage}
            handleAddDocument={handleAddDocument}
            handleRemoveDocument={handleRemoveDocument}
            addStatus={!text}
          />
          <UpdateNoteModal
            btnName="Update"
            btnCloseName="Cancel"
            isVisible={isVisible4}
            onChangeText={(value) => handleText(value)}
            onPressAdd={() => handleUpdateNote(modalData.id)}
            onPressCancel={() => setIsVisible4(false)}
            titleMessage={'Add note details'}
            images={images}
            documents={documents}
            handleAddImage={handleAddImage}
            handleRemoveImage={handleRemoveImage}
            handleAddDocument={handleAddDocument}
            handleRemoveDocument={handleRemoveDocument}
            addStatus={!text}
            value={text}
          />
          <ViewModal
            isVisible={isVisible2}
            data={modalData}
            btnName="Delete"
            btnCloseName="Cancel"
            // onChangeText={(value) => handleText(value)}
            onPressDelete={() => handleDelete(email, modalData.id, firmId)}
            onPressCancel={() => setIsVisible2(false)}
            // idCheck={idCheck}
            creator={route.params.item.creator}
            updateName="Update"
            onPressUpdate={() => {
              setIsVisible4(true),
                setDocuments(modalData?.documents),
                setImages(modalData.images),
                setText(modalData.note);
            }}
            titleMessage={'Firm Details'}
          />
          <FirmDetailsModal
            delHide={delHide}
            isVisible={isVisible3}
            data={firmData}
            btnName="Delete"
            btnCloseName="Close"
            onPressDelete={() => handleFirmDelete()}
            // onPressUpdate={() => handleFirmUpdate()}
            onPressCancel={() => setIsVisible3(false)}
            titleMessage={'Add note details'}
          />
          <TouchableOpacity
            onPress={() => setIsVisible(true)}
            style={{
              backgroundColor: '#1b262c',
              borderRadius: 20,
              width: 35,
              alignSelf: 'flex-end',
              marginVertical: 10,
            }}
          >
            <Ionicons
              name="add"
              size={30}
              color={'#e8e8e8'}
              style={{alignSelf: 'center'}}
            />
          </TouchableOpacity>
          <FlatList
            numColumns={1}
            horizontal={false}
            data={notes.sort((a, b) => {
              return new Date(b.date) - new Date(a.date);
            })}
            // keyExtractor={note=> note.noterId}
            renderItem={({item, index}) => (
              <View key={index.toString()}>
                {item.map((note, index) => {
                  return (
                    <NoteViewList
                      id={note._id}
                      noterName={note.noter}
                      note={note.note}
                      noterId={note.noterId}
                      creator={route.params.item.creator}
                      noterImage={note.noterImage}
                      firmId={firmId}
                      handleDelete={() => handleDelete(email, note.id, firmId)}
                      onPress={() => handleViewModal(note)}
                    />
                  );
                })}
              </View>
            )}
          />
        </>
      </SafeAreaView>
    </MenuProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 15,
    marginHorizontal: 20,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 15,
  },
  firmDetails: {
    marginHorizontal: 5,
  },
  titleText: {
    fontSize: 22,
    fontFamily: 'Poppins-Medium',
    marginVertical: 10,
  },
  detailsText: {
    fontSize: 18,
  },
});
const optionsStyles = {
  optionsContainer: {
    backgroundColor: '#495464',
    padding: 5,
    flexDirection: 'row',

    // alignSelf:"right",
  },
  // optionsWrapper: {
  //   backgroundColor:"#F4F4F2",
  // },
  optionWrapper: {
    backgroundColor: '#495464',
    margin: 5,
    // justifyContent:"flex-end",
    // alignSelf: 'flex-end',
    // alignContent: 'flex-end',
  },
  // optionTouchable: {
  //   underlayColor: 'gold',
  //   activeOpacity: 70,
  // },
  optionText: {
    color: '#F4F4F2',
  },
};
