/** @format */

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISignInForm } from '../../pages/signin';
import axios from '../../api/axios';
import jwt_decode from 'jwt-decode';

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
  status: string;
}

const initialState: IAuthState = {
	isLoggedIn: Boolean(token),
	loading: false,
	userToken: token === null ? null : jwt_decode(token), // for storing the JWT
	error: null,
	success: false, // for monitoring the registration process.
  status: "idle"
};

interface IActionWithPayload {
  type: string;
  payload?: any;
  meta?: any;
  error?: any;
}

export const signIn = createAsyncThunk(
	'auth/signin',
	async ({ email, password }: ISignInForm, {rejectWithValue}) => {
		try {
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
		} catch (error: any) {
      if (!error.response) {
        throw error
      }
      return  rejectWithValue(error.response.data.message);
    }
	}
);


export const authSlice = createSlice({
	name: 'authentication',
	initialState,
	reducers: {
		signOut: (state) => {
			// …logout reducer
			state.userToken = null;
			state.isLoggedIn = false;
			localStorage.removeItem('token');
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(signIn.pending, (state) => {
        state.status = "pending";
				state.loading = true;
        state.error = null;
			})
			.addCase(signIn.fulfilled, (state) => {
        state.status = "succeeded";
				state.isLoggedIn = true;
				state.success = true;
			})
			.addCase(signIn.rejected, (state, action: IActionWithPayload) => {
        state.status = "failed"
				state.error = action.error.message;
        state.success = false;
        state.isLoggedIn = false;
        state.loading = false;
        state.userToken = null;
			});
	},
});

export const { signOut } = authSlice.actions;
export default authSlice.reducer;
