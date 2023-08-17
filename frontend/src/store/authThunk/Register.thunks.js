import { createAsyncThunk } from "@reduxjs/toolkit";
import { $regApi,$Api } from "../../configUtils/axiosConfigInstance";

export const registerThunk = createAsyncThunk('/api/users/register', async (registrData , {rejectWithValue}) => {

    


    try{

    const response = await $regApi.post('/user/register/',registrData)  


    if (response.status == 200) {
        console.log('успешная регистрация')
        return response.data
    }

    else if(response.status == 400) {
        console.log(response.data)

        throw new Error('bad request')
    }


    
    }


    catch(err) {


        return rejectWithValue({status : err.message,
                                errors : err.response.data})

    }

})

