/** @format */

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { NotFound } from '../pages/404';
import { SignIn } from '../pages/signin';
import { Header } from '../components/header';
import { Home } from '../pages/home';
import { SignUp } from '../pages/signup';
import VerifyEmail from '../components/verifyEmail';
import { ContactUs } from '../pages/contactUs';
import { OurWork } from '../pages/our-work';
import { ResetPassword } from '../pages/user/reset-password';

export const LoggedOutRouter = () => {
	return (
		<div className='bg-gradient-to-t from-slate-100 via-lime-100 to-slate-100'>
			<Router>
				<Header />
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
						path='/reset-password'
						element={<ResetPassword />}
					/>
					<Route
						path='/verify-email'
						element={<VerifyEmail />}
					/>
					<Route
						path='our-work/:id'
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
