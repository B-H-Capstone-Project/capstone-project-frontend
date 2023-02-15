/** @format */

import React, { useCallback, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Header } from '../components/header';
import { Reservation } from '../pages/reservation';
import { Home } from '../pages/home';
import axios from '../api/axios';
import jwt, { JwtPayload } from 'jwt-decode'; // import dependency
import { LOCAL_STORAGE_TOKEN } from '../constant';
import jwtDecode from 'jwt-decode';

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
	const token = localStorage.getItem('token');
  const [data, setData] = useState(null)
  const [query, setQuery] = useState("react hooks")
  let userId: any = undefined;
	if (token) {
    const decoded = jwtDecode<JwtPayload>(token);
		userId = decoded.id;
	}

	const getData = useCallback(async () => {
    try {
      if (userId !== undefined) {
        await axios
          .get(`/user/${userId}`)
          .then(function (response) {
            setData(response.data)
          })
          .catch(function (error) {
            console.log(error);
          })
          .then(function () {
            // 항상 실행되는 영역
          });
      }
    } catch (err) {
      console.log(err);
    }
	}, [query]);

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
				</Routes>
			</Router>
		</div>
	);
};
