/** @format */

import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import axios from '../api/axios';

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
	const navigate = useNavigate();

	const onSubmit = async() => {
    console.log('submit');

      const { email, password } = getValues();
      try {
         const response = await axios.post('/auth/signin', {
            // Data to be sent to the server
            email: email,
            password: password,
         });
         if (response.data.token) {
          const token = response.data.token;
          //ßlocalStorage.setItem(LOCAL_STORAGE_TOKEN, token);
         }
         navigate('/')
      } catch (err) {
         console.log(err);
      } 
	};
	return (
		<>
			<section className='h-screen bg-[length:1000px_625px] bg-[url("https://s3-alpha-sig.figma.com/img/ea9d/7411/f1c7bd178af6515cc828a195e91666be?Expires=1677456000&Signature=N~Oyz2hqQx~yv5Lk6XJYZhWllYZNcsE8q0yQC6IaepJ7ftVE3CrSuw8oe4T0HSbFKiJUcmQp2qR4RvzVXWVnQn7QjzXFit7nyjFIYnMUKnP2DdPxjs~JFj39u6uCyPDlBhaU4-UcS5PCyJ7xHEAMVi3JJ00VdxYSkFNU-CIAShFi753gbWgckj3ABLuDjH~sJt~SjfjeZRrjR5xIFlwZKU6ljWKzNDs2amxfJVlbaAn~kN~i9vlpBS0~dcVQJcL9d0FTd00MchBboUrmH1f7Lru28QnCuXHkrZbWdUiut3JDPF3Q5azUOz9f-HsA9lJuwChmn30X7xXo1PUUW9rVLA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4")]'>
				<Helmet>
					<title>Sign In | BOSS&HOSS</title>
				</Helmet>                             
				<div className=''>
					<div className='absolute inset-y-0 right-0 h-full w-2/4 dark:border-black bg-white'>
						<div className='md:w-8/12 lg:w-5/12 lg:ml-20'>
						<h1 className="text-xl font-bold leading-tight tracking-tight text-black-100 md:text-2xl text-lime-500 mt-20 mb-5">
                Sign In
              </h1>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400 mt-5 mb-5">
                Don't have an account?{" "}
                <Link
                  to="signup"
                  className="font-medium text-primary-600 hover:underline text-lime-500"
                >
                  Sign Up
                </Link>
              </p>
							<form onSubmit={handleSubmit(onSubmit)} className='absolute inset-y-50 left-30 w-4/5'>
							<div>
                  <label className="block mb-2 text-sm font-medium text-black-100 dark:text-black">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register('email')}
                    className="bg-white-50 border border-white-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 block w-4/5 bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                  />
                </div>
								{/* Password Input Div */}
								<div>
                  <label className="block mb-2 text-sm font-medium text-black-100 dark:text-black">
                    Password *
                  </label>
                  <input
                    type="password"
                    id="password"
                    {...register('password')}
                    placeholder="••••••••"
                    className="bg-white-50 border border-white-100 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 block w-4/5 bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                </div>
				<div className="p-5 flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800;"
                    />
                  </div>
                  <div className=" ml-2 text-sm">
                    <label className="font-light text-lime-500 dark:text-lime-300">
                      Remember Me {" "}
                    </label>
                  </div>
                </div>
								<button
									type='submit'
									className='inline-block px-6 py-3 mb-4 bg-lime-500 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-lime-700 hover:shadow-lg focus:bg-lime-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-4/5'>
									Let's get started
								</button>
								<p>
                  ---------------------------- or ----------------------------
                </p>
                <div className="flex justify-center mt-4 mb-4">
                  <div className='absolute bottom-0 left-16 h-5 w-16'>
                  <button
                    type="submit"
                    className="  bg-lime-500 active:bg-lime-500 hover:bg-lime-500 focus:bg-lime-500 text-white font-bold py-2 px-4 rounded">
                    Google
                  </button>
                  </div>
                  <div className='absolute bottom-0 right-17 h-5 w-16'>
                  <button
                    type="submit"
                    className="  bg-lime-500 active:bg-lime-500 hover:bg-lime-500 focus:bg-lime-500 text-white font-bold py-2 px-4 rounded">
                    Facebook
                  </button>
                  </div>
                </div>
				<div className='absolute inset-x-0 bottom-0'>
				<p>
                <Link
                  to="guest"
                  className="font-medium text-primary-700 hover:underline text-lime-500"
                >
                  Continue As Guest
                </Link>
              </p>
			  </div>
							</form>
							</div>
						</div>
					</div>
			</section>
		</>
	);
};
