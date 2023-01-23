import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { FormError } from '../components/form-error';

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
	const onSubmit = async () => {
		console.log(getValues());
		const { email, password } = getValues();
		const response = await fetch('http://localhost:8080/api/v1/login', {
			method: 'post',
			credentials: 'include',
      /**
       * Once again, fairly boiler plate. In the onSubmit function, 
       * we are also passing along credentials: “include”.
       * This is going to be useful for us to create authenticated sessions. Basically, 
       * we will be retrieving a cookie from that api/v1/login endpoint and storing that in the browser.
       * This parameter ensures we get it and don’t ignore it when the backend sends it over
       */
			headers: {
				// needed so express parser says OK to read
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: email,
				password: password,
			}),
		});
		if (response.status !== 200) {
			return alert('Something went wrong');
		}
	};
	return (
		<>
			<section className='h-screen'>
				<Helmet>
					<title>Sing In | BOSS&HOSS</title>
				</Helmet>
				<div className='container px-6 py-12 h-full'>
					<div className='flex justify-center items-center flex-wrap h-full g-6 text-gray-800'>
						{/* Left Image Section */}
						<div className='md:w-8/12 lg:w-6/12 mb-12 md:mb-0'>
							<img
								src='https://images.unsplash.com/photo-1494208133010-7227229a632a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
								className='w-full'
								// className="object-cover"
								alt='signin-image'
							/>
						</div>
						{/* Right Sign In Input Section */}
						<div className='md:w-8/12 lg:w-5/12 lg:ml-20'>
							<form onSubmit={handleSubmit(onSubmit)}>
								<div className='mb-6'>
									<h1>Sign In</h1>
									<span>Don't have an account?</span>
									<Link to='/signup '>
										<span className='text-green-900'> Sign up</span>
									</Link>
									{/* Email Input Div */}
									<input
										{...register('email', {
											required: true,
											pattern:
												/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
										})}
										name='email'
										type='email'
										placeholder='Email'
										className='form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
									/>
									{errors.email?.message && (
										<FormError errorMessage={errors.email.message} />
									)}
									{errors.email?.type === 'pattern' && (
										<FormError errorMessage={'Please enter a valid email'} />
									)}
								</div>
								{/* Password Input Div */}
								<div className='mb-6'>
									<input
										{...register('password', {
											required: true,
											minLength: 10,
										})}
										name='password'
										type='password'
										placeholder='Password'
										className='form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
									/>
									{errors.password?.message && (
										<FormError errorMessage={errors.password.message} />
									)}
									{errors.password?.type === 'minLength' && (
										<FormError errorMessage='Password must be more than 10 chars.' />
									)}
								</div>
								{/* Remember Check Box */}
								<div className='flex justify-between items-center mb-6'>
									<div className='form-group form-check'>
										<input
											type='checkbox'
											className='form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer'
											id='exampleCheck3'
											checked
										/>
										<label className='form-check-label inline-block text-gray-800'>
											Remember me
										</label>
									</div>
									<a
										href='#!'
										className='text-blue-600 hover:text-blue-700 focus:text-blue-700 active:text-blue-800 duration-200 transition ease-in-out'>
										Forgot password?
									</a>
								</div>

								<button
									type='submit'
									className='inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full'
									data-mdb-ripple='true'
									data-mdb-ripple-color='light'>
									Let's get started
								</button>

								<div className='flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5'>
									<p className='text-center font-semibold mx-4 mb-0'>OR</p>
								</div>

								<a
									className='px-7 py-3 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3'
									href='#!'
									role='button'
									data-mdb-ripple='true'
									data-mdb-ripple-color='light'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										viewBox='0 0 320 512'
										className='w-3.5 h-3.5 mr-2'>
										<path
											fill='currentColor'
											d='M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z'
										/>
									</svg>
									Continue with Facebook
								</a>
								<a
									className='px-7 py-3 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center'
									href='#!'
									role='button'
									data-mdb-ripple='true'
									data-mdb-ripple-color='light'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										viewBox='0 0 512 512'
										className='w-3.5 h-3.5 mr-2'>
										<path
											fill='currentColor'
											d='M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z'
										/>
									</svg>
									Continue with Gmail
								</a>
							</form>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};
