/** @format */

import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useMe } from '../../hooks/useMe';

interface IForm {
	first_name: string;
	last_name: string;
	phone_number: number;
	email: string;
	password: string;
	confirm_password: string;
	address_line: string;
	unit_number: string;
	postal_code: string;
	city: string;
	province: string;
	country: string;
}

export const EditProfile = () => {
	const queryClient = useQueryClient();
	const isAuth = useSelector((state: RootState) => state.auth);
  const { data } = useMe();
	const navigate = useNavigate();
  const userId = isAuth.userToken?.id
	const {
		register,
		getValues,
		formState: { errors, isValid },
		handleSubmit,
	} = useForm<IForm>({
		mode: 'onChange',
    defaultValues: {
      first_name: data?.user.first_name,
      last_name: data?.user.last_name,
      phone_number: data?.user.phone_number,
      email: data?.user.email,
      password: data?.user.password,
      confirm_password: data?.user.password,
      address_line: 'string',
      unit_number: 'string',
      postal_code: 'string',
      city: 'string',
      province: 'string',
      country: 'string',
    }
	});
  console.log(userId);
	const { isLoading, mutate } = useMutation(
		async (updateProfile: IForm) => {
			return (await axios.put(`/user/${userId}`, updateProfile))
				.data;
		},
		{
			onSuccess: (data) => {
				const message = 'success';
				alert(message);
			},
			onError: () => {
				alert('there was an error');
			},
			onSettled: () => {
				queryClient.invalidateQueries('create');
			},
		}
	);

	const onSubmit = (data: IForm) => {
    console.log(data);
		const updateProfile = {
			...data,
		};
		mutate(updateProfile);
	};

	return (
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
			<div>
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
			<div>
				<label className='block mb-2 text-sm font-medium text-black-100 dark:text-black'>
					Email *
				</label>
				<input
					type='email'
					id='email'
					{...register('email')}
					className='bg-white-50 border border-white-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 block w-full bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'
					placeholder={data?.user.email}
				/>
			</div>

			{/* Password & Confirm password */}
			<div>
				<label className='block mb-2 text-sm font-medium text-black-100 dark:text-black'>
					Password *
				</label>
				<input
					type='password'
					id='password'
					{...register('password')}
					placeholder='••••••••'
					className='bg-white-50 border border-white-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 block w-full bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'
				/>
			</div>
			<div>
				<label className='block mb-2 text-sm font-medium text-black-100 dark:text-black'>
					Confirm password *
				</label>
				<input
					type='password'
					id='confirm-password'
					{...register('confirm_password')}
					placeholder='••••••••'
					className='bg-white-50 border border-white-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 block w-full bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'
				/>
			</div>

			{/* Address */}
			<div>
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
			<div>
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
			<div className='w-1/2 flex flex-row gap-4'>
				<div className='flex flex-col'>
					<label className='block mb-2 text-sm font-medium text-black-100 dark:text-black'>
						Postal Code *
					</label>
					<input
						type='text'
						id='postal_code'
						{...register('postal_code')}
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
						className='bg-white-50 border border-white-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'
					/>
				</div>
			</div>
			<div className='flex justify-center'>
				<button
					type='submit'
					className='  bg-lime-500 active:bg-lime-500 hover:bg-lime-500 focus:bg-lime-500 text-white font-bold py-2 px-4 rounded'>
					Update account
				</button>
			</div>
		</form>
	);
};
