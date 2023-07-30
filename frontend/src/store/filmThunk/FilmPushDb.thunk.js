import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";





export const FilmPushDbThunk = createAsyncThunk('api/film/push', async (dataFilm,{rejectWithValue})=> {

    try{

        const response = axios.post('http://127.0.0.1:8000/api/film/push',dataFilm)


        if(response.status != 200 ) 

        throw new Error('bad request to add film')


        return response.data

    }

    catch(err) {


    return rejectWithValue(err.message)
        }


})
