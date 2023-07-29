import { createAsyncThunk } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

export const loginThunk = createAsyncThunk('/api/token', async (loginData, {rejectWithValue}) => {


  try {

    const response = await axios.post('http://127.0.0.1:8000/api/token/',loginData) 


    if (response.status != 200 ) {
      throw new Error('Login failed. Please check your credentials.');
    }


    const data = await response.data



    return data


  } catch (err) {

    return rejectWithValue(err.message)
  }
});
