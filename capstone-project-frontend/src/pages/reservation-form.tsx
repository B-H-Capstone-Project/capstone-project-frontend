/** @format */

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
// date time picker
import dayjs, { Dayjs } from 'dayjs';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { useMutation, useQueryClient } from 'react-query';
import axios from '../api/axios';
import { RootState } from '../redux/store';
import { Helmet } from 'react-helmet-async';
import { IReservation, IReservationInput } from '../types/reservation.dto';
import { useMe } from '../hooks/useMe';
import { useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';
import { FormError } from '../components/form-error';

interface IReservatioForm extends IReservation {
	residential: string;
	commercial: string;
	service: string;
	outdoorLighting: string;
}

function ReservationForm() {
	const navigate = useNavigate();
	let moment = require('moment'); // require
	//current day
	const currentDay = dayjs().format();
	//days
	const [day, setDay] = useState<Dayjs | null>(dayjs(currentDay));
	const queryClient = useQueryClient();
	const isAuth = useSelector((state: RootState) => state.auth);
	const userId = isAuth.userToken?.id;
	//User Info
	const { data } = useMe();
	const {
		register,
		formState: { errors, isValid },
		handleSubmit,
		setValue,
	} = useForm<IReservatioForm>({
		mode: 'onChange',
	});

	const { isLoading, mutate } = useMutation(
		async (newReservation: IReservationInput) => {
			return (await axios.post(`/reservation/${userId}`, newReservation)).data;
		},
		{
			onSuccess: (data) => {
				const message = 'success';
				navigate('/reservation');
			},
			onError: () => {
				alert('there was an error');
			},
			onSettled: () => {
				queryClient.invalidateQueries('create');
			},
		}
	);

	const onSubmit = async (data: IReservation) => {
		console.log(data);
		let serviceType = '';
		Object.entries(data).filter(([key, value]) => {
			if (value === 'on') {
				serviceType = key;
			}
		});

		const newReservationData: IReservationInput = {
			type: serviceType,
			description: data.description,
			address_line1: data.address_line1,
			address_line2: data.address_line2,
			postal_code: data.postal_code.toUpperCase(),
			province: data.province,
			country: data.country,
			city: data.city,
			date: moment(day?.toISOString()).format('YYYY-MM-DD hh:mm:ss'),
		};
		const newReservation = {
			...newReservationData,
		};
		mutate(newReservation);
	};

	const handleSetValue = () => {
		let checkBox = document.getElementById(
			'currentAddress'
		) as HTMLInputElement;
		if (checkBox.checked) {
			setValue('address_line1', data ? data?.user.address_line1 : '');
			setValue('address_line2', data ? data?.user.address_line2 : '');
			setValue('postal_code', data ? data?.user.postal_code : '');
			setValue('city', data ? data?.user.city : '');
			setValue('province', data ? data?.user.province : '');
			setValue('country', data ? data?.user.country : '');
		} else {
			setValue('address_line1', '');
			setValue('address_line2', '');
			setValue('postal_code', '');
			setValue('city', '');
			setValue('province', '');
			setValue('country', '');
		}
	};

  console.log(errors);

	return (
		<>
			<Helmet>
				<title>Reservation | BOSS&HOSS</title>
			</Helmet>
			<div
				className='relative p-10'
				style={{ height: '120vh' }}>
				<div className='absolute left-1/2 transform -translate-x-1/2 -translate-y-1 bg-white rounded-xl shadow dark:border py-8 px-10 m-10 sm:py-2 sm:px-5 sm:w-full sm:rounded-none sm:border-none sm:mt-0'>
					<h1 className='text-2xl font-bold leading-tight tracking-tight text-black-100 text-lime-500 sm:mb-1'>
						Request Reservation
					</h1>
					<form onSubmit={handleSubmit(onSubmit)}>
						{/* Address */}
						<div className='p-5 flex items-start'></div>
						<div className='flex flex-col mb-3'>
							<label className='block mb-2 text-sm font-medium text-black-100 dark:text-black'>
								Address *
							</label>
							<input
								type='text'
								id='address_line1'
								{...register('address_line1', { required: true })}
								className='bg-white-50 border border-white-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 block w-full bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'
							/>
						</div>
						{/* Unit Number & Postal Code  */}
						<div className='flex flex-col mb-3'>
							<label className='block mb-2 text-sm font-medium text-black-100 dark:text-black'>
								Unit Number
							</label>
							<input
								type='text'
								id='address_line2'
								{...register('address_line2')}
								className='bg-white-50 border border-white-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 block w-full bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'
							/>
						</div>
						{/* Postal Code & City */}
						<div className='flex gap-4 mb-3'>
							<div className='w-full'>
								<label className='block mb-2 text-sm font-medium text-black-100 dark:text-black'>
									Postal Code *
								</label>
								<input
									type='text'
									id='postal_code'
									{...register('postal_code', { required: true })}
									className='w-full bg-white-50 border border-white-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'
								/>
							</div>
							<div className='w-full'>
								<label className='block mb-2 text-sm font-medium text-black-100 dark:text-black'>
									City *
								</label>
								<input
									type='text'
									id='city'
									{...register('city', { required: true })}
									className='w-full bg-white-50 border border-white-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'
								/>
							</div>
						</div>
						<div className='h-5 mb-3'>
							<input
								id='currentAddress'
								aria-describedby='currentAddress'
								type='checkbox'
								onClick={handleSetValue}
								className='mr-2 w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800'
							/>

							<label className='font-light text-gray-500 dark:text-gray-300'>
								Use Current Address
							</label>
						</div>
						{/* Province & Country */}
						<div className='flex gap-4 mb-3'>
							<div className='w-full'>
								<label className='block mb-2 text-sm font-medium text-black-100 dark:text-black'>
									Province *
								</label>
								{/* <select value={value} onChange={handleChange}> */}
								<select
									id='province'
									{...register('province', { required: true })}
									className='w-full bg-white-50 border border-white-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'>
									<option value='AB'>AB</option>
									<option value='BC'>BC</option>
									<option value='NB'>NB</option>
									<option value='NL'>NL</option>
									<option value='NS'>NS</option>
									<option value='NT'>NT</option>
									<option value='NU'>NU</option>
									<option value='MB'>MB</option>
									<option value='ON'>ON</option>
									<option value='PE'>PE</option>
									<option value='QC'>QC</option>
									<option value='SK'>SK</option>
									<option value='YT'>YT</option>
								</select>
							</div>
							<div className='w-full'>
								<label className='block mb-2 text-sm font-medium text-black-100 dark:text-black'>
									Country *
								</label>
								<input
									type='text'
									id='country'
									{...register('country', { required: true })}
									className='w-full bg-white-50 border border-white-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'
								/>
							</div>
						</div>
						{/* Type */}
						<label className='block text-sm font-medium text-black-100 dark:text-black'>
							Type *
						</label>
						<div className='flex items-start flex-col mb-5'>
							<div className='flex items-center h-5 m-2'>
								<input
									id='residential'
									{...register('residential')}
									aria-describedby='terms'
									type='radio'
									className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800;'
								/>
								<label className='block m-2 text-sm font-medium text-black-100 dark:text-black'>
									Residential
								</label>
								<input
									id='commercial'
									{...register('commercial')}
									aria-describedby='terms'
									type='radio'
									className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800;'
								/>
								<label className='block m-2 text-sm font-medium text-black-100 dark:text-black'>
									Commercial
								</label>
								<input
									id='service'
									{...register('service')}
									aria-describedby='terms'
									type='radio'
									className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800;'
								/>
								<label className='block m-2 text-sm font-medium text-black-100 dark:text-black'>
									Service
								</label>
								<input
									id='outdoorLighting'
									{...register('outdoorLighting')}
									aria-describedby='terms'
									type='radio'
									className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800;'
								/>
								<label className='block m-2 text-sm font-medium text-black-100 dark:text-black'>
									Outdoor Lighting
								</label>
							</div>
						</div>
						<div className='flex flex-col mb-3'>
							{/* Date / Time */}
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<DateTimePicker
									label='Controlled picker'
									defaultValue={day}
									onChange={(chosenDay) => setDay(chosenDay)}
								/>
							</LocalizationProvider>
						</div>
						<div className='flex flex-col mb-5'>
							<label className='block mb-2 text-sm font-medium text-black-100 dark:text-black'>
								Description
							</label>
							<TextField
								type='text'
								id='description'
								{...register('description', { maxLength: 50 })}
								className='bg-white-50 border border-white-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-10 bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'
							/>
							{errors.description?.type === 'maxLength' && (
								<FormError errorMessage={"It is over the limit of words"} />
							)}
						</div>
						{/* Submit Button */}
						<div className='flex flex-col justify-center items-center'>
							<button
								type='submit'
								className='btn w-1/2'>
								Submit
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}

export default ReservationForm;
