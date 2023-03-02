import * as types from './Constants'
import axios from './../../Configs/Axios'


export const onGetListProductRequest=({pageIndex,pageSize})=>{
    return new Promise( async(resolve, reject) => {
        try{
            const data= await axios.get(`/products?page=${pageIndex}&pageSize=${pageSize}`);
            resolve(data);
        
        }catch(e){
            reject(e.response)
        }
    })
}

export const onSearchProductRequest=(keyword,{pageIndex,pageSize})=>{
    return new Promise( async(resolve, reject) => {
        try{
            const data= await axios.get(`/products/search?_q=${keyword}?page=${pageIndex}&pageSize=${pageSize}`);
            resolve(data);
        
        }catch(e){
            reject(e.response)
        }
    })
}

export const onDeleletProductRequest=(productId)=>{
    return new Promise( async(resolve, reject) => {
        try{
            const data= await axios.delete(`/products/${productId}`);
            resolve(data);
        
        }catch(e){
            reject(e.response)
        }
    })
}

export const onCreateProductRequest=(product)=>{
    return new Promise( async(resolve, reject) => {
        try{
            const data= await axios({
                method: 'post',
                url: '/products',
                data: product,
              });
            console.log('data',data);
            await axios.get(`/facebook/post-product/${data.id}`)
            resolve(data);
        }catch(e){
            console.log(e.response)
            reject(e.response)
        }
    })
}

export const onUpdateProductRequest=(product,id)=>{
    return new Promise( async(resolve, reject) => {
        try{
            const data= await axios({
                method: 'put',
                url: `/products/${id}`,
                data: product,
              });
              console.log(data);
            resolve(data);
        
        }catch(e){
            reject(e.response)
        }
    })
}

export const onGetListCategoryRequest=()=>{
    return new Promise( async(resolve, reject) => {
        try{
            const data= await axios.get(`/categories`);
            resolve(data);
        
        }catch(e){
            reject(e.response)
        }
    })
}

export const onGetProductByIdRequest=(id)=>{
    return new Promise( async(resolve, reject) => {
        try{
            const data= await axios.get(`/products/${id}`);
            resolve(data);
        
        }catch(e){
            reject(e.response)
        }
    })
}

export const onGetListTagRequest=()=>{
    return new Promise( async(resolve, reject) => {
        try{
            const data= await axios.get(`/tags`);
            resolve(data);
        
        }catch(e){
            reject(e.response)
        }
    })
}

