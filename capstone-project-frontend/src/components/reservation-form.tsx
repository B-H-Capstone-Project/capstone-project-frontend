<<<<<<< HEAD
=======
/** @format */

import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// date time picker
import { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useMutation, useQueryClient } from 'react-query';
import axios from '../api/axios';
import { RootState } from '../redux/store';
import { Helmet } from 'react-helmet-async';

interface IReservationForm {
	first_name: string;
	last_name: string;
	phone_number: string;
	email: string;
	address_line: string;
	unit_number: string;
	postal_code: string;
	city: string;
	province: string;
	country: string;
	description: string;
}

const reservation = async (data: IReservationForm) => {
	const { data: response } = await axios.post('reservation', data);
	return response.data;
};

function ReservationForm() {
	const queryClient = useQueryClient();
	const isAuth = useSelector((state: RootState) => state.auth);
	const [value, setValue] = React.useState<Dayjs | null>(null);
	const {
		register,
		formState: { errors, isValid },
		handleSubmit,
	} = useForm<IReservationForm>({
		mode: 'onChange',
	});

	const navigate = useNavigate();

	const { isLoading, mutate } = useMutation(reservation, {
		onSuccess: (data) => {
			console.log(data);
			const message = 'success';
			alert(message);
		},
		onError: () => {
			alert('there was an error');
		},
		onSettled: () => {
			queryClient.invalidateQueries('create');
		},
	});

	const onSubmit = async (data: IReservationForm) => {
		const newReservation = {
			...data,
		};
		mutate(newReservation);
		//navigate('/');
	};
	return (
		<>
			<Helmet>
				<title>Reservation | BOSS&HOSS</title>
			</Helmet>
			<div
				className='relative p-10'
				style={{ height: '150vh' }}>
				<div className='absolute left-1/2 transform -translate-x-1/2 -translate-y-1 bg-white rounded-xl shadow dark:border py-8 px-10 mt-20 sm:py-2 sm:px-5 sm:w-full sm:rounded-none sm:border-none sm:mt-15'>
					<div className='mb-10'>
						<h1 className='text-2xl font-bold leading-tight tracking-tight text-black-100 text-lime-500 sm:mb-1'>
							Request Reservation
						</h1>
					</div>
					<form onSubmit={handleSubmit(onSubmit)}>
						{/* FirstName & LastName */}
						<div className='w-1/2 flex flex-row gap-4'>
							<div className='flex flex-col mb-3'>
								<label className='block mb-2 text-sm font-medium text-black-100 dark:text-black'>
									First Name *
								</label>
								<input
									type='text'
									id='first_name'
									{...register('first_name')}
									className='bg-white-50 border border-white-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'
									placeholder='John'
								/>
							</div>
							<div className='flex flex-col mb-3'>
								<label className='block mb-2 text-sm font-medium text-black-100 dark:text-black'>
									Last Name *
								</label>
								<input
									type='text'
									id='last_name'
									{...register('last_name')}
									className='bg-white-50 border border-white-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'
									placeholder='Doe'
								/>
							</div>
						</div>
						<div className='flex flex-col mb-3'>
							<label className='block mb-2 text-sm font-medium text-black-100 dark:text-black'>
								Phone Number *
							</label>
							<input
								type='text'
								id='phone_number'
								{...register('phone_number')}
								className='bg-white-50 border border-white-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 block w-full bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'
							/>
						</div>
						{/* Email */}
						<div className='flex flex-col mb-3'>
							<label className='block mb-2 text-sm font-medium text-black-100 dark:text-black'>
								Email *
							</label>
							<input
								type='email'
								id='email'
								{...register('email')}
								className='bg-white-50 border border-white-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 block w-full bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'
								placeholder='name@company.com'
							/>
						</div>

						{/* Address */}
						<div className='p-5 flex items-start'>
							<div className='flex items-center h-5'>
								<input
									id='currentAddress'
									aria-describedby='currentAddress'
									type='checkbox'
									className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800;'
								/>
							</div>
							<div className=' ml-3 text-sm'>
								<label className='font-light text-gray-500 dark:text-gray-300'>
									Use Current Address
								</label>
							</div>
						</div>
						<div className='flex flex-col mb-3'>
							<label className='block mb-2 text-sm font-medium text-black-100 dark:text-black'>
								Address *
							</label>
							<input
								type='text'
								id='address_line'
								{...register('address_line')}
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
								id='unit_number'
								{...register('unit_number')}
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
									{...register('postal_code')}
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
									{...register('city')}
									className='w-full bg-white-50 border border-white-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'
								/>
							</div>
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
									{...register('country')}
									className='w-full bg-white-50 border border-white-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'
								/>
							</div>
						</div>
						{/* Type */}
						<label className='block text-sm font-medium text-black-100 dark:text-black'>
							Type *
						</label>
						<div className='p-5 flex items-start flex-col'>
							<div className='flex items-center h-5 m-2'>
								<input
									id='type'
									aria-describedby='terms'
									type='radio'
									className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800;'
								/>
								<label className='block m-2 text-sm font-medium text-black-100 dark:text-black'>
									Residential
								</label>
								<input
									id='type'
									aria-describedby='terms'
									type='radio'
									className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800;'
								/>
								<label className='block m-2 text-sm font-medium text-black-100 dark:text-black'>
									Commercial
								</label>
								<input
									id='type'
									aria-describedby='terms'
									type='radio'
									className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800;'
								/>
								<label className='block m-2 text-sm font-medium text-black-100 dark:text-black'>
									Service
								</label>
								<input
									id='type'
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
								<label className='block mb-2 text-sm font-medium text-black-100 dark:text-black'>
									Date & Time
								</label>
								<DateTimePicker
									renderInput={(props) => <TextField {...props} />}
									value={value}
									onChange={(newValue) => {
										setValue(newValue);
									}}
								/>
							</LocalizationProvider>
						</div>
						<div className='flex flex-col mb-5'>
							<label className='block mb-2 text-sm font-medium text-black-100 dark:text-black'>
								Description
							</label>
							<input
								type='text'
								id='description'
								{...register('description')}
								className='bg-white-50 border border-white-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'
							/>
						</div>
						{/* Submit Button */}
						<div className='flex flex-col'>
							<button
								type='submit'
								className='  bg-lime-500 active:bg-lime-500 hover:bg-lime-500 focus:bg-lime-500 text-white font-bold py-2 px-4 rounded'>
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
>>>>>>> 0e94a7509d37b27584e02a3cdb878473dd21c365
