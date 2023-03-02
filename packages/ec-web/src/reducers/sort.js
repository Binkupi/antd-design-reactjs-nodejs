import * as types from'./../constants/ActionTypes'


var initialState=0; //0-lộn xộn //1 tang dan; 2 giam dan; 3 0-$100; 4 100->500$
const sort=(state=initialState,action)=>{
    switch(action.type){
        case types.SORT:
            return action.status;
        default:
            return state;
    }

}
export default sort;