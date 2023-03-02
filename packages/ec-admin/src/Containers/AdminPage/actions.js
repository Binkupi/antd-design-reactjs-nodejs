import * as types from './Constants'
import axios from './../../Configs/Axios'

//xu lý status
export const onToggleStatus=()=>{
    return {
        type:types.TOGGLE_STATUS
    }
}


//xử lý listProduct
export const onFetchListProduct=(list)=>{
    return {
        type:types.FETCH_LSTPRODUCT,
        listProduct:list
    }
}

export const onFetchListProductRequest=()=>{
    return async (dispatch)=>{
        const data= await axios.get('/products');
        dispatch(onFetchListProduct(data));
    }
}
