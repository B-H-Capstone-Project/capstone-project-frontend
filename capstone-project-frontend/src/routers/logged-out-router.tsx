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
>>>>>>> f6cfa20cb12b5826333d984e33361d7a0848d09b

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
						path='/signup'
						element={<SignUp />}
					/>
					<Route
						path='/signin'
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
						path='/contact-us'
						element={<ContactUs />}
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
