import * as types from "./../constants/ActionTypes";

const result = localStorage.getItem('user');
const initUser = result ? JSON.parse(result) : {
    id: '',
    firstName:'',
    lastName:'',
    gender:'',
    phone:'',
    addresses:[],
    joinDate:'',
    email:'',
    isAdmin: false,
    role:[]
};
const initialState = {
  user: initUser.id,
  items: [],
  canOrder: false,
  totalAmount: 0,
  finalAmount: 0,
};
const cart = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_CART:
      return action.cart;
    default:
      return state;
  }
};

export default cart;
