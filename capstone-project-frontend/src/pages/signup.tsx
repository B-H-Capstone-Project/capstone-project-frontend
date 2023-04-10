/** @format */

import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { FormError } from '../components/form-error';
import { useMutation, useQueryClient } from 'react-query';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';
import React, { useState } from 'react';
import axios from '../api/axios';
import { Loading } from '../components/loading';

interface ISignUpForm {
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

const signUp = async (data: ISignUpForm) => {
	const { data: response } = await axios.post('auth/signup', data);
	return response.data;
};

export const SignUp = () => {
	const queryClient = useQueryClient();
	const [error, setError] = useState(null);
	const isAuth = useSelector((state: RootState) => state.auth);
	const {
		register,
		watch,
		getValues,
		formState: { errors, isValid },
		handleSubmit,
	} = useForm<ISignUpForm>({
		mode: 'onChange',
	});
	const navigate = useNavigate();
	const { isLoading, mutate } = useMutation(signUp, {
		onSuccess: (data) => {
      navigate('/signin')
		},
		onError: (error: any) => {
			setError(error.response.data.message);
      alert(error.response.data.message);
		},
		onSettled: () => {
			queryClient.invalidateQueries('create');
		},
	});

	const onSubmit = (data: ISignUpForm) => {
		const postal_code = data.postal_code.toUpperCase().replaceAll(" ", "");
		const newUser = {
			...data,
			postal_code: postal_code,
		};
		mutate(newUser);
	};

	return (
		<>
			<Helmet>
				<title>Sign Up | BOSS&HOSS</title>
			</Helmet>
			{isLoading ? (
				<Loading />
			) : (
				<div
					className='relative w-full'
					style={{ height: '140vh' }}>
					<div className='absolute left-1/2 transform -translate-x-1/2 -translate-y-1 bg-white rounded-lg shadow dark:border py-8 px-10 mt-20 sm:py-2 sm:px-5 sm:w-full sm:rounded-none sm:border-none sm:mt-10'>
						<div className='mb-3'>
							<h1 className='text-2xl font-bold leading-tight tracking-tight text-black-100 text-lime-500 sm:mb-1'>
								Sign Up
							</h1>
							<p className='text-sm font-light text-gray-500 dark:text-gray-400'>
								Already have an account?{' '}
								<Link
									to='signin'
									className='font-medium text-primary-600 hover:underline text-lime-500'>
									Sign In
								</Link>
							</p>
						</div>
						<form onSubmit={handleSubmit(onSubmit)}>
							{/* FirstName & LastName */}
							<div className='w-1/2 flex flex-row gap-4 mb-3'>
								<div className='flex flex-col'>
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
								<div className='flex flex-col'>
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
							<div className='mb-3'>
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
							<div className='mb-3'>
								<label className='block mb-2 text-sm font-medium text-black-100 dark:text-black'>
									Email *
								</label>
								<input
									type='email'
									id='email'
									{...register('email', {
										required: true,
										pattern:
											/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
									})}
									className='bg-white-50 border border-white-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 block w-full bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'
									placeholder='name@company.com'
								/>
								{error && <FormError errorMessage={error} />}
								{errors.email?.message && (
									<FormError errorMessage={errors.email.message} />
								)}
								{errors.email?.type === 'pattern' && (
									<FormError errorMessage={'Please enter a valid email'} />
								)}
							</div>
							{/* Password & Confirm password */}
							<div className='mb-3'>
								<label className='block mb-2 text-sm font-medium text-black-100 dark:text-black'>
									Password *
								</label>
								<input
									type='password'
									id='password'
									{...register('password', {
										required: true,
										minLength: 10,
									})}
									placeholder='••••••••'
									className='bg-white-50 border border-white-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 block w-full bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'
								/>
								{errors.password?.message && (
									<FormError errorMessage={errors.password.message} />
								)}
								{errors.password?.type === 'minLength' && (
									<FormError errorMessage='Password must be more than 8 chars.' />
								)}
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
							<div className='flex gap-4 mb-3'>
								<div className='w-full'>
									<label className='block mb-2 text-sm font-medium text-black-100 dark:text-black'>
										Province *
									</label>
									{/* <select value={value} onChange={handleChange}> */}
									<select
										id='province'
										{...register('province')}
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
										value='Canada'
										{...register('country')}
										className='w-full bg-white-50 border border-white-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'
									/>
								</div>
							</div>
							<div className='p-5 flex items-start'>
								<div className='flex items-center h-5'>
									<input
										id='terms'
										aria-describedby='terms'
										type='checkbox'
										className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800;'
									/>
								</div>
								<div className=' ml-3 text-sm'>
									<label className='font-light text-gray-500 dark:text-gray-300'>
										I accept the{' '}
										<a
											className='font-medium text-primary-600 hover:underline dark:text-primary-500'
											href='#'>
											Terms and Conditions
										</a>
									</label>
								</div>
							</div>
							<div className='flex justify-center'>
								<button
									type='submit'
									className='btn'>
									Create account
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</>
	);
};
