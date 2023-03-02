import * as types from '../Constants'

const initialState=[];

const statusReducer=(state=initialState,action)=>{
    switch(action.type){
        case types.FETCH_LSTPRODUCT:
            return action.listProduct;
        default:
            return state;
    }
}

export default statusReducer;