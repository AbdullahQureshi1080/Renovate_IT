import client from './client';


const register = (userInfo) => client.post('user/register', userInfo);


export default {
    register
}