import {combineReducers} from "redux";
import authReducer from './auth';
import userReducer from "./user";
import dataReducer from "./data";

export default combineReducers({
    auth: authReducer,
    user:userReducer,
    data:dataReducer,
})