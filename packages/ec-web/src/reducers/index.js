import {combineReducers} from 'redux'
import products from './products'
import page from './page'
import sort from './sort'
import cart from './cart'
import order from './order'
import list_bill from './list_bill'
import user from './user'
import authorization from './authorization'

const appReducer=combineReducers({
    products,
    page,
    sort,
    cart,
    order,
    list_bill,
    user,
    authorization,
});
export default appReducer;