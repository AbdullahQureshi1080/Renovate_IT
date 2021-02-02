
import client from './client';

const register = (firstname,lastname,email,password) => 
    // console.log(firstname,lastname,email,password);
    client.post('user/register', {
    firstname,lastname,email,password
});
// };




export default {
    register,
}