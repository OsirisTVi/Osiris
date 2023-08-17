import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { $Api } from "../../configUtils/axiosConfigInstance";




export const userChangeThunk = createAsyncThunk('/user/profile/change/', async (dataToChange,{rejectWithValue}) => {


    try {

        const response = await $Api.patch('/user/profile/change/',dataToChange)

        if (response.status != 200) {

            throw new Error('bad request')


        }

        


        const dataResponse = response.data
        return dataResponse


    }

    catch(e){

        rejectWithValue(e.message)
    }

} )