import {createSlice} from '@reduxjs/toolkit';

// import moment from "moment";
// Combing the two functions createAction and createReducer into one
// let lastId = 0;

const cart = createSlice({
  name: 'cart',
  initialState: {
    counter: 0,
    cart: [],
  },
  reducers: {
    // actions => action handlers

    addToCart: (cart, action) => {
      cart.cart = [...cart.cart, action.payload];
      cart.counter = cart.counter + 1;
    },
    removeFromCart: (cart, action) => {
      // cart.posts = [...cart.posts, action.payload];
      const _id = action.payload;
      const newCart = cart.cart.filter(function (item) {
        return item._id != _id;
      });
      cart.cart = newCart;
      cart.counter = cart.counter - 1;
    },
    updateInCart: (cart, action) => {
      console.log('In Update Cart Redux Store');
      console.log('Action Payload of Updated Item', action.payload);
      const _id = action.payload.itemId;
      cart.cart.filter(function (item) {
        if (item._id == _id) {
          item.quantity = action.payload.itemData.quantity;
          item.totalProductPrice = action.payload.itemData.price;
        }
      });
    },
    clearCart: (cart, action) => {
      cart.cart = [];
      counter = 0;
    },
  },
});

// console.log(slice);

const {addToCart, removeFromCart, updateInCart, clearCart} = cart.actions;
export default cart.reducer;

// Action Creators

// ()=>{} signature function

export const emptyCqrt = () => ({
  type: clearCart.type,
});
export const addItem = (item) => ({
  type: addToCart.type,
  payload: item,
});

export const removeItem = (itemId) => ({
  type: removeFromCart.type,
  payload: itemId,
});

export const updateItem = (data) => ({
  type: updateInCart.type,
  payload: data,
});
