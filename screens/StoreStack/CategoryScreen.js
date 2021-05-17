// Native Imports
import React, {useState, useEffect} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {v4 as uuidv4} from 'uuid';

//  Components Import
import AppText from '../../components/AppText';
import ProductCard from '../../components/Card/ProductCard';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';

// Api Imports
import useApi from '../../hooks/useApi';
import storeAPI from '../../api/store';

export default function CategoryScreen({route, navigation}) {
  const userId = useSelector((state) => state.entities.auth.data._id);
  const category = route.params.category;
  const categoryProductsApi = useApi(storeAPI.getCategoryProducts);
  const [products, setProducts] = useState([
    // {
    //   id: uuidv4(),
    //   productName: 'Morris Chair',
    //   productDescription:
    //     'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.',
    //   productPrice: '12000',
    //   productImage:
    //     'https://images.unsplash.com/photo-1611464908623-07f19927264e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    //   shopName: 'Kenwood',
    //   shopImage:
    //     'https://images.unsplash.com/photo-1594809512566-021e8369702a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
    //   shopId: uuidv4(),
    // },
  ]);

  const handleSearch = (search) => {
    const query = search.toLowerCase();
    // console.log(route.params);
    if (query == '') {
      setProducts(products);
      return;
    }
    const searched = products.filter(function (item) {
      // if (!item.value.includes(query)) {
      //   return item.value.includes('others');
      // }
      return item.value.includes(query);
    });
    setProducts(searched);
  };

  const fetchProducts = async () => {
    const result = await categoryProductsApi.request(userId, category);
    if (!result.ok) {
      console.log('Error Fetching Products');
      return;
    }
    console.log(result.data[0]);
    setProducts(result.data);
  };

  const handleCategory = (product) => {
    navigation.navigate('Product Details', {product: product});
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <Header navigation={navigation} idCheck={false} cart={true} />
      <View style={styles.container}>
        <FlatList
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <AppText>
                No Products for this category available right now ...
              </AppText>
            </View>
          }
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
  cardContainer: {
    paddingRight: 5,
    paddingLeft: 5,
  },
  emptyContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
