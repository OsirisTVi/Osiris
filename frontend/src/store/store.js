import {configureStore,combineReducers } from '@reduxjs/toolkit'
import {authReducer} from './slice/Auth.slice.js'
import {filmReducer} from './slice/Film.slice.js'
import {userProfileReducer } from './slice/UserProfile.slice.js'
import thunk from 'redux-thunk'

const allReducers = combineReducers({

    auth : authReducer,
    film : filmReducer,
    userProfile:userProfileReducer
})


const store = configureStore ({
    reducer : allReducers,
    middleware: [thunk],
})



export default store