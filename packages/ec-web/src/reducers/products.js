import * as types from './../constants/ActionTypes'

var initialState = {
    results: [],
    pagination: {
      page: 1,
      pageSize: 20,
      pageCount: 0,
      total: 0
    }
};
const products=(state=initialState,action)=>{
    switch(action.type){
        case types.FETCH_PRODUCTS:
             return action.products;
        default:
            return state;
}}


export default products;
