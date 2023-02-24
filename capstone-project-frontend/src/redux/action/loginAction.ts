/** @format */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ISignInForm } from '../../pages/signin';
import axios from '../../api/axios';

const register = () => {
	return axios.post('/auth/signup', {});
};

const signIn = createAsyncThunk(
	'auth/signin',
	async ({ email, password }: ISignInForm, thunkApi) => {
    try {
      const response =  await axios
			.post('/auth/signin', {
				email,
				password,
			})
      if (response.data.token) {
        // store user's token in local storage
        localStorage.setItem('token', JSON.stringify(response.data.token));
      }
			return response.data;
    } catch (error: any) {
      const message = error.message;
      return thunkApi.rejectWithValue(message);
    }
	}
);

const signOut = () => {
	return localStorage.removeItem('token');
};

export default {
	register,
	signIn,
	signOut,
};
