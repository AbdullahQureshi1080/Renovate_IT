import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import ErrorMessage from '../AppForm/ErrorMessage';
import AppText from '../AppText';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native';

const {width, height} = Dimensions.get('screen');

export default function SavedItemList({
  style,
  imageStyles,
  data,
  refresh,
  refreshSavedItems,
  error,
  onPressDownload,
  onPressShare,
  onPressSelect,
}) {
  return (
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
          <AppText style={{fontSize: 14}}>No Saved Items</AppText>
        </View>
      )}
      style={{backgroundColor: '#e8e8e8'}}
      horizontal={onPressDownload ? true : false}
      refreshing={refresh}
      onRefresh={refreshSavedItems}
      data={data.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      })}
      keyExtractor={(item) => item._id}
      renderItem={({item}) => (
        <View style={[styles.container, style]}>
          <TouchableOpacity onPress={() => onPressSelect(item.image)}>
            <Image
              source={{uri: item.image}}
              style={[styles.image, imageStyles]}
            />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'flex-end',
              //   marginRight: 20,
              marginTop: 10,
            }}
          >
            {onPressDownload && onPressShare ? (
              <>
                <MaterialCommunityIcons
                  name="download"
                  size={30}
                  color="#1b262c"
                  style={styles.icon}
                  onPress={() => onPressDownload(item.image)}
                />
                <MaterialCommunityIcons
                  name="share-variant"
                  size={30}
                  color="#1b262c"
                  style={styles.icon}
                  onPress={() => onPressShare(item.image)}
                />
              </>
            ) : (
              <View />
            )}
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginRight: 15,
    marginHorizontal: 15,
    marginVertical: 15,
    // width: width,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#ffffff',
    borderRadius: 5,
  },
  image: {
    width: width / 1.15,
    height: height / 4,
    borderRadius: 5,
  },
  icon: {
    marginRight: 10,
  },
});
