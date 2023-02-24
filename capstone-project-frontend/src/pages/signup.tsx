import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { FormError } from '../components/form-error';
import axios from 'axios';
import React from 'react';


interface ISignUpForm {
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  password: string;
  confirm_password: string;
  address_line: string;
  unit_number: string;
  postal_code: string;
  city: string;
  province: string;
  country: string;
}

export const SignUp = () => {

  const {
    register,
    getValues,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<ISignUpForm>({
    mode: 'onBlur',
  });
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    const { first_name, last_name, phone_number, email, password, confirm_password, address_line, unit_number, postal_code, city, province, country } = getValues();
    try {
      const response = await axios.post('http://localhost:8080/auth/signup', {
        // Data to be sent to the server
        first_name: first_name,
        last_name: last_name,
        phone_number: phone_number,
        email: email,
        password: password,
        confirm_password: confirm_password,
        address_line: address_line,
        unit_number: unit_number,
        postal_code: postal_code,
        city: city,
        province: province,
        country: country,
      });
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
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
                <div className="flex flex-row gap-4">           
                <div className="md:w-1/2">
                    <label className="block mb-2 text-sm font-medium text-black-100 dark:text-black">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="first_name"
                      {...register('first_name')}
                      className="bg-white-50 border border-white-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 block w-full bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="John"
                    />
                  </div>
                  <div className="md:w-1/2">
                    <label className="block mb-2 text-sm font-medium text-black-100 dark:text-black">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="last_name"
                      {...register('last_name')}
                      className="bg-white-50 border border-white-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 block w-full bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                  <label className="block mb-2 text-sm font-medium text-black-100 dark:text-black">
                    Password *
                  </label>
                  <input
                    type="password"
                    id="password"
                    {...register('password')}
                    placeholder="••••••••"
                    className="bg-white-50 border border-white-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 block w-full bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-black-100 dark:text-black">
                    Confirm password *
                  </label>
                  <input
                    type="password"
                    id="confirm-password"
                    {...register('confirm_password')}
                    placeholder="••••••••"
                    className="bg-white-50 border border-white-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 block w-full bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                <div className="flex flex-row gap-4">           
                <div className="md:w-1/2">
                    <label className="block mb-2 text-sm font-medium text-black-100 dark:text-black">
                      Postal Code *
                    </label>
                    <input
                      type="text"
                      id="postal_code"
                      {...register('postal_code')}
                      className="bg-white-50 border border-white-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 block w-full bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                  </div>

                  <div className="md:w-1/2">
                    <label className="block mb-2 text-sm font-medium text-black-100 dark:text-black">
                      City *
                    </label>
                    <input
                      type="text"
                      id="city"
                      {...register('city')}
                      className="bg-white-50 border border-white-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 block w-full bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                  </div>
                </div>

                {/* Province & Country */}
                <div className="flex flex-row gap-4">           
                <div className="md:w-1/2">
                    <label className="block mb-2 text-sm font-medium text-black-100 dark:text-black">
                      Province *
                    </label>
                    <input
                      type="text"
                      {...register('province')}
                      id="province"
                      className="bg-white-50 border border-white-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 block w-full bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                  </div>

                  <div className="md:w-1/2">
                    <label className="block mb-2 text-sm font-medium text-black-100 dark:text-black">
                      Country *
                    </label>
                    <input
                      type="text"
                      id="country"
                      {...register('country')}
                      className="bg-white-50 border border-white-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 block w-full bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                <div className="flex justify-between items-center mt-3">
            <hr className="w-full"/>
            <span className="p-2 text-gray-400 mb-1">OR</span>
            <hr className="w-full"/>
            </div>
				<div className="flex items-center flex-row gap-4">           
                  <div className="md:w-1/2">
						<button type="button" className="text-white bg-[#4285F4] hover:bg-[#4285F4] focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2">
                          <svg className="w-4 h-4 mr-2 -ml-1" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
                            Sign in with Google
                            </button>
							  </div>
				  <div className="md:w-1/2">
						<button type="button" className="text-white bg-[#3b5998] hover:bg-[#3b5998] focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2">
                          <svg className="w-4 h-4 mr-2 -ml-1" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="facebook-f" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M279.1 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.4 0 225.4 0c-73.22 0-121.1 44.38-121.1 124.7v70.62H22.89V288h81.39v224h100.2V288z"></path></svg>
                            Sign in with Facebook
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
};
