import { combineReducers } from "redux";
import users from './users';
import products from './product';
import cart from './cart';


const Reducers = combineReducers({
    users,
    products,
    cart
});

export default Reducers;
