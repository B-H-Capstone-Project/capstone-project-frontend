/** @format */

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Header } from '../components/header';
import { Reservation } from '../pages/reservation';
import { Home } from '../pages/home';

const ClientRoutes = [
	<>
		<Route
			key={1}
			path='/'
			element={<Home />}
		/>
		<Route
			key={4}
			path='/reservation'
			element={<Reservation />}
		/>
	</>,
];

export const LoggedInRouter = () => {
	return (
		<div className=''>
			<Router>
				<Header />
				<Routes>
					<Route
						path='/'
						element={<Home />}
					/>
				</Routes>
			</Router>
		</div>
	);
};
