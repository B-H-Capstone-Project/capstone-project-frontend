/** @format */

// useApi.tsx
import { useEffect, useState } from 'react';
import axios from '../api/axios';
import jwt, { JwtPayload } from 'jwt-decode'; // import dependency
import { LOCAL_STORAGE_TOKEN } from '../constant';
import jwtDecode from 'jwt-decode';

interface IJwtDecode {
	id: number;
	iat: number;
	exp: number;
}

export const useMe = () => {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState(null);
	const token = localStorage.getItem('token');
	let userId: any = 1;
	// decode id from token
	if (token) {
		const { id } = jwtDecode<IJwtDecode>(token);
		userId = id;
	}

	const fetchApi = async () => {
		try {
			if (userId !== undefined) {
				await axios
					.get(`/user/${userId}`)
					.then(function (response) {
						setData(response.data);
					})
					.catch(function (error) {
						console.log(error);
					})
					.then(function () {
						// 항상 실행되는 영역
					});
			}
		} catch (err) {
			console.log('err');
		}
	};

	useEffect(() => {
		fetchApi();
	}, []);

	return { loading, data };
};
