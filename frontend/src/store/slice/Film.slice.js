import { createSlice } from "@reduxjs/toolkit";
import { FilmPushDbThunk } from "../filmThunk/FilmPushDb.thunk";



const initialState = {
    filmToPushDataBase :  {
        country : null,
        name : null,
        images : [],
        genres : [],

    }
        



}



const filmSlice = createSlice({
    name : 'film',
    initialState : initialState,
    reducers : {},




    extraReducers : (builder) => {

        builder
        .addCase(FilmPushDbThunk.pending,() => {



        })


    }

})



export const {reducer,actions} = filmSlice