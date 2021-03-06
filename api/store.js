import client from './client';

// Products -----------------------------------

const getProducts = (userId, category) =>
  client.post('store/getStoreProducts', {
    userId,
  });

const getCategoryProducts = (userId, category) =>
  client.post('store/getSpecificStoreProducts', {
    userId,
    category,
  });

const getShopData = (shopId) =>
  client.post('shop/getShopData', {
    shopId,
  });

const getShopProducts = (shopId) =>
  client.post('shop/getShopProducts', {
    shopId,
  });

const orderFromStore = (
  userId,
  shopId,
  products,
  totalOrderCost,
  deliveryDetails,
) =>
  client.post('store/placeOrder', {
    userId,
    shopId,
    products,
    totalOrderCost,
    deliveryDetails,
  });

const userStoreOrders = (userId) =>
  client.post('store/getUserOrders', {
    userId,
  });

const cancelStoreOrder = (userId, orderId) =>
  client.post('store/cancelOrder', {
    userId,
    orderId,
  });

export default {
  getProducts,
  getCategoryProducts,
  orderFromStore,
  userStoreOrders,
  cancelStoreOrder,
  getShopData,
  getShopProducts,
};
