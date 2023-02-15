/** @format */

import React from 'react';
import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { UseRefreshToken } from '../hooks/useRefreshToken';

export const Users = () => {
	const [users, setUsers] = useState([]);
	const refresh = UseRefreshToken();
	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();

		const getUsers = async () => {
			try {
				const response = await axios.get('/users', {
					signal: controller.signal,
				});
				console.log(response.data);
				isMounted && setUsers(response.data);
			} catch (err) {}
		};
		getUsers();

		return () => {
			isMounted = false;
			//abort the signal
			controller.abort();
		};
	}, []);

	return (
		<div>
			<button onClick={() => refresh()}>Refresh</button>
		</div>
	);
};
