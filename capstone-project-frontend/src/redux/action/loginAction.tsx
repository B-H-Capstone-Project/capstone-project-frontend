/** @format */

import axios from '../../api/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ISignInForm } from '../../pages/signin';

export const userLogin = createAsyncThunk(
	'auth/signin',
	async ({ email, password }: ISignInForm, { rejectWithValue }) => {
		try {
			// configure header's Content-Type as JSON
			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			};
			const { data } = await axios.post(
				'/auth/signin',
				{
					// Data to be sent to the server
					email: email,
					password: password,
				},
				config
			);
			// store user's token in local storage
			localStorage.setItem('userToken', data.userToken);
			return data;
		} catch (error) {
			// return custom error message from API if any
      /*
			if (error.response && error.response.data.message) {
				return rejectWithValue(error.response.data.message);
			} else {
				return rejectWithValue(error.message);
			}
      */
		}
	}
);
