// Native Imports
import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';

import {v4 as uuidv4} from 'uuid';

//  Components Import
import AppText from '../../components/AppText';
import ProductCard from '../../components/Card/ProductCard';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';

export default function CategoryScreen({route, navigation}) {
  const [products, setProducts] = useState([
    {
      id: uuidv4(),
      productName: 'Morris Chair',
      productDescription:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      productPrice: '12000',
      productImage:
        'https://images.unsplash.com/photo-1611464908623-07f19927264e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
      shopName: 'Kenwood',
      shopId: uuidv4(),
    },
  ]);
  const category = route.params.category;
  const handleSearch = (search) => {
    const query = search.toLowerCase();
    // console.log(route.params);
    if (query == '') {
      setCategories(ProductCategories);
      return;
    }
    const searched = ProductCategories.filter(function (item) {
      if (!item.value.includes(query)) {
        return item.value.includes('others');
      }
      return item.value.includes(query);
    });
    setCategories(searched);
  };

  const handleCategory = (product) => {
    navigation.navigate('Product Details', {product: product});
  };

  return (
    <>
      <Header navigation={navigation} idCheck={false} />
      <View style={styles.container}>
        <FlatList
          ListHeaderComponent={
            <>
              <SearchBar
                placeholder="Product search ...."
                onChangeText={handleSearch}
                filter
              />
              <AppText style={styles.headText}>{category}</AppText>
            </>
          }
          data={products}
          numColumns={2}
          keyExtractor={(item) => item.id}
          renderItem={({item, index}) => (
            <View key={index} style={styles.cardContainer}>
              <ProductCard
                title={item.productName}
                source={item.productImage}
                shopName={item.shopName}
                productPrice={item.productPrice}
                onPress={() => handleCategory(item)}
              />
            </View>
          )}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  headText: {
    fontSize: 18,
    marginVertical: 10,
    fontFamily: 'Poppins-Medium',
    textTransform: 'capitalize',
  },
});
