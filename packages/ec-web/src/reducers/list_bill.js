import * as types from'./../constants/ActionTypes'

var initialState=[];
var findBillinListBill=(id_Bill,bills)=>{
    var index=-1;
    bills.map((item,i)=>{
        if(item.id_Bill===id_Bill){
            index=i;
        }
        return item;
    });
    return index;
}
const list_bill=(state=initialState,action)=>{
    var replaceState;
    var index;
    switch(action.type){
        case types.FETCH_BILLS_BY_USER:
            replaceState=[...state];
            replaceState=action.bills;
            return replaceState;
        
        case types.CHANGE_STATUS_BILL:
            replaceState=[...state];

            index=findBillinListBill(action.bill.id_Bill,replaceState);
            replaceState[index].status=action.bill.status;
            return replaceState;
        default:
            
            return state;
    }

}
export default list_bill;