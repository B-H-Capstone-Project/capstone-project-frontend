/** @format */

import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import React, { useCallback } from 'react';
import axios from '../api/axios';
import { RootState } from '../redux/store';
import { useAppSelector } from '../redux/hook';

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
  const { loading, error, userInfo } = useAppSelector((state) => state.auth)
	const navigate = useNavigate();
  const {  isLoggedIn, user, loading, token, error } = useSelector((state: RootState) => state.user)

	const onSubmit = async () => {
    const { email, password } = getValues();
    dispatch(signIn({email: email, password: password}));
    navigate('/');
	};
	return (
		<>
		<body>
        <div className="flex items-center min-h-screen bg-lime-100">
            <div className="flex-1 h-full max-w-4xl mx-auto bg-white rounded-lg shadow-xl">
                <div className="flex flex-col md:flex-row">
                    <div className="h-32 md:h-auto md:w-1/2">
                        <img className="object-cover w-full h-full" src="https://s3-alpha-sig.figma.com/img/ea9d/7411/f1c7bd178af6515cc828a195e91666be?Expires=1677456000&Signature=N~Oyz2hqQx~yv5Lk6XJYZhWllYZNcsE8q0yQC6IaepJ7ftVE3CrSuw8oe4T0HSbFKiJUcmQp2qR4RvzVXWVnQn7QjzXFit7nyjFIYnMUKnP2DdPxjs~JFj39u6uCyPDlBhaU4-UcS5PCyJ7xHEAMVi3JJ00VdxYSkFNU-CIAShFi753gbWgckj3ABLuDjH~sJt~SjfjeZRrjR5xIFlwZKU6ljWKzNDs2amxfJVlbaAn~kN~i9vlpBS0~dcVQJcL9d0FTd00MchBboUrmH1f7Lru28QnCuXHkrZbWdUiut3JDPF3Q5azUOz9f-HsA9lJuwChmn30X7xXo1PUUW9rVLA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                            alt="img" />
                    </div>
					<div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                        <div className="w-full">
							<h1 className='mb-4 text-2xl font-bold text-center text-lime-500'>
								Sign In
							</h1>
							<p className='text-sm font-light text-center text-gray-500 dark:text-gray-400 mt-5 mb-5'>
								Don't have an account?{' '}
								<Link
									to='signup'
									className='font-medium text-primary-600 hover:underline text-lime-500'>
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
											id='remember'
											aria-describedby='remember'
											type='checkbox'
											className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800;'
										/>
									</div>
									<div className=' ml-2 text-sm'>
										<label className='font-light text-lime-500 dark:text-lime-300'>
											Remember Me{' '}
										</label>
									</div>
								</div>
								<button
									type='submit' 
									className='block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-lime-500 border border-transparent rounded-lg hover:bg-lime-700 hover:shadow-lg focus:bg-lime-700'>
									LOGIN
								</button>
								<div className="flex justify-between items-center mt-3">
            <hr className="w-full"/>
            <span className="p-2 text-gray-400 mb-1">OR</span>
            <hr className="w-full"/>
            </div>
				<div className="flex items-center justify-center gap-4">           
						<button type="button" className="text-white bg-[#4285F4] hover:bg-[#4285F4] focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2">
                          <svg className="w-4 h-4 mr-2 -ml-1" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
                            Sign in with Google
                            </button>
						<button type="button" className="text-white bg-[#3b5998] hover:bg-[#3b5998] focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2">
                          <svg className="w-4 h-4 mr-2 -ml-1" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="facebook-f" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M279.1 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.4 0 225.4 0c-73.22 0-121.1 44.38-121.1 124.7v70.62H22.89V288h81.39v224h100.2V288z"></path></svg>
                            Sign in with Facebook
                            </button>
                            </div>
								<div className='absolute inset-x-0 bottom-0'>
									<p>
										<Link
											to='guest'
											className='font-medium text-primary-700 hover:underline text-lime-500'>
											
										</Link>
									</p>
								</div>

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