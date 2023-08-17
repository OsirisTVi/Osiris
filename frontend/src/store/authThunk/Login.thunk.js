import { createAsyncThunk } from '@reduxjs/toolkit';
import { $Api } from '../../configUtils/axiosConfigInstance';



export const loginThunk = createAsyncThunk('/user/token/', async (loginData, {rejectWithValue}) => {


  try {

    const response = await $Api.post('user/token/',loginData) 


    if (response.status != 200 ) {
      throw new Error('Login failed. Please check your credentials.');
    }


    const data = await response.data



    return data


  } catch (err) {

    return rejectWithValue(err.message)
  }
});
