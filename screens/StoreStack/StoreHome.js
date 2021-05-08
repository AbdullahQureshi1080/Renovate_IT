//  Native Imports
import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';

//  Components Import
import AppText from '../../components/AppText.js';
import CategoryCard from '../../components/Card/CategoryCard.js';
import SearchBar from '../../components/SearchBar.js';
import {v4 as uuidv4} from 'uuid';
import StoreNavigator from '../../navigation/StoreNavigator.js';
// uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

export default function StoreHome({navigation}) {
  const ProductCategories = [
    {
      id: uuidv4(),
      value: 'sofas',
      label: 'Sofas',
      image: require('../../assets/images/sofas.jpg'),
    },
    {
      id: uuidv4(),
      value: 'beds',
      label: 'Beds',
      image: require('../../assets/images/bed.jpg'),
    },
    {
      id: uuidv4(),
      value: 'tables',
      label: 'Tables',
      image: require('../../assets/images/table.jpg'),
    },
    {
      id: uuidv4(),
      value: 'chairs',
      label: 'Chairs',
      image: require('../../assets/images/chair.jpeg'),
    },
    {
      id: uuidv4(),
      value: 'mattresses',
      label: 'Mattresses',
      image: require('../../assets/images/mattress.jpg'),
    },
    {
      id: uuidv4(),
      value: 'lamps',
      label: 'Lamps',
      image: require('../../assets/images/lamp.jpg'),
    },
    {
      id: uuidv4(),
      value: 'dressers',
      label: 'Dressers',
      image: require('../../assets/images/dresser.jpg'),
    },
    {
      id: uuidv4(),
      value: 'storage',
      label: 'Storage',
      image: require('../../assets/images/storage.jpg'),
    },
    {
      id: uuidv4(),
      value: 'drawers',
      label: 'Drawers',
      image: require('../../assets/images/drawer.jpg'),
    },
    {
      id: uuidv4(),
      value: 'others',
      label: 'Others',
      image: require('../../assets/images/others.jpg'),
    },
  ];
  const [categories, setCategories] = useState(ProductCategories);

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

  const handleCategory = (category) => {
    navigation.navigate('CategoryScreen', {category: category});
  };
  return (
    // <View style={styles.container}>
    //   <FlatList
    //     ListHeaderComponent={
    //       <>
    //         <SearchBar
    //           placeholder="Category search ...."
    //           onChangeText={handleSearch}
    //           filter
    //         />
    //         <AppText style={styles.headText}>Select By Category</AppText>
    //       </>
    //     }
    //     data={categories}
    //     numColumns={2}
    //     keyExtractor={(item) => item.id}
    //     renderItem={({item, index}) => (
    //       <View key={index} style={styles.cardContainer}>
    //         <CategoryCard
    //           title={item.label}
    //           source={item.image}
    //           onPress={() => handleCategory(item.value)}
    //         />
    //       </View>
    //     )}
    //   />
    // </View>
    // <View>
    <StoreNavigator />
    // </View>
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
  },
  cardContainer: {
    paddingRight: 5,
    paddingLeft: 5,
  },
});
