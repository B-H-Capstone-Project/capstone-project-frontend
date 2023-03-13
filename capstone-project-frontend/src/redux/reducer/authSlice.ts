/** @format */

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISignInForm } from '../../pages/signin';
import axios from '../../api/axios';
import jwt_decode from "jwt-decode";

interface User {
	id: number;
	first_name: string;
}

// initialize userToken from local storage
const token = localStorage.getItem('token')
	? localStorage.getItem('token')
	: null;

export interface IToken {
  id: number;
  role: number;
  iat: number;
  exp: number;
}

interface IAuthState {
	loading: boolean;
	userToken: IToken | null; // for storing the JWT
	success: boolean; // for monitoring the registration proces
	isLoggedIn: boolean;
	error: string | null;
}

const initialState: IAuthState = {
	isLoggedIn: Boolean(token),
	loading: false,
  userToken: token === null? null : jwt_decode(token), // for storing the JWT
	error: null,
	success: false, // for monitoring the registration process.
};

export const signIn = createAsyncThunk(
	'auth/signin',
	async ({ email, password }: ISignInForm) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const response = await axios.post(
			'/auth/signin',
			{
				email,
				password,
			},
			config
		);
		localStorage.setItem('token', JSON.stringify(response.data.token));
		return response.data;
	}
);

export const authSlice = createSlice({
	name: 'authentication',
	initialState,
	reducers: {
		signOut: (state) => {
			// ...logout reducer
      state.userToken = null;
			state.isLoggedIn = false;
      localStorage.removeItem('token');
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(signIn.pending, (state) => {
				state.loading = true;
			})
			.addCase(signIn.fulfilled, (state) => {
				state.loading = false;
				state.isLoggedIn = true;
				state.success = true;
			})
			.addCase(signIn.rejected, (state, action: PayloadAction<any>) => {
				state.error = action.payload;
			});
	},
});

export const { signOut } = authSlice.actions
export default authSlice.reducer;
