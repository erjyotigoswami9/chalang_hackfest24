import { combineReducers, legacy_createStore, applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk' 
import { cartReducer, cartPrice } from './reducers'

export const rootReducer = combineReducers({
    cartPrice ,
    cartReducer,
})

export const store = legacy_createStore(rootReducer,applyMiddleware(thunk)) ;