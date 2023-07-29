import {configureStore,combineReducers, applyMiddleware } from '@reduxjs/toolkit'
import {reducer as authReducer} from './slice/Auth.slice'
import thunk from 'redux-thunk'

const allReducers = combineReducers({

    auth : authReducer
})


const store = configureStore ({
    reducer : allReducers,
    middleware: [thunk],
})



export default store