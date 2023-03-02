import * as types from'../constants/ActionTypes'
var result=localStorage.getItem('user');
var init_user=result?JSON.parse(result):{
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

var initialState={
     id: init_user.id,
     firstName: init_user.firstName,
     lastName: init_user.lastName,
     gender: init_user.gender,
     phone:init_user.phone,
     addresses:init_user.addresses,
     joinDate:init_user.joinDate,
     email:init_user.email,
     role:init_user.role,
     isAdmin: false
};

const user=(state=initialState,action)=>{
    switch(action.type){
        case types.FETCH_USER_BY_ID:
            return action.user; 
        case types.LOGIN_USER:
            localStorage.setItem('user', JSON.stringify(action.user));
            return action.user;  
        case types.LOG_OUT:
             var newUser={
                id: '',
                firstName:'',
                lastName:'',
                gender:'',
                phone:'',
                addresses:[],
                joinDate:'',
                email:'',
                role:[],
                isAdmin: false
            }  
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            localStorage.removeItem('isAdmin');
            return newUser;       
        default:
            return state;
    }

}
export default user;