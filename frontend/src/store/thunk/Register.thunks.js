import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"
import jwtDecode from "jwt-decode";



export const registerThunk = createAsyncThunk('/api/users/register', async (registrData , {rejectWithValue}) => {

    


    try{
    const response = await axios.post('http://127.0.0.1:8000/api/users/register/',registrData)  

    if (response.status != 200) {
        throw new Error('Ошибка при запросе')

    }

        const response_data = response.data

        const authTokens = {'access_token' : response_data.access_token,
                            'refresh_token' : response_data.refresh_token,
                                    }


        localStorage.setItem('authTokens',JSON.stringify(authTokens))


        return response_data

    }


    catch(err) {


        return rejectWithValue(err.message);

    }

})

