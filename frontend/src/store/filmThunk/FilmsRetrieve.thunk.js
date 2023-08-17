import { createAsyncThunk } from "@reduxjs/toolkit";
import { $Api } from "../../configUtils/axiosConfigInstance";





export const FilmsRetrieveThunk = createAsyncThunk('api/film/allFilms', async (data,{rejectWithValue}) => {



    try {

        const response = await $Api.get('/film/allFilms/')



        if (response.status != 200)
         { throw new Error('bad request') }


        const response_data = response.data
        return response_data
    }

    catch(err){
        console.log(err)

        return rejectWithValue(err.message)

    }


}



)




