import { createAsyncThunk } from "@reduxjs/toolkit";
import { $Api } from "../../configUtils/axiosConfigInstance";



export const userProfileThunk = createAsyncThunk('/user/profile/', async (rejectWithValue) => {

    try{


        const response = await $Api.get('/user/profile')

        if (response.status != 200) {

            throw new Error('bad request')
        }

        return response.data



    }


    catch(err){

        return rejectWithValue(err.message)



    }



} )