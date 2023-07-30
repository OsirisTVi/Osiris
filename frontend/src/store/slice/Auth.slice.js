import { createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import { registerThunk } from "../thunk/Register.thunks";
import { loginThunk } from "../thunk/Login.thunk";
import { updateTokenThunk } from "../thunk/Update_token.thunk";




const initialState = {
    user : localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null,
    authTokens : localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null,
    loading : localStorage.getItem('authTokens') ? true : false,
    error:'',
    status:'',
}




const authSlice = createSlice({
    name : 'auth',
    initialState,

    reducers: {

        logout:(state) => {

            state.authTokens = null
            state.user = null
            state.loading = false
            localStorage.removeItem('authTokens')
        
    
            },
    },

    extraReducers: (builder) => {

        builder
        .addCase(registerThunk.pending,(state,action) => {
            state.status = 'loading'
            state.error = ''
        })
        .addCase(registerThunk.rejected,(state,action) => {
            state.status = 'error'
            state.error = action.payload
        })
        .addCase(registerThunk.fulfilled,(state,action) => {
            state.status = 'done'
            state.error = ''

            state.authTokens  = {'access_token':action.payload.access_token,
                                 'refresh_token' : action.payload.refresh_token}

            state.user = {  'access_token':action.payload.access_token,
                            'refresh_token' : action.payload.refresh_token,
                            'username' :jwt_decode(action.payload.access_token).username}

        
        })
        .addCase(loginThunk.pending,(state,action) => {
            state.loading = false
            state.status = 'pending'
            state.error = ''
        })
        .addCase(loginThunk.rejected,(state,action) => {
            state.error = action.payload
            state.status = 'error'
        })
        .addCase(loginThunk.fulfilled,(state,action) => {

            state.error = ''
            state.loading = true,
            state.status = 'done',
            state.user = { 'access_token':action.payload.access,
                            'refresh_token' : action.payload.refresh,
                            'username' : jwt_decode(action.payload.access).username

                        }
                            
            state.authTokens = {  'access_token':action.payload.access,
                                    'refresh_token' : action.payload.refresh,
                        },
        
            localStorage.setItem('authTokens' , JSON.stringify({'access_token' : action.payload.access,
                                                'refresh_token' : action.payload.refresh}))
        })
        .addCase(updateTokenThunk.pending, (state,action) => {
            state.status = 'pending'

        })
        .addCase(updateTokenThunk.rejected, (state,action) => {

            state.error = action.payload
            state.status = 'error'



        })
        .addCase(updateTokenThunk.fulfilled, (state,action) => {

            state.status = 'done',
            state.authTokens = action.payload

            localStorage.setItem('authTokens' , JSON.stringify({'access_token' : action.payload.access,
                                                                'refresh_token' : action.payload.refresh}))

        })




                       }})




export const {reducer,actions} = authSlice