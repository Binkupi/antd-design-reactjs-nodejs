import * as types from '../Constants'

const initialState = {
  user: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    addresses: [],
    joinDate: "",
    role: {},
    isConfirmed: false,
    id: ""
  },
  jwt: localStorage.getItem('token'),
  isLoggedIn: false,
  isLoading: true,
};

const authReducer = (state = initialState, action) => {
  switch(action.type) {
    case types.SET_USER:
      return {
        ...state,
        ...action.auth
      }

    default:
      return state;
  }
}

export default authReducer;