import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios'





export const    updateTokenThunk =  createAsyncThunk ('/api/token/refresh', async (tokens,{rejectWithValue}) => {


    try {



        const refresh_token = JSON.parse(tokens).refresh_token


        const body =  {'refresh' : refresh_token}


        const response =  await axios.post('http://127.0.0.1:8000/api/token/refresh/',body) 


        if (response.status != 200) {

            throw new Error('Ошибка при запросе на обновление токена')
        }



        return response.data
    }


    catch (err) {

        return rejectWithValue(err.message)
      }

});