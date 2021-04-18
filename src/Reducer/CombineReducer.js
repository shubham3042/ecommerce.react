import {combineReducers} from 'redux';
import AddWishReducer from './AddWishReducer';
import AddToCartReducer from './AddToCartReducer';
import UserReducer from './UserReducer'
export default combineReducers({
AddWishReducer,
AddToCartReducer,
UserReducer
})