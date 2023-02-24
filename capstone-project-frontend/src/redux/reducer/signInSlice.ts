/** @format */

import {
	createAsyncThunk,
	createSlice,
	PayloadAction,
	StateFromReducersMapObject,
} from '@reduxjs/toolkit';
import signInOutput from '../../types/signIn.dto';
import { ISignInForm } from '../../pages/signin';
import axios from '../../api/axios';
import { AppDispatch } from '../store';

const token = localStorage.getItem('token');
const user = Boolean(token);

interface IAuthState {
	isLoggedIn: boolean;
	loading: boolean;
	error: string | null;
}

const initialState: IAuthState = {
	isLoggedIn: false,
	loading: false,
	error: null,
};

type State = number;

const signIn = createAsyncThunk<
	signInOutput,
	ISignInForm,
	{
		dispatch: AppDispatch;
    state: State
		extra: {
			jwt: string;
		};
	}
>('auth/signin', async ({ email, password }: ISignInForm, thunkApi) => {
	try {
		const response = await axios.post(
			'/auth/signin',
			{
				email,
				password,
			},
			{
				headers: {
					Authorization: `Bearer ${thunkApi.extra.jwt}`,
				},
			}
		);
		if (response.data.token) {
			// store user's token in local storage
			localStorage.setItem('token', JSON.stringify(response.data.token));
		}
		return (await response.data.json()) as signInOutput;
	} catch (error: any) {
		const message = error.message;
		return thunkApi.rejectWithValue(message);
	}
});

export const signInSlice = createSlice({
	name: 'authentication',
	initialState: initialState,
	reducers: {
		login: (state) => {
			state.isLoggedIn = true;
		},
		logout: (state) => {
			state.isLoggedIn = false;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(signIn.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(signIn.fulfilled, (state) => {
				state.loading = false;
				state.isLoggedIn = true;
			})
			.addCase(signIn.rejected, (state, action: PayloadAction<any>) => {
				state.error = action.payload;
			});
	},
});

export default signInSlice.reducer;
