import * as types from './Constants'
import axios from './../../Configs/Axios'
import qs from "qs";

export const onGetOrderByIdRequest=(id)=>{
    return new Promise( async(resolve, reject) => {
        try{
            const data= await axios.get(`/orders/${id}`)
            resolve(data);
        
        }catch(e){
            reject(e.response)
        }
    })
}

export const onUpdateOrderStatusByIdRequest=(objOrderStatus)=>{
    return new Promise( async(resolve, reject) => {
        try{
            const data= await axios.put(`/orders/update-status`,objOrderStatus);
            resolve(data);
        
        }catch(e){
            reject(e.response)
        }
    })
}

export const onGetListOrderRequest=(objSearch)=>{
    return new Promise( async(resolve, reject) => {
        try{
            const query = qs.stringify({
                ...objSearch
              });
            const data= await axios.get(`/orders?${query}`)
            resolve(data);
        
        }catch(e){
            reject(e.response)
        }
    })
}
