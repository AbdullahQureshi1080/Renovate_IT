// import client from './client';

// // import apisauce from "apisauce";

// const register = (firstname,lastname,email,password) => client.post('user/register', {
//     firstname: firstname,
//     lastname:lastname,
//     email:email,
//     password:password,
// });



// export default {
//     register
// }

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