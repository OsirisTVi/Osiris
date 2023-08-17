import { createSlice } from "@reduxjs/toolkit";
import {loginThunk} from '../authThunk/Login.thunk'
import jwt_decode  from 'jwt-decode'
import { registerThunk } from "../authThunk/Register.thunks";




const initialStateAuth= {

    user : localStorage.getItem('token') ? jwt_decode(localStorage.getItem('token')) : null,
    errors : null,
    loading : true

}


const authSlice = createSlice({

    name : 'auth',
    initialState : initialStateAuth,
    reducers: {

        logout: (state) => {
        state.user = null;
        state.status = '';
        localStorage.removeItem('token');
        state.errors = null;
    },

},
    

    extraReducers : (builder) => {

        builder.addCase(loginThunk.pending, (state) => {

        }).
        addCase(loginThunk.rejected, (state,action) => {

            state.loading = false


        }).
        addCase(loginThunk.fulfilled, (state,action) => {

            localStorage.setItem('token',action.payload.access)
            state.user = jwt_decode(localStorage.getItem('token'))

        })
        .addCase(registerThunk.pending,(state) =>{


        })
        .addCase(registerThunk.rejected,(state,action) => {
            console.log(action.payload)
            state.errors = action.payload.errors.errors


        })
        .addCase(registerThunk.fulfilled,(state,action) => {

            localStorage.setItem('token', action.payload.access_token)
            state.user = jwt_decode(action.payload.access_token)

            
        })



    }

})


export const { reducer: authReducer, actions: authActions } = authSlice;
