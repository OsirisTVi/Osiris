import { createSlice } from "@reduxjs/toolkit";
import { FilmPushDbThunk } from "../filmThunk/FilmPushDb.thunk";
import { FilmsRetrieveThunk } from "../filmThunk/FilmsRetrieve.thunk";



const initialStateFilm = {
    
    // filmToPushDataBase :  {
    //     country : null,
    //     name : null,
    //     images : [],
    //     genres : [],

    // },

    filmObjects : []
        



}



const filmSlice = createSlice({
    name : 'film',
    initialState : initialStateFilm,
    reducers : {},




    extraReducers : (builder) => {

        builder
        .addCase(FilmPushDbThunk.pending,() => {
        })





        .addCase(FilmsRetrieveThunk.pending,(state) => {


        
        })
        .addCase(FilmsRetrieveThunk.rejected,(state,action) => {


        
        })
        .addCase(FilmsRetrieveThunk.fulfilled,(state,action) => {
            

            state.filmObjects = action.payload


        
        })


    }

})



export const {reducer : filmReducer, actions : filmActions} = filmSlice