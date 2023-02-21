import { createSlice } from '@reduxjs/toolkit';


const token = localStorage.getItem('token');
const user = Boolean(token);

const initialStateValue = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };


console.log(user);

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
