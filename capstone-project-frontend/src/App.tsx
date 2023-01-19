/** @format */

import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Home } from './pages/home';
import { Header } from './components/header';
import { SignUp } from './pages/signup';
import { SignIn } from './pages/signin';

import { Reservation } from './pages/reservation';

function App() {
	return (
		<>
			<Router>
				<Header />
				<Routes>
					<>
						<Route
							key={1}
							path='/'
							element={<Home />}
						/>
						<Route
							key={2}

							path='/SignIn'
							element={<SignIn />}
						/>
						<Route
							key={3}
							path='/SignUp'
							element={<SignUp />}
						/>
						<Route
							key={4}
							path='/reservation'
							element={<Reservation />}
						/>
					</>
				</Routes>
			</Router>
		</>
	);
}

export default App;
