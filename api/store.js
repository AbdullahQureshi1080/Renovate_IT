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

export default {
  getProducts,
  getCategoryProducts,
};
