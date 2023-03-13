import { createSlice } from '@reduxjs/toolkit';
import signIn from '../../services/auth.service';

const token = localStorage.getItem('token');
const user = Boolean(token);

const initialStateValue = user
  ? { isLoggedIn: true, user, loading: false, token, error: null}
  : { isLoggedIn: false, user: null, loading: false, token, error: null };


export const authSlice = createSlice({
	name: 'authentication',
	initialState: initialStateValue ,
	reducers: {
		login: (state) => {
			state.isLoggedIn = true;
		},
		logout: (state) => {
			state.isLoggedIn = false;
		},
	},
});


export const authActions = authSlice.actions;
