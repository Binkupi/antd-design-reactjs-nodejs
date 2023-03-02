import * as types from '../Constants'

const initialState=false;

const statusReducer=(state=initialState,action)=>{
    switch(action.type){
        case types.TOGGLE_STATUS:
            return !state;
        default:
            return state;
    }
}

export default statusReducer;