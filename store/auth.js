// import {createSlice} from "@reduxjs/toolkit";
// // import {createSelector} from 'reselect';
// import {apiCallBegan} from './api';
// import { authURL } from "./constants";

// const slice = createSlice({
//     name:"auth",
//     initialState:{ 
//         isLoggedIn : false,
//         userId: "",
//         token:"",
//         refreshToken:"",
//         expiresOn:"",
//         data:[],
//     },
//     // actionsTypes => action handlers (reducers)
//     reducers:{
//         loginRequestFailed:(auth,action)=>{
//             auth.isLoggedIn = false;
//         },
//         loginRequestSuccess:(auth,action)=>{
//             auth.isLoggedIn = true;
//         },
//         // userVerified:(auth,action)=>{
//         //     // const verifiedUser = auth.data
//         // }
//     }
// })



// const {} = slice.actions;
// export default slice.reducer;


// // actionCreators

// export const verifyUser = (email,password)=>{
//     apiCallBegan({
//         url:authURL,
//         method:"Post",
//         data:{
//             email,
//             password
//         },
//         // onSuccess: {},
//     })
// }