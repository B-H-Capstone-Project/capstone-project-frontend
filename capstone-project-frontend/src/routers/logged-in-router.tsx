/** @format */

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useMe } from '../hooks/useMe';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

// client
import { Home } from '../pages/home';
import { Header } from '../components/header';
import { NotFound } from '../pages/404';
import { ContactUs } from '../pages/contactUs';
import { OurWork } from '../pages/our-work';
import { Reservation } from '../pages/reservation';

import Dashboard from '../admin/scenes/dashboard';
import ManageCustomers from '../admin/scenes/customer/manage-customers';
import ManageEmployees from '../admin/scenes/employee/manage-employees';
import Reservations from '../admin/scenes/reservations';
import Invoices from '../admin/scenes/invoices';
import Contacts from '../admin/scenes/contacts';
import Bar from '../admin/scenes/bar';
import Form from '../admin/scenes/form';
import Pie from '../admin/scenes/pie';
import Line from '../admin/scenes/line';
import FAQ from '../admin/scenes/faq';
import Geography from '../admin/scenes/geography';
import { ColorModeContext, useMode } from '../admin/theme';
import { EditProfile } from '../pages/user/edit-profile';
import { SignIn } from '../pages/signin';
import ReservationForm from '../pages/reservation-form';

//customer routes
const clientRoutes = [
	{
		path: '/',
		component: <Home />,
	},
	{
		path: '/signIn',
		component: <SignIn />,
	},
	{
		path: '/reservation',
		component: <Reservation />,
	},
	{
		path: '/reservation-form',
		component: <ReservationForm />,
	},
	{
		path: '/contact-us',
		component: <ContactUs />,
	},
	{
		path: '/our-work',
		component: <OurWork />,
	},
	{
		path: '/edit-profile',
		component: <EditProfile />,
	},
];

//admin routes
const adminRoutes = [
	//   { path: "/admin", component: <AdminApp /> },
	{ path: '/admin', component: <Dashboard /> },
	{ path: '/admin/customers', component: <ManageCustomers /> },
	{ path: '/admin/employees', component: <ManageEmployees /> },
	{ path: '/admin/reservations', component: <Reservations /> },
	{ path: '/admin/contacts', component: <Contacts /> },
	{ path: '/admin/invoices', component: <Invoices /> },
	{ path: '/admin/form', component: <Form /> },
	{ path: '/admin/bar', component: <Bar /> },
	{ path: '/admin/pie', component: <Pie /> },
	{ path: '/admin/line', component: <Line /> },
	{ path: '/admin/faq', component: <FAQ /> },
	{ path: '/admin/geography', component: <Geography /> },
];

export const LoggedInRouter = () => {
	const [theme, colorMode]: any = useMode();
	const isAuth = useSelector((state: RootState) => state.auth);
	const token = isAuth.userToken;

	return (
		<div className='bg-gradient-to-t from-slate-100 via-lime-100 to-slate-100'>
			<ColorModeContext.Provider value={colorMode}>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<Router>
						<Header />
						<Routes>
							{clientRoutes.map((route) => (
								<Route
									key={route.path}
									path={`${route.path}`}
									element={route.component}
								/>
							))}
							<Route
								path='*'
								element={<NotFound />}
							/>
							{token?.role === 1 ||
								token?.role === 2 &&
									adminRoutes.map((route) => (
										<Route
											key={route.path}
											path={`${route.path}`}
											element={route.component}
										/>
									))}
						</Routes>
					</Router>
				</ThemeProvider>
			</ColorModeContext.Provider>
		</div>
	);
};
