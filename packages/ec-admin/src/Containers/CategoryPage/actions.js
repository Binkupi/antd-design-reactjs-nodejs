import * as types from './Constants'
import axios from './../../Configs/Axios'


export const onGetListCatagorysRequest=({pageIndex,pageSize})=>{
    return new Promise( async(resolve, reject) => {
        try{
            const data= await axios.get(`/categories?page=${pageIndex}&pageSize=${pageSize}`);
            resolve(data);
        
        }catch(e){
            reject(e.response)
        }
    })
}

export const onCreateCategoryRequest=(category)=>{
    return new Promise( async(resolve, reject) => {
        try{
            const data= await axios.post(`/categories`,category);
            resolve(data);
        
        }catch(e){
            reject(e.response)
        }
    })
}

export const onGetCategoryByIdRequest=(id)=>{
    return new Promise( async(resolve, reject) => {
        try{
            const data= await axios.get(`/categories/${id}`);
            resolve(data);
        
        }catch(e){
            reject(e.response)
        }
    })
}

export const onDeleteCategoryByIdRequest=(id)=>{
    return new Promise( async(resolve, reject) => {
        try{
            const data= await axios.delete(`/categories/${id}`);
            resolve(data);
        
        }catch(e){
            reject(e.response)
        }
    })
}

export const onUpdateCategoryRequest=(id,category)=>{
    return new Promise( async(resolve, reject) => {
        try{
            const data= await axios.put(`/categories/${id}`,category);
            resolve(data);
        
        }catch(e){
            reject(e.response)
        }
    })
}

