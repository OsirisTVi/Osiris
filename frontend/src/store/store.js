import {configureStore,combineReducers } from '@reduxjs/toolkit'
import {reducer as authReducer} from './slice/Auth.slice.js'
import {reducer as filmReducer} from './slice/Film.slice.js'
import thunk from 'redux-thunk'

const allReducers = combineReducers({

    auth : authReducer,
    film : filmReducer
})


const store = configureStore ({
    reducer : allReducers,
    middleware: [thunk],
})



export default store