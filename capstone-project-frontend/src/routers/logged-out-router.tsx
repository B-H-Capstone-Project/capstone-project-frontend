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
<<<<<<< HEAD
import { SignIn } from '../pages/signin';
import { Header } from '../components/header';
import { Home } from '../pages/home';
import { SignUp } from '../pages/signup';
=======
import { Header } from '../components/header';
=======
>>>>>>> 2a4812a (Added CheckEmail and verifyEmail page)
import { Home } from '../pages/home';
import { SignIn } from '../pages/signin';
import { SignUp } from '../pages/signup';
import { OurWork } from '../pages/our-work';
<<<<<<< HEAD
>>>>>>> daae149 (Created OutWork page)
=======
import VerifyEmail from '../components/verifyEmail';
import CheckYourEmail from '../components/checkYourEmail';
>>>>>>> 2a4812a (Added CheckEmail and verifyEmail page)

export const LoggedOutRouter = () => {
  
	return (
		<div className='bg-gradient-to-t from-slate-100 via-lime-100 to-slate-100'>
			<Router>
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
						path='/check-your-email'
						element={<CheckYourEmail />}
					/>
					<Route
						path='/verify-email'
						element={<VerifyEmail />}
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
		</div>
	);
};
