//  Native Imports
import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {
  MenuProvider,
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AppText from './AppText';

export default function Header({
  navigation,
  idCheck,
  name,
  next,
  onPressNext,
  renderButton,
}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{alignSelf: 'center'}}
        onPress={() => navigation.goBack()}
      >
        <MaterialCommunityIcons name="backspace" size={40} color="#1b262c" />
      </TouchableOpacity>
      <AppText style={styles.screenName}>{name}</AppText>
      {renderButton ? (
        <View style={styles.renderContainer}>{renderButton}</View>
      ) : next ? (
        <View style={styles.buttonContainer}>
          <AppText style={styles.nextButtonText} onPress={onPressNext}>
            {next}
          </AppText>
        </View>
      ) : (
        <View />
      )}

      {idCheck ? (
        <View>
          <Menu>
            <MenuTrigger
              text={
                <MaterialIcons name="more-vert" size={40} color="#1b262c" />
              }
            />
            <MenuOptions customStyles={optionsStyles}>
              <MenuOption onSelect={handleUpdate} text={'Update'} />
              <MenuOption
                onSelect={() =>
                  Alert.alert(
                    'Delete',
                    'Are you sure you want to delete this post?',
                    [
                      {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel for post deletion'),
                        style: 'cancel',
                      },
                      {text: 'OK', onPress: handleDelete},
                    ],
                    {cancelable: false},
                  )
                }
                text={'Delete'}
              />
            </MenuOptions>
          </Menu>
        </View>
      ) : (
        <View></View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    marginVertical: 5,
    paddingTop: 18,
    marginHorizontal: 20,
  },
  screenName: {
    fontSize: 16,
    alignSelf: 'center',
    marginHorizontal: 15,
  },
  buttonContainer: {
    width: '90%',
    alignSelf: 'center',
    // paddingHorizontal: 5,
  },
  renderContainer: {
    width: '70%',
    alignSelf: 'flex-end',
  },
  nextButtonText: {
    fontSize: 18,
    alignSelf: 'center',
    marginHorizontal: 15,
    fontFamily: 'Poppins-Medium',
  },
});
