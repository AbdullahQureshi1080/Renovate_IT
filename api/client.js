import {create} from 'apisauce';
// import { response } from 'express';

const client = create({
  baseURL: 'http://192.168.18.13:9000/api/',
  // baseURL: "https://renovateit.herokuapp.com/api/",
});

export default client;
