/** @format */
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { FormError } from '../components/form-error';
import axios from 'axios';

interface ISignInForm {
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

	const onSubmit = async (data: any) => {
		const { email, password } = getValues();
		try {
			const response = await axios.post('http://localhost:8080/auth/signin', {
				// Data to be sent to the server
				email: email,
				password: password,
			});
			console.log(response.data);
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<>
			<section className='h-screen'>
				<Helmet>
					<title>Sign In | BOSS&HOSS</title>
				</Helmet>
				<div className='container px-6 py-12 h-full'>
					<div>
						{/* <img src={bg} /> */}
					</div>
					<div className='flex justify-center items-center flex-wrap h-full g-6 text-gray-800'>
						<div className='md:w-8/12 lg:w-5/12 lg:ml-20'>
							<form onSubmit={handleSubmit(onSubmit)}>
								<div className='mb-6'>
									<input
										{...register('email')}
										className='form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
									/>
								</div>
								{/* Password Input Div */}
								<div className='mb-6'>
									<input
										{...register('password')}
										className='form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
									/>
								</div>
								<button
									type='submit'
									className='inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full'>
									Let's get started
								</button>
							</form>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};
