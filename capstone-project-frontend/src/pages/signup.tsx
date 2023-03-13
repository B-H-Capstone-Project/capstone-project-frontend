/** @format */

import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { FormError } from '../components/form-error';
import { useMutation, useQueryClient } from 'react-query';
import React from 'react';
import axios from '../api/axios';

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
	const {
		register,
		getValues,
		formState: { errors, isValid },
		handleSubmit,
	} = useForm<ISignUpForm>({
		mode: 'onChange',
	});
	const navigate = useNavigate();

	const { isLoading, mutate } = useMutation(signUp, {
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

	const onSubmit = (data: ISignUpForm) => {
		const newUser = {
			...data,
		};
		mutate(newUser);
	};

	return (
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> b712cfb72957cb0096dcdd18e49bca850f806a7e
    <>
      <div className="m-0 from-slate-100 via-lime-100 to-slate-100 ">

        {/* flex items-center justify-center px-6 py-8  md:h-screen lg:py-0 */}
        <div className="m-auto flex items-center flex-col p-20 justify-center">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 white">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-black-100 md:text-2xl text-lime-500">
                Sign Up
              </h1>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to="signin"
                  className="font-medium text-primary-600 hover:underline text-lime-500"
                >
                  Sign In
                </Link>
              </p>
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* FirstName & LastName */}
                <div className="w-1/2 flex flex-row gap-4">
                  <div className="flex flex-col">
                    <label className="block mb-2 text-sm font-medium text-black-100 dark:text-black">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="first_name"
                      {...register('first_name')}
                      className="bg-white-50 border border-white-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="John"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="block mb-2 text-sm font-medium text-black-100 dark:text-black">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="last_name"
                      {...register('last_name')}
                      className="bg-white-50 border border-white-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-black-100 dark:text-black">
                    Phone Number *
                  </label>
                  <input
                    type="text"
                    id="phone_number"
                    {...register('phone_number')}
                    className="bg-white-50 border border-white-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 block w-full bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                </div>
                {/* Email */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-black-100 dark:text-black">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register('email')}
                    className="bg-white-50 border border-white-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 block w-full bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
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
                  <label className="block mb-2 text-sm font-medium text-black-100 dark:text-black">
                    Address *
                  </label>
                  <input
                    type="text"
                    id="address_line"
                    {...register('address_line')}
                    className="bg-white-50 border border-white-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 block w-full bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                </div>
                {/* Unit Number & Postal Code  */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-black-100 dark:text-black">
                    Unit Number
                  </label>
                  <input
                    type="text"
                    id="unit_number"
                    {...register('unit_number')}
                    className="bg-white-50 border border-white-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 block w-full bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                </div>
                {/* Postal Code & City */}
                <div className="w-1/2 flex flex-row gap-4">
                  <div className="flex flex-col">
                    <label className="block mb-2 text-sm font-medium text-black-100 dark:text-black">
                      Postal Code *
                    </label>
                    <input
                      type="text"
                      id="postal_code"
                      {...register('postal_code')}
                      className="bg-white-50 border border-white-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                  </div>

                  <div className="flex flex-col">
                    <label className="block mb-2 text-sm font-medium text-black-100 dark:text-black">
                      City *
                    </label>
                    <input
                      type="text"
                      id="city"
                      {...register('city')}
                      className="bg-white-50 border border-white-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                  </div>
                </div>

                {/* Province & Country */}
                <div className="w-1/2 flex flex-row gap-4">
                  <div className="flex flex-col">
                    <label className="block mb-2 text-sm font-medium text-black-100 dark:text-black">
                      Province *
                    </label>
                    <input
                      type="text"
                      {...register('province')}
                      id="province"
                      className="bg-white-50 border border-white-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                  </div>

                  <div className="flex flex-col">
                    <label className="block mb-2 text-sm font-medium text-black-100 dark:text-black">
                      Country *
                    </label>
                    <input
                      type="text"
                      id="country"
                      {...register('country')}
                      className="bg-white-50 border border-white-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                  </div>
                </div>
                <div className="p-5 flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800;"
                    />
                  </div>
                  <div className=" ml-3 text-sm">
                    <label className="font-light text-gray-500 dark:text-gray-300">
                      I accept the{" "}
                      <a
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                        href="#"
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="  bg-lime-500 active:bg-lime-500 hover:bg-lime-500 focus:bg-lime-500 text-white font-bold py-2 px-4 rounded">
                    Create account
                  </button>
                </div>
                <p>
                  ---------------------------- or ----------------------------
                </p>
                <div className="flex justify-center gap-4 mt-2 mb-2">
                  <div className='flex justify-start'>
                  <button
                    type="submit"
                    className="  bg-lime-500 active:bg-lime-500 hover:bg-lime-500 focus:bg-lime-500 text-white font-bold py-2 px-4 rounded">
                    Google
                  </button>
                  </div>
                  <div className='flex justify-end'>
                  <button
                    type="submit"
                    className="  bg-lime-500 active:bg-lime-500 hover:bg-lime-500 focus:bg-lime-500 text-white font-bold py-2 px-4 rounded">
                    Facebook
                  </button>
                  </div>
                </div>
                <div className='flex justify-center mt-4'>
                <label>
                  <Link to='guest'
                  className="font-medium text-primary-700 hover:underline text-lime-500">
                          Continue As Guest
                  </Link>
                  </label>
                  </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
=======
		<div className='relative w-full h-screen'>
			<div className='absolute left-1/2 transform -translate-x-1/2 -translate-y-1 bg-white rounded-lg shadow dark:border py-8 px-10 mt-20 sm:py-2 sm:px-5 sm:w-full sm:rounded-none sm:border-none sm:mt-15'>
				<div className='sm:mb-3'>
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
							placeholder='name@company.com'
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
					<div>
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
							className='  bg-lime-500 active:bg-lime-500 hover:bg-lime-500 focus:bg-lime-500 text-white font-bold py-2 px-4 rounded'>
							Create account
						</button>
					</div>
				</form>
			</div>
		</div>
	);
>>>>>>> e050ba375f60c0f73916c191fc90880a6a09bdf4
};
