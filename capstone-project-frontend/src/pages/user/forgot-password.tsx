/** @format */

import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { useForm,  } from 'react-hook-form';
import axios from '../../api/axios';
import { useMutation, useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

interface IResetPassword {
  email: string;
}

export const ForgotPassword = () => {
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
		async (email: string) => {
      console.log(email);
			return (await axios.post(`/reset-password/${userId}`, email)).data;
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
		mutate(data.email); 
	};
	return (
    <div className='h-screen flex justify-center mt-20'>
		<Container
			maxWidth='xs'
			fixed>
			<Box>
				<Typography variant='subtitle1'>FORGOT YOUR PASSWORD?</Typography>
				<Typography variant='subtitle2'>Please enter the e-mail address you use to log in, and we’ll send you a link to reset your password.</Typography>
        <form className='flex flex-col mt-5' onSubmit={handleSubmit(onSubmit)}>
          <label>Email address</label>
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
          <button className='btn mt-5 mb-2'>SEND EMAIL</button>
        </form>
			</Box>
		</Container>
    </div>
	);
};
