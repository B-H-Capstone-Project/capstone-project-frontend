import React from "react";
import { useForm } from "react-hook-form";
<<<<<<< HEAD:capstone-project-frontend/src/pages/reservation-form.tsx
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

// date time picker
import dayjs, { Dayjs } from "dayjs";
=======
import { useNavigate } from "react-router-dom";
import { Dayjs } from "dayjs";
>>>>>>> 969bb68 (dddd):capstone-project-frontend/src/components/reservation-form.tsx
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

interface IReservationForm {
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  address_line: string;
  unit_number: string;
  postal_code: string;
  city: string;
  province: string;
  country: string;
  description: string;
}

function ReservationForm() {
  const [value, setValue] = React.useState<Dayjs | null>(null);

  const {
    register,
    getValues,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<IReservationForm>({
    mode: "onBlur",
  });
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    const {
      first_name,
      last_name,
      phone_number,
      email,
      address_line,
      unit_number,
      postal_code,
      city,
      province,
      country,
      description,
    } = getValues();
    //   try {
    //     const response = await axios.post('http://localhost:8080/auth/signup', {
    //       // Data to be sent to the server
    //       first_name: first_name,
    //       last_name: last_name,
    //       phone_number: phone_number,
    //       email: email,
    //       address_line: address_line,
    //       unit_number: unit_number,
    //       postal_code: postal_code,
    //       city: city,
    //       province: province,
    //       country: country,
    //     });
    //     console.log(response.data);
    //   } catch (err) {
    //     console.log(err);
    //   }
  };
  return (
    <>
      <div className="m-0 from-slate-100 via-lime-100 to-slate-100 ">
        {/* flex items-center justify-center px-6 py-8  md:h-screen lg:py-0 */}
        <div className="m-auto flex items-center flex-col p-20 justify-center">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 white">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-black-100 md:text-2xl text-lime-500">
                Request Reservation
              </h1>

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
                      {...register("first_name")}
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
                      {...register("last_name")}
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
                    {...register("phone_number")}
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
                    {...register("email")}
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
                    {...register("address_line")}
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
                    {...register("unit_number")}
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
                      {...register("postal_code")}
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
                      {...register("city")}
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
                      {...register("province")}
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
                      {...register("country")}
                      className="bg-white-50 border border-white-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                </div>
                {/* Type */}
                <label className="block mb-2 text-sm font-medium text-black-100 dark:text-black">
                  Type *
                </label>
                <div className="p-5 flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="type"
                      aria-describedby="terms"
                      type="radio"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800;"
                    />
                    <label className="block mb-2 text-sm font-medium text-black-100 dark:text-black">
                      Residential
                    </label>
                    <input
                      id="type"
                      aria-describedby="terms"
                      type="radio"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800;"
                    />
                    <label className="block mb-2 text-sm font-medium text-black-100 dark:text-black">
                      Commercial
                    </label>
                    <input
                      id="type"
                      aria-describedby="terms"
                      type="radio"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800;"
                    />
                    <label className="block mb-2 text-sm font-medium text-black-100 dark:text-black">
                      Service
                    </label>
                    <input
                      id="type"
                      aria-describedby="terms"
                      type="radio"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800;"
                    />
                    <label className="block mb-2 text-sm font-medium text-black-100 dark:text-black">
                      Outdoor Lighting
                    </label>
                  </div>
                </div>
                {/* Date / Time */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <label className="block mb-2 text-sm font-medium text-black-100 dark:text-black">
                    Date & Time
                  </label>
                  <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    value={value}
                    onChange={(newValue) => {
                      setValue(newValue);
                    }}
                  />
                </LocalizationProvider>
                <label className="block mb-2 text-sm font-medium text-black-100 dark:text-black">
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  {...register("description")}
                  className="bg-white-50 border border-white-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {/* Submit Button */}
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="  bg-lime-500 active:bg-lime-500 hover:bg-lime-500 focus:bg-lime-500 text-white font-bold py-2 px-4 rounded"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ReservationForm;
