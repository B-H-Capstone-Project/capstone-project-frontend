/** @format */

import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useAppDispatch } from '../redux/hook';
import { signIn } from '../redux/reducer/authSlice';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';

export interface ISignInForm {
   email: string;
   password: string;
}
//max-w-full h-auto
export const SignIn = () => {
	const {
		register,
		getValues,
		formState: { errors, isValid },
		handleSubmit,
	} = useForm<ISignInForm>({
		mode: 'onBlur',
	});

	const isAuth = useSelector((state: RootState) => state.auth);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const onSubmit = async () => {
		const { email, password } = getValues();
		dispatch(signIn({ email: email, password: password }));

		if (isAuth.userToken) {
			if (isAuth.userToken?.role === 1 || isAuth.userToken?.role === 2) {
				navigate('/admin');
			}
		} else {
			navigate('/');
		}
	};

	const handleCallbackResponse = (res: any) => {
		localStorage.setItem('token', res.credential);
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
<<<<<<< HEAD
			<section className='h-screen bg-[length:1000px_625px] bg-[url("https://s3-alpha-sig.figma.com/img/ea9d/7411/f1c7bd178af6515cc828a195e91666be?Expires=1677456000&Signature=N~Oyz2hqQx~yv5Lk6XJYZhWllYZNcsE8q0yQC6IaepJ7ftVE3CrSuw8oe4T0HSbFKiJUcmQp2qR4RvzVXWVnQn7QjzXFit7nyjFIYnMUKnP2DdPxjs~JFj39u6uCyPDlBhaU4-UcS5PCyJ7xHEAMVi3JJ00VdxYSkFNU-CIAShFi753gbWgckj3ABLuDjH~sJt~SjfjeZRrjR5xIFlwZKU6ljWKzNDs2amxfJVlbaAn~kN~i9vlpBS0~dcVQJcL9d0FTd00MchBboUrmH1f7Lru28QnCuXHkrZbWdUiut3JDPF3Q5azUOz9f-HsA9lJuwChmn30X7xXo1PUUW9rVLA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4")]'>
				<Helmet>
					<title>Sign In | BOSS&HOSS</title>
				</Helmet>
				<div>
					<div className='absolute inset-y-0 right-0 h-full w-2/4 dark:border-black bg-white'>
						<div className='md:w-8/12 lg:w-5/12 lg:ml-20'>
							<h1 className='text-xl font-bold leading-tight tracking-tight text-black-100 md:text-2xl text-lime-500 mt-20 mb-5'>
								Sign In
							</h1>
							<p className='text-sm font-light text-center text-gray-500 dark:text-gray-400 mt-5 mb-5'>
								Don't have an account?{' '}
								<Link
									to='signup'
									className='font-medium text-center text-primary-600 hover:underline text-lime-500'>
									Sign Up
								</Link>
							</p>
								<div>
									<label className='block text-sm'>
										Email *
									</label>
									<input
										type='email'
										id='email'
										{...register('email')}
										className='w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600'
										placeholder='name@company.com'
									/>
								</div>
								{/* Password Input Div */}
								<div>
									<label className='block mt-4 text-sm'>
										Password *
									</label>
									<input
										type='password'
										id='password'
										{...register('password')}
										placeholder='••••••••'
										className='w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600'
									/>
								</div>
								<div className='p-5 flex items-start'>
									<div className='flex items-center h-5'>
										<input
											type='email'
											id='email'
											{...register('email')}
											className='bg-white-50 border border-white-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 block w-4/5 bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'
											placeholder='name@company.com'
										/>
									</div>
									{/* Password Input Div */}
									<div>
										<label className='block mb-2 text-sm font-medium text-black-100 dark:text-black'>
											Password *
										</label>
										<input
											type='password'
											id='password'
											{...register('password')}
											placeholder='••••••••'
											className='bg-white-50 border border-white-100 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 block w-4/5 bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'
										/>
									</div>
								</div>
								<div className='absolute bottom-0 left-16 h-5 w-16'>
									<div id='signinDiv'></div>
								</div>
								{/* 								<div className='absolute inset-x-0 bottom-0'>
=======
			<Helmet>
				<title>Sign In | BOSS&HOSS</title>
			</Helmet>
			<div className='h-screen m-0 p-0 w-full flex md:flex-col'>
				<div className='basis-1/2 bg-red-300 md:hidden'></div>
				<div className='basis-1/2 mt-10 relative flex justify-center items-center md:basis-4/5 sm:mt-0'>
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
							<div className='w-full p-5 flex items-center justify-center'>
								<button
									type='submit'
									className='inline-block px-10 py-3 mb-4 bg-lime-500 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-lime-700 hover:shadow-lg focus:bg-lime-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'>
									Let's get started
								</button>
							</div>
							<div className='w-full flex items-center justify-center'>
								<div id='signinDiv'></div>
							</div>
							{/* 								<div className='absolute inset-x-0 bottom-0'>
>>>>>>> 1482007830d36ed547a5f08cda6e369ff83c8109

								</div> */}
						</form>
					</div>
				</div>
<<<<<<< HEAD
				</div>
				</div>
			</body>
=======
			</div>
>>>>>>> 1482007830d36ed547a5f08cda6e369ff83c8109
		</>
	);
};
