import client from './client';

const login = (email,password) => client.post('user/login', {
    email,password
});



export default {
    login,
}