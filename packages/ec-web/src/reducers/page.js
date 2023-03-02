import * as types from './../constants/ActionTypes'

var initialState=1;

const page=(state=initialState,action)=>{
    switch(action.type){
        case types.PAGE_INDEX:
             return action.data;
        default:
            return state;
}}


export default page;
