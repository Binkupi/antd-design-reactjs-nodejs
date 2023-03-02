import * as types from'../constants/ActionTypes'
var result=localStorage.getItem('user');
var user=result?JSON.parse(result):{
    
};

var initialState={
     products: [],
      totalPrice:0,
     salePrice:0,
     id_User: user.id_User,
     coupon:' ',
     nameCustomer:' ',
     address:' ',
     email:' ',
     orderNote:' ',
     paymentMethod:' ',
     phone: ' ',
};

const order=(state=initialState,action)=>{
    var newOrder
    switch(action.type){
        case types.ADD_INFO_USER_TO_ORDER:
            newOrder={...state};
            newOrder.nameCustomer=action.infoUser.nameCustomer;
            newOrder.address=action.infoUser.address;
            newOrder.id_User=action.infoUser.id_User;
            newOrder.email=action.infoUser.email;
            newOrder.phone=action.infoUser.phone;
            newOrder.paymentMethod=action.infoUser.paymentMethod;
            newOrder.orderNote=action.infoUser.orderNote===''?newOrder.orderNote:action.infoUser.orderNote;
        return newOrder;   
        case types.ADD_COUPON_TO_ORDER:
            newOrder={...state};
            newOrder.coupon=action.infoCoupon.coupon===''?newOrder.coupon:action.infoCoupon.coupon;
            newOrder.salePrice=action.infoCoupon.salePrice;
            return newOrder;  
        case types.FETCH_ID_USER_IN_ORDER:  
            newOrder={...state};
            newOrder.id_User=action.id_User;       
        return newOrder;              
        default:
            return state;
    }

}
export default order;