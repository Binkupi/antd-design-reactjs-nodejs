import * as types from'./../constants/ActionTypes'
let initialState = {
    token: localStorage.getItem('token'),
    isAdmin: (localStorage.getItem('isAdmin') !== undefined) ? localStorage.getItem('isAdmin') : false
}

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case types.SET_TOKEN: 
            localStorage.setItem('token', action.token);
            return {
                ...state,
                token: action.token
            };
        case types.SET_ADMIN: 
            localStorage.setItem('isAdmin', action.isAdmin);
            return {
                ...state,
                isAdmin: action.isAdmin
            };
        default: 
            return state;
    }
}

export default reducer;