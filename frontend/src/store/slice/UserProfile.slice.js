import { createSlice } from "@reduxjs/toolkit";
import { userProfileThunk } from "../userThunk/UserProfile.thunk";
import { userChangeThunk } from "../userThunk/UserChangeProfile.thunk";


const initialStateUserProfile = {

    userDataProfile : {
    }





}




const userProfileSlice = createSlice({

    name:'userProfile',
    initialState: initialStateUserProfile,

    reducers : {},
    extraReducers : (builder) => {

        builder.addCase(userProfileThunk.pending,(state)=>{



        })
        .addCase(userProfileThunk.rejected,(state,action)=>{
            console.log(action.payload)


        })
        .addCase(userProfileThunk.fulfilled,(state,action)=>{

            state.userDataProfile = action.payload


        })
        .addCase(userChangeThunk.pending,(state,action) => {

        })
        .addCase(userChangeThunk.rejected,(state,action) => {

            console.log(action.payload)
            
        })
        .addCase(userChangeThunk.fulfilled,(state,action) => {

            state.userDataProfile.age = action.payload.age
            
        })


    }
}

)

export const {reducer: userProfileReducer, actions: UserProfileActions} = userProfileSlice