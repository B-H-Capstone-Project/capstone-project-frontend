/** @format */

import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from 'react-router-dom';
import { NotFound } from '../pages/404';
<<<<<<< HEAD
import { SignIn } from '../pages/signin';
import { Header } from '../components/header';
import { Home } from '../pages/home';
import { SignUp } from '../pages/signup';
=======
import { Header } from '../components/header';
import { Home } from '../pages/home';
import { SignIn } from '../pages/signin';
import { SignUp } from '../pages/signup';
import { OurWork } from '../pages/our-work';
>>>>>>> daae149 (Created OutWork page)

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
					path='/singin'
					element={<SignIn />}
				/>
        <Route
					path='/our-work'
					element={<OurWork />}
				/>
				<Route
					path='*'
					element={<NotFound />}
				/>
			</Routes>
		</Router>
	);
};
