/** @format */

import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from 'react-router-dom';
import { NotFound } from '../pages/404';
import { SignIn } from '../pages/signin';
import { Header } from '../components/header';
import { Home } from '../pages/home';
import { SignUp } from '../pages/signup';
import { OurWork } from '../pages/our-work';
import VerifyEmail from '../components/verifyEmail';
import { ContactUs } from '../pages/contactUs';

// Admin Dashboard
import AdminApp from "../admin/AdminApp";
import Dashboard from "../admin/scenes/dashboard";
import Team from "../admin/scenes/team";
import Contacts from "../admin/scenes/contacts";
import Invoices from "../admin/scenes/invoices";
import Form from "../admin/scenes/form";
import Bar from "../admin/scenes/bar";
import Pie from "../admin/scenes/pie";
import Line from "../admin/scenes/line";
import FAQ from "../admin/scenes/faq";
import Calendar from "../admin/scenes/calendar/calendar";
import Geography from "../admin/scenes/geography";
import '../admin/index.css';
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
