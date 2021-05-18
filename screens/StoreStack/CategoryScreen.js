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
  const [products, setProducts] = useState([]);

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

  const handleSearch = (search) => {
    const query = search.toLowerCase();
    if (query == '') {
      fetchProducts();
      return;
    }
    const searched = products.filter(function (item) {
      return item.productName.toLowerCase().includes(query);
    });
    setProducts(searched);
  };
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
