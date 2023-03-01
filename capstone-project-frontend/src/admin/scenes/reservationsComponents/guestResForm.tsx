import React from 'react'
import { useForm } from 'react-hook-form';
import { IReservationForm } from './adminResForm';

const GuestResForm = () => {

    const {
        register,
        getValues,
        formState: { errors, isValid },
        handleSubmit,
      } = useForm<IReservationForm>({
        mode: 'onBlur',
      });

  return (
      <div>
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
  )
}

export default GuestResForm