import { combineReducers } from "redux";
import auth from "../Containers/LoginPage/Reducers/auth";
import users from "../Containers/UserPage/reducers/users";

const AppReducer=combineReducers({
    auth,
    users,
})

export default AppReducer;