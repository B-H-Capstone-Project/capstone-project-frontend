/** @format */

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Reservation } from '../pages/reservation';
import { Home } from '../pages/home';
import { NotFound } from '../pages/404';
import { useMe } from '../hooks/useMe';
import { Header } from '../components/header';
import Dashboard from '../admin/scenes/dashboard';
import AdminApp from '../admin/AdminApp';
import Contacts from '../admin/scenes/contacts';
import Invoices from '../admin/scenes/invoices';
import Bar from '../admin/scenes/bar';
import Form from '../admin/scenes/form';
import Pie from '../admin/scenes/pie';
import Line from '../admin/scenes/line';
import FAQ from '../admin/scenes/faq';
import Geography from '../admin/scenes/geography';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from '../admin/theme';
import { ContactUs } from '../pages/contactUs';
import { OurWork } from '../pages/our-work';

//customer routes
const clientRoutes = [
	{
		path: '/',
		component: <Home />,
	},
	{
		path: '/reservation',
		component: <Reservation />,
	},
	{
		path: '/contact-us',
		component: <ContactUs />,
	},
	{
		path: '/our-work',
		component: <OurWork />,
	},
];

//admin routes
const adminRoutes = [
	{ path: '/admin/dashboard', component: <Dashboard /> },
	{ path: '/admin', component: <AdminApp /> },
	//{ path: '/admin/team', component: <Team /> },
	{ path: '/admin/contacts', component: <Contacts /> },
	{ path: '/admin/invoices', component: <Invoices /> },
	{ path: '/admin/form', component: <Form /> },
	{ path: '/admin/bar', component: <Bar /> },
	{ path: '/admin/pie', component: <Pie /> },
	{ path: '/admin/line', component: <Line /> },
	{ path: '/admin/faq', component: <FAQ /> },
	//{ path: '/admin/calendar', component: <Calendar /> },
	{ path: '/admin/geography', component: <Geography /> },
];

export const LoggedInRouter = () => {
	const { loading, data } = useMe();
	const [theme, colorMode]: any = useMode();

	return (
		<div>
			<ColorModeContext.Provider value={colorMode}>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<Router>
						<Header />
						<Routes>
							{clientRoutes.map((route) => (
								<Route
									path={`${route.path}`}
									element={route.component}
								/>
							))}
							{adminRoutes.map((route) => (
								<Route
									path={`${route.path}`}
									element={route.component}
								/>
							))}
							<Route
								path='*'
								element={<NotFound />}
							/>
						</Routes>
					</Router>
				</ThemeProvider>
			</ColorModeContext.Provider>
		</div>
	);
};
