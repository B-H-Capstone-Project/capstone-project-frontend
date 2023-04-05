/** @format */

import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { useForm,  } from 'react-hook-form';
import axios from '../../api/axios';
import { useMutation, useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { FormError } from '../../components/form-error';

interface IResetPassword {
  password: string;
  confirm_password: string;
}

export const ResetPassword = () => {
  const {
		register,
		getValues,
		formState: { errors, isValid },
		handleSubmit,
	} = useForm<IResetPassword>({
    mode: 'onChange'
  });
	const isAuth = useSelector((state: RootState) => state.auth);
	const userId = isAuth.userToken?.id;
	const queryClient = useQueryClient();
  
	const { isLoading, mutate } = useMutation(
		async (password: string) => {
			return (await axios.post(`/reset-password/${userId}`, password)).data;
		},
		{
			onSuccess: (data) => {
				const message = 'success';
        alert('success');
			},
			onError: () => {
				alert('there was an error');
			},
			onSettled: () => {
				queryClient.invalidateQueries('create');
			},
		}
	);

	const onSubmit = async (data: IResetPassword) => {
		mutate(data.password); 
	};
	return (
    <div className='h-screen flex justify-center mt-20'>
		<Container
			maxWidth='xs'
			fixed>
			<Box>
				<Typography variant='subtitle1'>Reset Password</Typography>
				<Typography variant='subtitle2'>Please enter the New Password</Typography>
        <form className='flex flex-col mt-5' onSubmit={handleSubmit(onSubmit)}>
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
                  validate: (value) =>
                  value === getValues("password")
								})}
								placeholder='••••••••'
								className='bg-white-50 border border-white-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 block w-full bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'
							/>
              {errors.confirm_password && errors.confirm_password.type === "validate" && <FormError errorMessage='Passwords do not match.' />}
						</div>
          <button className='btn mt-5 mb-2'>RESET PASSWORD</button>
        </form>
			</Box>
		</Container>
    </div>
	);
};
