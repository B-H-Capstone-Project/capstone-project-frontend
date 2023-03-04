/** @format */

// useApi.tsx
import { useEffect, useState } from 'react';
import axios from '../api/axios';
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
