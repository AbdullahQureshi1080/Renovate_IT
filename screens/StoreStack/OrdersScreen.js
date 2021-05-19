//  Native Imports
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {v4 as uuidv4} from 'uuid';

// Api Imports
import useApi from '../../hooks/useApi';
import storeAPI from '../../api/store';

//  Components Import
import OrderCard from '../../components/Card/OrderCard';
import {useSelector} from 'react-redux';

export default function OrdersScreen({navigation, route}) {
  const ordersApi = useApi(storeAPI.userStoreOrders);
  const userId = useSelector((state) => state.entities.auth.data._id);
  const [refresh, setRefresh] = useState(false);

  const [orders, setOrders] = useState([
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
    //   orderStatus: 'Confirmed',
    //   quantity: 2,
    //   totalOrderPrice: '40000',
    //   deliveryDetails: {
    //     address: 'House No 9022, Street 50, F-11/2',
    //     city: 'Islamabad',
    //     province: 'Islamabad Federal Territory ',
    //     zipCode: '44000',
    //   },
    // },
  ]);

  const fetchOrders = async () => {
    const result = await ordersApi.request(userId);
    if (!result.ok) {
      console.log('Error Fetching Products');
      return;
    }
    console.log('Order Object from Store Api', result.data[0]);
    setOrders(result.data);
  };

  useEffect(() => {
    fetchOrders();
  }, [navigation, route]);

  const handlePress = (product) => {
    navigation.navigate('View Order', {data: product});
  };
  const styleforstatusRed = {
    color: '#F16174',
  };
  const styleforstatusGreen = {
    color: '#0F4C75',
  };

  const handleStatus = (status) => {
    if (status.toLowerCase() == 'confirmed') {
      return styleforstatusGreen;
    } else if (status.toLowerCase() == 'awaiting confirmation') {
      return styleforstatusRed;
    }
  };

  const refreshOrders = () => {
    // if (posts !== []) {
    setRefresh(true);
    fetchOrders();
    setRefresh(false);
    // }
  };
  return (
    <>
      <FlatList
        onRefresh={refreshOrders}
        refreshing={refresh}
        style={styles.container}
        data={orders}
        keyExtractor={(item) => item._id}
        renderItem={({item, index}) => (
          <View key={index} style={styles.cardContainer}>
            <OrderCard
              productName={item.products[0].productName}
              source={item.products[0].productImage}
              shopName={item.products[0].shopName}
              productPrice={item.products[0].productPrice}
              shopImage={item.products[0].shopImage}
              orderStatus={item.orderStatus}
              totalOrderPrice={item.totalOrderCost}
              styleStatus={handleStatus(item.orderStatus)}
              onPress={() => handlePress(item)}
            />
          </View>
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 5,
  },
  cardContainer: {
    marginVertical: 5,
  },
});
