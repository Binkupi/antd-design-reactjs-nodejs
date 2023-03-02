import * as types from './Constants'
import axios from './../../Configs/Axios'

export const onGetListTagsRequest=({pageIndex,pageSize})=>{
    return new Promise( async(resolve, reject) => {
        try{
            const data= await axios.get(`/tags?page=${pageIndex}&pageSize=${pageSize}`);
            resolve(data);
        
        }catch(e){
            reject(e.response)
        }
    })
}

export const onCreateTagRequest=(tag)=>{
    return new Promise( async(resolve, reject) => {
        try{
            const data= await axios.post(`/tags`,tag);
            resolve(data);
        
        }catch(e){
            reject(e.response)
        }
    })
}

export const onDeleteTagRequest=(id)=>{
    return new Promise( async(resolve, reject) => {
        try{
            const data= await axios.delete(`/tags/${id}`);
            resolve(data);
        
        }catch(e){
            reject(e.response)
        }
    })
}

export const onGetTagByIdRequest=(id)=>{
    return new Promise( async(resolve, reject) => {
        try{
            const data= await axios.get(`/tags/${id}`);
            resolve(data);
        
        }catch(e){
            reject(e.response)
        }
    })
}

export const onUpdateTagRequest=(id,tag)=>{
    return new Promise( async(resolve, reject) => {
        try{
            const data= await axios.put(`/tags/${id}`,tag);
            resolve(data);
        
        }catch(e){
            reject(e.response)
        }
    })
}