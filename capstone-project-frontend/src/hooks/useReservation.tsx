/** @format */

// useApi.tsx
import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { IReservation } from '../types/reservation.dto';


export const useReservation = () => {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<IReservation[]>();
	const userId = useSelector((state: RootState) => state.auth.userToken?.id);
	const fetchApi = async () => {
		try {
			if (userId !== undefined) {
				await axios
					.get(`/reservation/user/${userId}`)
					.then(function (response) {
						setData(response.data.reservation);
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