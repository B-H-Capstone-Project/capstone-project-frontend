/** @format */

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Reservation } from '../pages/reservation';
import { Home } from '../pages/home';
import { NotFound } from '../pages/404';
import { useMe } from '../hooks/useMe';

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
  const { loading, data } = useMe();

  console.log(data);
	return (
		<div className=''>
			<Router>
				<Routes>
					<Route
						path='/'
						element={<Home />}
					/>
					<Route
						path='/reservation'
						element={<Reservation />}
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
