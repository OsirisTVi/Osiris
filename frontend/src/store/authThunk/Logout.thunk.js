import { createAsyncThunk } from "@reduxjs/toolkit";
import $Api from "../../configUtils/axiosConfigInstance";


export const logoutThunk = createAsyncThunk('', async (loginData, {rejectWithValue}) => {


    try {
  
      const response = await $Api.get('user/logout/')
  
  
      if (response.status != 200 ) {
        throw new Error('Exit failed');
      }
  
  
      const data = await response.data
  
  
  
      return data
  
  
    } catch (err) {
  
      return rejectWithValue(err.message)
    }
  });
  