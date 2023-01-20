/** @format */

import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from 'react-router-dom';
import { NotFound } from '../pages/404';
import { SignIn } from '../pages/singIn';
import { Header } from '../components/header';
import { Home } from '../pages/home';
import { SignUp } from '../pages/signUp';

export const LoggedOutRouter = () => {
	return (
		<Router>
			<Header />
			<Routes>
				<Route
					path='/'
					element={<Home />}
				/>
				<Route
					path='/singup'
					element={<SignUp />}
				/>
				<Route
					path='/'
					element={<SignIn />}
				/>
				<Route
					path='*'
					element={<NotFound />}
				/>
			</Routes>
		</Router>
	);
};
