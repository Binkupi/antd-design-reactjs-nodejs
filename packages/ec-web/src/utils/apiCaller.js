import axios from 'axios'

export default function callApi(endpoint,method='GET',body, config){
    return axios({
        method: method,
        url: endpoint,
        baseURL: `${process.env.REACT_APP_API_URL}/`,
        data: body,
        ...config      
    })
}