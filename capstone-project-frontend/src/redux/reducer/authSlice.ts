/** @format */

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISignInForm } from '../../pages/signin';
import axios from '../../api/axios';

interface User {
	id: number;
	first_name: string;
}

// initialize userToken from local storage
const userToken = localStorage.getItem('token')
	? localStorage.getItem('token')
	: null;

interface IAuthState {
	loading: boolean;
	userInfo: User | null; // for user object
	userToken: string | null; // for storing the JWT
	success: boolean; // for monitoring the registration proces
	isLoggedIn: boolean;
	error: string | null;
}

const initialState: IAuthState = {
	isLoggedIn: Boolean(userToken),
	loading: false,
	userInfo: null, // for user object
	userToken: userToken, // for storing the JWT
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
