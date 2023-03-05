import { Box, InputLabel, MenuItem, Modal, Select, SelectChangeEvent, Typography } from '@mui/material'
import React, { ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form';
import axios from '../../../api/axios';

export interface IReservationForm {
  type: string;
  date: Date;
  description: string;
}

interface ICustomer {
  id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  address_line1: string;
  address_line2?: string;
  postal_code: string;
  city: string;
  province: string;
  country: string;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const ReservationModal = (props: any) => {
    const {
        register,
        getValues,
        formState: { errors, isValid },
        handleSubmit,
      } = useForm<IReservationForm>({
        mode: 'onBlur',
      });

  const [customer, setCustomer] = React.useState<ICustomer>();
  
  const handleChange = (e:SelectChangeEvent<any>) => {
      setCustomer(JSON.parse(e.target.value));
    };

  const onSubmit = async (data: any) => {
    const { type, date, description } = getValues();
    try {
      const response = await axios.post('http://localhost:8080/reservation', {
        user_id: customer?.id,
        type,
        date,
        description
      });
    } catch (err) {
      console.log(err);
    }
    props.setOpen(false);
    window.location.reload();
  };


  return (
    <Modal
        open={props.open}
        onClose={(): void => {
          props.setOpen(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add New Reservation
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputLabel id="demo-simple-select-standard-label">Customer List</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={customer}
            //   (event: SelectChangeEvent<any>, child: ReactNode) => void
              onChange={handleChange}
              label="Age"
            >
              {props.customers.map((customer:ICustomer) => (
                <MenuItem key={customer.id} value={JSON.stringify(customer)}>{customer.first_name} {customer.last_name}</MenuItem>
                ))}
            </Select>
            {customer ? 
            <div>
              <p>{customer?.first_name+`, `+customer?.last_name}</p>
              <p>{`Email: `+customer?.email}</p>
              <p>{`Phone Number: `+customer?.phone_number}</p>
              <p>{customer?.address_line1}</p>
              <p>{customer?.address_line2}</p>
              <p>{customer?.postal_code}</p>
              <p>{customer?.city+`, `+customer?.province+`, `+customer?.country}</p>
            </div> : null
          }
            {/* type */}
            <div className="flex flex-col">
              <label className="block mb-2 text-sm font-medium text-black-100 dark:text-black">
                Type *
              </label>
              <input
                type="radio"
                value="Residential"
                {...register('type')}
                className="bg-white-50 border border-white-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 block w-full bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />Residential
              <input
                type="radio"
                value="Commercial"
                {...register('type')}
                className="bg-white-50 border border-white-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 block w-full bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />Commercial
              <input
                type="radio"
                value="Service"
                {...register('type')}
                className="bg-white-50 border border-white-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 block w-full bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />Service 
              <input
                type="radio"
                value="Outdoor Lightning"
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
                value={props.selectedDate}
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
          </form>
        </Typography>
      </Box>
    </Modal>
  )
}

export default ReservationModal;