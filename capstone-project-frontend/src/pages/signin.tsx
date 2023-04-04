/** @format */

import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useAppDispatch } from '../redux/hook';
import { IToken, signIn } from '../redux/reducer/authSlice';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';
import { FormError } from '../components/form-error';
import bcrypt from 'bcryptjs';
import jwtDecode from 'jwt-decode';

export interface ISignInForm {
	email: string;
	password: string;
}

export const SignIn = () => {
	const {
		register,
		getValues,
		formState: { errors, isValid },
		handleSubmit,
	} = useForm<ISignInForm>({
		mode: 'onBlur',
	});
	// Generate a salt with 10 rounds
	const salt = bcrypt.genSaltSync(10);
	const error = useSelector((state: RootState) => state.auth.error);
	const token = useSelector((state: RootState) => state.auth.userToken);
	const auth = useSelector((state: RootState) => state.auth);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const onSubmit = async () => {
		//sign in
		const { email, password } = getValues();
		// Hash the password using the salt
		//const hashedPassword = bcrypt.hashSync(password, salt);
		const result = await dispatch(signIn({ email: email, password: password }));
		if (!result.error) {
			const decodedToken: IToken = jwtDecode(result.payload.token);
			if (decodedToken.role === 3) {
				navigate('/reservation');
				// eslint-disable-next-line no-restricted-globals
				location.reload();
			}
			if (decodedToken.role === 1 || decodedToken.role === 2) {
				// eslint-disable-next-line no-restricted-globals
				location.reload();
				navigate('/admin');
			}
		}
	};
	//google
	const handleCallbackResponse = (res: any) => {
		sessionStorage.setItem('token', res.credential);
		console.log(res);
		navigate('/');
		// eslint-disable-next-line no-restricted-globals
		location.reload();
	};

	useEffect(() => {
		//google
		google.accounts.id.initialize({
			client_id:
				'491120951735-lb1o3sg8oimfdocobfj639jljdetq2tj.apps.googleusercontent.com',
			callback: handleCallbackResponse,
		});

		google.accounts.id.renderButton(document.getElementById('signinDiv')!, {
			theme: 'outline',
			size: 'large',
		});

		google.accounts.id.prompt();
	}, []);
	return (
		<>
			<Helmet>
				<title>Sign In | BOSS&HOSS</title>
			</Helmet>
			{!token && (
				<div className='m-0 p-0 flex h-screen'>
					<div className='m-0 p-0 w-full md:flex-co -mt-20 relative flex justify-center items-center sm:mt-10'>
						<div className='absolute left-1/2 transform -translate-x-1/2 -translate-y-1'>
							<h1 className='text-xl font-bold leading-tight tracking-tight text-black-100 md:text-2xl text-lime-500'>
								Sign In
							</h1>
							<p className='text-sm font-light text-gray-500 dark:text-gray-400 mt-5 mb-5'>
								Don't have an account?{' '}
								<Link
									to='/signup'
									className='font-medium text-primary-600 hover:underline text-lime-500'>
									Sign Up
								</Link>
							</p>
							<form
								onSubmit={handleSubmit(onSubmit)}
								className=''>
								<div className='mb-5'>
									<label className='block text-sm font-medium text-black-100 dark:text-black'>
										Email *
									</label>
									<input
										type='email'
										id='email'
										{...register('email')}
										className='bg-white-50 border border-white-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-20 py-2 block bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'
										placeholder='name@company.com'
									/>
								</div>
								{/* Password Input Div */}
								<div>
									<label className='block text-sm font-medium text-black-100 dark:text-black'>
										Password *
									</label>
									<input
										type='password'
										id='password'
										{...register('password')}
										placeholder='••••••••'
										className='bg-white-50 border border-white-100 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block px-20 py-2 bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'
									/>
								</div>
								<div className='w-full flex justify-center items-center m-2 flex-col'>
									{error && <FormError errorMessage={error} />}
									{!token && (
										<FormError errorMessage='You need to sign in to make a reservation' />
									)}
								</div>
								<div className='w-full p-5 flex items-center justify-center flex-col'>
									<button
										type='submit'
										className='inline-block px-10 py-3 bg-lime-500 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-lime-700 hover:shadow-lg focus:bg-lime-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'>
										Let's get started
									</button>
									<Link to='/reset-password' className='text-sm font-light text-gray-500 dark:text-gray-400 mt-5 mb-5'>
										Forgot your password?
									</Link>
								</div>
								<div className='w-full flex items-center justify-center'>
									<div id='signinDiv'></div>
								</div>
								{/* 								<div className='absolute inset-x-0 bottom-0'>

								</div> */}
							</form>
						</div>
					</div>
				</div>
			)}
			{token && <div>You already signed in</div>}
		</>
	);
};
