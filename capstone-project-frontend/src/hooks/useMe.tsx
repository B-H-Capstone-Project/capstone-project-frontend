/** @format */

// useApi.tsx
import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { meQuery } from '../pages/user/user.dto';


export const useMe = () => {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<meQuery>();
	const isAuth = useSelector((state: RootState) => state.auth);
	const userId = isAuth.userToken?.id;
	const fetchApi = async () => {
		try {
			if (userId !== undefined) {
				await axios
					.get(`/user/${userId}`)
					.then(function (response) {
						setData(response.data);
            setLoading(false);
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
