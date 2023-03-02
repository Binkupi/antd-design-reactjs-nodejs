import thunk from 'redux-thunk'
import {createStore,applyMiddleware} from 'redux'
import appReducer from './../Reducers'

const store=createStore(
    appReducer,
    applyMiddleware(thunk)
)

export default store;