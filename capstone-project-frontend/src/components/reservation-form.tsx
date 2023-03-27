/** @format */

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// date time picker
import dayjs, { Dayjs } from "dayjs";
import { TextField, FormControl } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useMutation, useQueryClient } from "react-query";
import axios from "../api/axios";
import { RootState } from "../redux/store";
import { useMe } from "../hooks/useMe";

interface IReservationForm {
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  address_line1: string;
  address_line2: string;
  postal_code: string;
  city: string;
  province: string;
  country: string;
  type: string;
  date: Date;
  description: string;
}

// const reservation = async (data: IReservationForm) => {
//   const { data: response } = await axios.post(
//     "/reservation/newreservation",
//     data
//   );
//   console.log("---reservation front-----" + JSON.stringify(data));
//   return response.data;
// };

export const ReservationForm = () => {
  const today = new Date().toISOString().split("T")[0];
  const queryClient = useQueryClient();
  const { data } = useMe();
  const isAuth = useSelector((state: RootState) => state.auth);
  const [dateTime, setDateTime] = React.useState<Dayjs | null>();

  const userId = isAuth.userToken?.id;
  const {
    register,
    getValues,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<IReservationForm>({
    mode: "onChange",
    resetOptions: {
      keepDirtyValues: true,
    },
    defaultValues: async () => await axios.get(`/user/${userId}`),
  });

  const { isLoading, mutate } = useMutation(
    async (newReservation: IReservationForm) => {
      await axios.post(`/reservation/newreservation`, newReservation);
    },
    {
      onSuccess: (data) => {
        console.log("success in" + data);
        const message = "success";
        alert(message);
      },
      onError: (err) => {
        console.log(err);
        alert("Error in use mutation");
      },
      onSettled: () => {
        queryClient.invalidateQueries("create");
      },
    }
  );

  const onSubmit = async (data: any) => {
    const { type, date, description } = getValues();
    console.log(data);
    const prevUserInfo = data.data.user;
    const newUserInfo = prevUserInfo;
    Object.entries(prevUserInfo).filter(([prevDataKey, prevValue]) => {
      for (const [dataKey, dataValue] of Object.entries(data)) {
        if (prevDataKey === dataKey) {
          newUserInfo[prevDataKey] = dataValue;
        }
      }
    });
    const newReservation = {
      ...data,
    };

    mutate(newReservation);
  };

  return (
    <div className="relative h-screen p-10">
      <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1 bg-white rounded-xl shadow dark:border py-8 px-10 mt-20 sm:py-2 sm:px-5 sm:w-full sm:rounded-none sm:border-none sm:mt-15">
        <div className="mb-10">
          <h1 className="text-2xl font-bold leading-tight tracking-tight text-black-100 text-lime-500 sm:mb-1">
            Request Reservation
          </h1>
        </div>
        <FormControl>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* FirstName & LastName */}
            <div className="w-1/2 flex flex-row gap-4">
              <div className="flex flex-col mb-3">
                <label className="block mb-2 text-sm font-medium text-black-100 dark:text-black">
                  First Name *
                </label>
                <input
                  type="text"
                  id="first_name"
                  value={data?.user.first_name}
                  {...register("first_name")}
                  className="bg-white-50 border border-white-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="flex flex-col mb-3">
                <label className="block mb-2 text-sm font-medium text-black-100 dark:text-black">
                  Last Name *
                </label>
                <input
                  type="text"
                  id="last_name"
                  {...register("last_name")}
                  className="bg-white-50 border border-white-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={data?.user.last_name}
                />
              </div>
            </div>
            <div className="flex flex-col mb-3">
              <label className="block mb-2 text-sm font-medium text-black-100 dark:text-black">
                Phone Number *
              </label>
              <input
                type="text"
                id="phone_number"
                {...register("phone_number")}
                value={data?.user.phone_number}
                className="bg-white-50 border border-white-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 block w-full bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            {/* Email */}
            <div className="flex flex-col mb-3">
              <label className="block mb-2 text-sm font-medium text-black-100 dark:text-black">
                Email *
              </label>
              <input
                type="text"
                id="email"
                {...register("email")}
                className="bg-white-50 border border-white-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 block w-full bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={data?.user.email}
                readOnly
              />
            </div>

            {/* Address */}

            <div className="flex flex-col mb-3">
              <label className="block mb-2 text-sm font-medium text-black-100 dark:text-black">
                Address Line 1 *
              </label>
              <input
                type="text"
                id="address_line1"
                {...register("address_line1")}
                className="bg-white-50 border border-white-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 block w-full bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={data?.user.address_line1}
              />
            </div>
            {/* Unit Number & Postal Code  */}
            <div className="flex flex-col mb-3">
              <label className="block mb-2 text-sm font-medium text-black-100 dark:text-black">
                Address Line 2
              </label>
              <input
                type="text"
                id="address_line2"
                required
                {...register("address_line2")}
                className="bg-white-50 border border-white-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 block w-full bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={data?.user.address_line2}
              />
            </div>
            {/* Postal Code & City */}
            <div className="flex gap-4 mb-3">
              <div className="w-full">
                <label className="block mb-2 text-sm font-medium text-black-100 dark:text-black">
                  Postal Code *
                </label>
                <input
                  type="text"
                  id="postal_code"
                  required
                  {...register("postal_code")}
                  className="w-full bg-white-50 border border-white-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={data?.user.postal_code}
                />
              </div>
              <div className="w-full">
                <label className="block mb-2 text-sm font-medium text-black-100 dark:text-black">
                  City *
                </label>
                <input
                  type="text"
                  id="city"
                  required
                  {...register("city")}
                  value={data?.user.city}
                  className="w-full bg-white-50 border border-white-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </div>

            {/* Province & Country */}
            <div className="flex gap-4 mb-3">
              <div className="w-full">
                <label className="block mb-2 text-sm font-medium text-black-100 dark:text-black">
                  Province *
                </label>
                {/* <select value={value} onChange={handleChange}> */}
                <select
                  id="province"
                  required
                  {...register("province")}
                  value={data?.user.province}
                  className="w-full bg-white-50 border border-white-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="AB">AB</option>
                  <option value="BC">BC</option>
                  <option value="NB">NB</option>
                  <option value="NL">NL</option>
                  <option value="NS">NS</option>
                  <option value="NT">NT</option>
                  <option value="NU">NU</option>
                  <option value="MB">MB</option>
                  <option value="ON">ON</option>
                  <option value="PE">PE</option>
                  <option value="QC">QC</option>
                  <option value="SK">SK</option>
                  <option value="YT">YT</option>
                </select>
              </div>
              <div className="w-full">
                <label className="block mb-2 text-sm font-medium text-black-100 dark:text-black">
                  Country *
                </label>
                <input
                  type="text"
                  id="country"
                  required
                  {...register("country")}
                  value={data?.user.country}
                  className="w-full bg-white-50 border border-white-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </div>
            {/* Type */}
            <label className="block text-sm font-medium text-black-100 dark:text-black">
              Type *
            </label>
            <div className="p-5 flex items-start flex-col">
              <div className="flex items-center h-5 m-2">
                <input
                  id="type"
                  required
                  {...register("type")}
                  value="Residential"
                  aria-describedby="terms"
                  type="radio"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800;"
                />
                <label className="block m-2 text-sm font-medium text-black-100 dark:text-black">
                  Residential
                </label>
                <input
                  id="type"
                  required
                  {...register("type")}
                  value="Commercial"
                  aria-describedby="terms"
                  type="radio"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800;"
                />
                <label className="block m-2 text-sm font-medium text-black-100 dark:text-black">
                  Commercial
                </label>
                <input
                  id="type"
                  required
                  {...register("type")}
                  value="Service"
                  aria-describedby="terms"
                  type="radio"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800;"
                />
                <label className="block m-2 text-sm font-medium text-black-100 dark:text-black">
                  Service
                </label>
                <input
                  id="type"
                  required
                  {...register("type")}
                  value="Outdoor Lighting"
                  aria-describedby="terms"
                  type="radio"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800;"
                />
                <label className="block m-2 text-sm font-medium text-black-100 dark:text-black">
                  Outdoor Lighting
                </label>
              </div>
            </div>
            <div className="flex flex-col mb-3">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <input
                  type="datetime-local"
                  required
                  {...register("date")}
                  min={new Date().toISOString().slice(0, -8)}
                  // {...register("date")}
                  //label="date"
                  // renderInput={(props) => <TextField {...props} />}
                  // value={dateTime}
                  // minDate={dayjs().add(1, "day")}
                  // onChange={(newValue) => {
                  //   setDateTime(newValue);
                  //   //console.log(dateTime);
                  // }}
                  // onClose={()=>{setDateTime(props.existedRes?.date.slice(0, -8))}}
                />
              </LocalizationProvider>
            </div>
            <div className="flex flex-col mb-5">
              <label className="block mb-2 text-sm font-medium text-black-100 dark:text-black">
                Description
              </label>
              <input
                type="text"
                id="description"
                required
                {...register("description")}
                className="bg-white-50 border border-white-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            {/* Submit Button */}
            <div className="flex flex-col">
              <button
                type="submit"
                className="  bg-lime-500 active:bg-lime-500 hover:bg-lime-500 focus:bg-lime-500 text-white font-bold py-2 px-4 rounded"
              >
                Submit
              </button>
            </div>
          </form>
        </FormControl>
      </div>
    </div>
  );
};

export default ReservationForm;
