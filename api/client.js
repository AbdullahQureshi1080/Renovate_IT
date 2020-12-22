import {create} from 'apisauce';
// import { response } from 'express';

const client = create({
    baseURL: "http://192.168.18.7:9000/api/",
})


export default client;
