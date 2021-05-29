import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Linking,
  Modal,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
} from 'react-native';
import AppText from '../AppText';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Avatar} from 'react-native-elements';
import ProductCard from '../Card/ProductCard';

const {width, height} = Dimensions.get('screen');
export default function ShopDetailModal({
  onPressCancel,
  isVisible,
  data,
  products,
  navigation,
  handleCategory,
}) {
  return (
    <Modal visible={isVisible} presentationStyle="formSheet">
      <ScrollView style={styles.modalView}>
        <View
          style={{
            marginVertical: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignSelf: 'flex-end',
            }}
            onPress={onPressCancel}
          >
            <MaterialCommunityIcons
              name="close-circle"
              size={40}
              color="#1b262c"
              style={{alignSelf: 'center'}}
            />
          </TouchableOpacity>
        </View>
        <View style={{marginVertical: 10}}>
          <View style={{flexDirection: 'row'}}>
            <Avatar
              rounded
              source={{
                uri: data.shopImage,
              }}
              containerStyle={{
                marginHorizontal: 5,
                //  alignSelf:"center",
              }}
            />
            <AppText
              style={{
                marginVertical: 10,
                fontSize: 18,
                fontFamily: 'Poppins-Bold',
                color: '#495464',
                alignSelf: 'center',
              }}
            >
              {data.shopName}
            </AppText>
          </View>
          <AppText
            style={{
              marginVertical: 10,
              fontSize: 16,
              fontFamily: 'Poppins-Regular',
              color: '#495464',
              textAlign: 'justify',
            }}
          >
            {data.about}
          </AppText>
          {!data.products ? (
            <View />
          ) : (
            <View style={{marginBottom: 30}}>
              {products ? (
                <View>
                  <AppText
                    style={{
                      marginVertical: 10,
                      fontSize: 14,
                      fontFamily: 'Poppins-Bold',
                      color: '#495464',
                    }}
                  >
                    Products
                  </AppText>
                  <FlatList
                    ListEmptyComponent={
                      <View style={styles.emptyContainer}>
                        <AppText>
                          No Products for this shop available right now ...
                        </AppText>
                      </View>
                    }
                    data={products}
                    horizontal={true}
                    //   numColumns={2}
                    keyExtractor={(item) => item._id}
                    renderItem={({item, index}) => (
                      <View key={index} style={styles.cardContainer}>
                        {item ? (
                          <ProductCard
                            title={item.productName}
                            source={item.productImage}
                            shopName={item.shopName}
                            productPrice={item.productPrice}
                            onPress={() => handleCategory(item)}
                          />
                        ) : (
                          <AppText>loading...</AppText>
                        )}
                      </View>
                    )}
                  />
                </View>
              ) : (
                // </View>
                <View></View>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalView: {
    // height: "50%",
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
  cardContainer: {
    paddingRight: 5,
    paddingLeft: 5,
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
  emptyContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
