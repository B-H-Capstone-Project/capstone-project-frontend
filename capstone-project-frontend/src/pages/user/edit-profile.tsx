/** @format */

import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import axios from '../../api/axios';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useMe } from '../../hooks/useMe';
import { FormError } from '../../components/form-error';
import { Helmet } from 'react-helmet-async';

interface IForm {
	first_name: string;
	last_name: string;
	phone_number: string;
	email: string;
	password: string;
	confirm_password: string;
	address_line1: string;
	address_line2: string;
	postal_code: string;
	city: string;
	province: string;
	country: string;
}

export const EditProfile = () => {
	const queryClient = useQueryClient();
	const isAuth = useSelector((state: RootState) => state.auth);
	const { data } = useMe();
	const userId = isAuth.userToken?.id;
	const {
		register,
		getValues,
		formState: { errors, isValid },
		handleSubmit,
	} = useForm<IForm>({
		mode: 'onChange',
		resetOptions: {
			keepDirtyValues: true,
		},
		defaultValues: async () => await axios.get(`/user/${userId}`),
	});
	console.log(data);
	const { isLoading, mutate } = useMutation(
		async (updateProfile: IForm) => {
			console.log(updateProfile);
			return (await axios.put(`/user/${userId}`, updateProfile)).data;
		},
		{
			onSuccess: (data) => {
				const message = 'success';
			},
			onError: () => {
				alert('there was an error');
			},
			onSettled: () => {
				queryClient.invalidateQueries('create');
			},
		}
	);

	const onSubmit = (data: any) => {
		//replace prev UserInfo to New user Info
		const prevUserInfo = data.data.user;
		const updatedUserinfo = prevUserInfo;
		Object.entries(prevUserInfo).filter(([prevDatakey, prevValue]) => {
			for (const [dataKey, dataValue] of Object.entries(data)) {
				if (prevDatakey === dataKey) {
					//change to new value from old
					updatedUserinfo[prevDatakey] = dataValue;
				}
			}
		});
		const updateProfile = {
			...updatedUserinfo,
		};
		mutate(updateProfile);
	};

	return (
		<>
			<Helmet>
				<title>Edit Profile | BOSS&HOSS</title>
			</Helmet>
			<div
				className='relative w-full'
				style={{ height: '120vh' }}>
				<div className='absolute left-1/2 transform -translate-x-1/2 -translate-y-1 bg-white rounded-lg shadow dark:border py-8 px-10 mt-20 sm:py-2 sm:px-5 sm:w-full sm:rounded-none sm:border-none sm:mt-10'>
					<form onSubmit={handleSubmit(onSubmit)}>
						{/* FirstName & LastName */}
						<div className='w-1/2 flex flex-row gap-4'>
							<div className='flex flex-col'>
								<label className='block mb-2 text-sm font-medium text-black-100 dark:text-black'>
									First Name *
								</label>
								<input
									type='text'
									id='first_name'
									{...register('first_name')}
									className='bg-white-50 border border-white-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'
									placeholder={data?.user.first_name}
								/>
							</div>
							<div className='flex flex-col'>
								<label className='block mb-2 text-sm font-medium text-black-100 dark:text-black'>
									Last Name *
								</label>
								<input
									type='text'
									id='last_name'
									{...register('last_name')}
									className='bg-white-50 border border-white-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'
									placeholder={data?.user.last_name}
								/>
							</div>
						</div>
						<div className='mb-3'>
							<label className='block mb-2 text-sm font-medium text-black-100 dark:text-black'>
								Phone Number *
							</label>
							<input
								type='text'
								id='phone_number'
								{...register('phone_number')}
								placeholder={data?.user.phone_number}
								className='bg-white-50 border border-white-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 block w-full bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'
							/>
						</div>
						{/* Email */}
						<div>
							<label className='block mb-2 text-sm font-medium text-black-100 dark:text-black'>
								Email *
							</label>
							<input
								type='email'
								id='email'
								{...register('email', {
									disabled: true,
								})}
								className='mb-2 bg-white-50 border border-white-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 block w-full bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'
								value={data?.user.email}
							/>
						</div>
						<div className='mb-3'>
							<label className='block mb-2 text-sm font-medium text-black-100 dark:text-black'>
								Confirm password *
							</label>
							<input
								type='password'
								id='confirm-password'
								{...register('confirm_password', {
									required: true,
									validate: (value) => value === getValues('password'),
								})}
								placeholder='••••••••'
								className='bg-white-50 border border-white-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 block w-full bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'
							/>
							{errors.confirm_password &&
								errors.confirm_password.type === 'validate' && (
									<FormError errorMessage='Passwords do not match.' />
								)}
						</div>

						{/* Address */}
						<div className='mb-3'>
							<label className='block mb-2 text-sm font-medium text-black-100 dark:text-black'>
								Address Line1*
							</label>
							<input
								type='text'
								id='address_line'
								{...register('address_line1')}
								placeholder={data?.user.address_line1}
								className='bg-white-50 border border-white-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 block w-full bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'
							/>
						</div>
						{/* Unit Number & Postal Code  */}
						<div className='mb-3'>
							<label className='block mb-2 text-sm font-medium text-black-100 dark:text-black'>
								Address Line2
							</label>
							<input
								type='text'
								id='unit_number'
								{...register('address_line2')}
								placeholder={data?.user.address_line2}
								className='bg-white-50 border border-white-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 block w-full bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'
							/>
						</div>
						{/* Postal Code & City */}
						<div className='w-1/2 flex flex-row gap-4 mb-3'>
							<div className='flex flex-col'>
								<label className='block mb-2 text-sm font-medium text-black-100 dark:text-black'>
									Postal Code *
								</label>
								<input
									type='text'
									id='postal_code'
									{...register('postal_code')}
									placeholder={data?.user.postal_code}
									className='bg-white-50 border border-white-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'
								/>
							</div>

							<div className='flex flex-col'>
								<label className='block mb-2 text-sm font-medium text-black-100 dark:text-black'>
									City *
								</label>
								<input
									type='text'
									id='city'
									{...register('city')}
									placeholder={data?.user.city}
									className='bg-white-50 border border-white-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'
								/>
							</div>
						</div>

						{/* Province & Country */}
						<div className='w-1/2 flex flex-row gap-4'>
							<div className='flex flex-col'>
								<label className='block mb-2 text-sm font-medium text-black-100 dark:text-black'>
									Province *
								</label>
								<input
									type='text'
									{...register('province')}
									id='province'
									placeholder={data?.user.province}
									className='bg-white-50 border border-white-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'
								/>
							</div>

							<div className='flex flex-col'>
								<label className='block mb-2 text-sm font-medium text-black-100 dark:text-black'>
									Country *
								</label>
								<input
									type='text'
									id='country'
									{...register('country')}
									placeholder={data?.user.country}
									className='bg-white-50 border border-white-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'
								/>
							</div>
						</div>
						<div className='p-5 flex items-start justify-center'>
							<button
								type='submit'
								className='btn '>
								Update account
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};
