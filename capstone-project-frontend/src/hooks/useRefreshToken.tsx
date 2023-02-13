import React from 'react';
import { UseAuth } from './useAuth';
import axios from '../api/axios';


export const UseRefreshToken = () => {
  const setAuth  = UseAuth();

  const refresh = async () => { 
    const response = await axios.get('/refresh', {
      withCredentials: true,
    });

    return response.data.token;
  }
  return refresh;
}  