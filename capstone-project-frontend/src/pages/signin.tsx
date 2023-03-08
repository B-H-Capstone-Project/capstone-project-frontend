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
		navigate('/');
	};

	const handleCallbackResponse = (res: any) => {
		localStorage.setItem('token', res.credential);
		navigate('/');
		// eslint-disable-next-line no-restricted-globals
		location.reload();
	};

	useEffect(() => {
		//google
		/**global google */
		google.accounts.id.initialize({
			client_id:
				'491120951735-hflt1frfijgbls8m0od302emo2i2cu1r.apps.googleusercontent.com',
			callback: handleCallbackResponse,
		});

		google.accounts.id.renderButton(document.getElementById('signinDiv')!, {
			theme: 'outline',
			size: 'large',
		});
	}, []);

	return (
		<>
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

								</div> */}
							</form>
						</div>
					</div>
				</div>
				</div>
				</div>
			</body>
		</>
	);
};
