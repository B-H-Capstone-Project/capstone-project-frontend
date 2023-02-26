import { Switch } from '@mui/material';
import React, { ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form';
import axios from '../../../api/axios';

export interface IReservationForm {
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  address_line: string;
  unit_number?: string;
  postal_code: string;
  city: string;
  province: string;
  country: string;
  type: string;
  date: Date;
  description: string;
}
const AdminResForm = () => {

    const {
        register,
        getValues,
        formState: { errors, isValid },
        handleSubmit,
      } = useForm<IReservationForm>({
        mode: 'onBlur',
      });

      const [isContinueGuest, setIsContinueGuest] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsContinueGuest(event.target.checked);
  };

      const label = { inputProps: { 'aria-label': 'Size switch demo' } };

      const onSubmit = async (data: any) => {
        const { first_name, last_name, phone_number, email, address_line, unit_number, postal_code, city, province, country, type } = getValues();
        try {
          const response = await axios.post('http://localhost:8080/auth/signup', {
            // Data to be sent to the server
            first_name: first_name,
            last_name: last_name,
            phone_number: phone_number,
            email: email,
            address_line: address_line,
            unit_number: unit_number,
            postal_code: postal_code,
            city: city,
            province: province,
            country: country,
            type
          });
          console.log(response.data);
        } catch (err) {
          console.log(err);
        }
      };


  return (
    <div>
        <form onSubmit={handleSubmit(onSubmit)}>
        Continue as guest<Switch {...label} checked={isContinueGuest}
      onChange={handleChange} />
            {/* FirstName & LastName */}
            <div>
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
            </div>
                {/* type */}
                <div className="flex flex-col">
                  <label className="block mb-2 text-sm font-medium text-black-100 dark:text-black">
                    Type *
                  </label>
                  <input
                    type="radio"
                    id="residential"
                    {...register('type')}
                    className="bg-white-50 border border-white-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 block w-full bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />Residential
                  <input
                    type="radio"
                    id="commercial"
                    {...register('type')}
                    className="bg-white-50 border border-white-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 block w-full bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />Commercial
                  <input
                    type="radio"
                    id="service"
                    {...register('type')}
                    className="bg-white-50 border border-white-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 block w-full bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />Service
                  <input
                    type="radio"
                    id="outdoorLightning"
                    {...register('type')}
                    className="bg-white-50 border border-white-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 block w-full bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />Outdoor Lightning
                </div>
                {/* Date and Time */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-black-100 dark:text-black">
                    Date & Time *
                  </label>
                  <input
                    type="datetime-local"
                    id="date"
                    min={new Date().toISOString().slice(0, -8)}
                    {...register('date')}
                    className="bg-white-50 border border-white-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 block w-full bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                </div>
                {/* Description */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-black-100 dark:text-black">
                    Description
                  </label>
                  <input
                    type="textarea"
                    id="description"
                    {...register('description')}
                    className="bg-white-50 border border-white-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 block w-full bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div className="flex justify-center gap-4 mt-2 mb-2">
                  <div className='flex justify-start'>
                  <button
                    type="submit"
                    className="  bg-lime-500 active:bg-lime-500 hover:bg-lime-500 focus:bg-lime-500 text-white font-bold py-2 px-4 rounded">
                    SUBMIT
                  </button>
                  </div>
                </div>
                <div className='flex justify-center mt-4'>
                <label>
                  </label>
                  </div>
              </form>
    </div>
  )
}

export default AdminResForm;