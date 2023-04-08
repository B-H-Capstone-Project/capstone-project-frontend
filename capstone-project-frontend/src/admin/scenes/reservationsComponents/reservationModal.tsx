import { Avatar, Box, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Modal, Radio, RadioGroup, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
// import { DateField } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import axios from '../../../api/axios';
import EditIcon from '@mui/icons-material/Edit';
import IReservationForm from '../../../types/reservation';

interface ICustomer {
  id: number;
  first_name: string;
  last_name: string;
  profile:string;
  phone_number: string;
  email: string;
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

const provinces = ['AB','BC','NB','NL','NS','NT','NU','MB','ON','PE','QC','SK','YT'];

const ReservationModal = (props: any) => {
  const queryClient = useQueryClient();
	const [error, setError] = useState(null);
  const [customer, setCustomer] = React.useState<ICustomer>(props.customer);
  const [isReadOnly, setIsReadOnly] = React.useState(false);
  const [dateTime, setDateTime] = React.useState<Dayjs | null>(null);
  const [province, setProvince] = React.useState(props.existedRes?.province);
  
  useEffect(()=> {
    setIsReadOnly(!props.isNew);
  }, [props.isNew, props]);

  const makeReset = () => {
    props.setExistedRes(null); 
    props.setSelectedDate(null);
    props.setOpen(false);
    props.setIsNew(false);
    props.setCustomer(null);
    setIsReadOnly(true);
    setDateTime(null);
    setProvince(null);
    reset();
}
  const {
      register,
      getValues,
      formState: { errors, isValid },
      handleSubmit,
      reset
    } = useForm<IReservationForm>({
      mode: 'onChange',
    });

    const createRes = async (data: IReservationForm) => {
      const { data: response } = await axios.post(`reservation/${props.customer?.id}`, data);
      return response.data;
    };

    const updateRes = async (data: IReservationForm) => {
      const { data: response } = await axios.put(`reservation/${props.existedRes?.reservation_id}`, data);
      return response.data;
    };
    

    const { isLoading, mutate } = useMutation(props.isNew ? createRes: updateRes, {
      
      onSuccess: (data) => {
        const message = 'success';
        alert(message);
      },
      onError: (error: any) => {
        setError(error.response.data.message);
      },
      onSettled: () => {
        queryClient.invalidateQueries('create');
      },
    });

  const handleChange = (e:SelectChangeEvent<any>) => {
      props.setCustomer(JSON.parse(e.target.value));
    };

  const handleEditClick = () => {
    props.setIsNew(false);
    setIsReadOnly(false);
  };

  const onSubmit = async (data: any) => {
    if(props.isNew) {
      const newRes = {
        ...data,
        date: props.selectedDate,
        user_id: props.customer.id,
      }
      mutate(newRes);
    } else {
      const updateRes = {
        ...data,
        date: props.selectedDate,
        user_id: props.customer.id,
      }
      mutate(updateRes);
    }
    makeReset();
    window.location.reload();
  };
  return (
    <Modal
        open={props.open}
        onClose={(): void => {
          makeReset();
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={style}>
        {props.isNew === false ? <EditIcon onClick={handleEditClick}/>:null}
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        {props.isNew === true ? <>
          <InputLabel id="demo-simple-select-standard-label">Customer List</InputLabel>
          <Select
            {...register('id', {value: props.customer?.id, required: true})}
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            onChange={handleChange}
            defaultValue={props.customer ? JSON.stringify(props.customer) : ''}
            label="Customer"
          >
            {props.customers.map((customer:ICustomer) => (
              <MenuItem key={customer.id} value={JSON.stringify(customer)}>{customer.first_name} {customer.last_name}</MenuItem>
              ))}
          </Select>

        </>: null}
          <div>
            <div>
            <Avatar alt={props.customer?.last_name} src={props.customer?.profile} />
            <span>{props.customer?.first_name+`, `+props.customer?.last_name}</span><br/>
            <span>{`Email: `+props.customer?.email}</span><br/>
            <span>{`Phone Number: `+props.customer?.phone_number}</span><br/>
            </div>
            {/* AddressLine1 */}
            <TextField
              required
              {...register('address_line1', {required: "This is required"})}
              label="Address Line1"
              id="address_line1"
              InputProps={{
                readOnly: isReadOnly,
              }}
              defaultValue={props.existedRes?.address_line1}
              className="bg-white-50 border border-white-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 block w-full bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {/* AddressLine2 */}
            <TextField
              {...register('address_line2')}
              label="Address Line2"
              id="address_line1"
              InputProps={{
                readOnly: isReadOnly,
              }}
              defaultValue={props.existedRes?.address_line2}
              className="bg-white-50 border border-white-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 block w-full bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {/* Postal Code */}
            <TextField
            required
              {...register('postal_code',{ required: true})}
              label="Postal Code"
              id="postal_code"
              InputProps={{
                readOnly: isReadOnly,
              }}
              defaultValue={props.existedRes?.postal_code}
              className="bg-white-50 border border-white-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 block w-full bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {/* city */}
          <TextField
          required
              {...register('city')}
              label="City"
              id="city"
              InputProps={{
                readOnly: isReadOnly,
              }}
              defaultValue={props.existedRes?.city}
              className="bg-white-50 border border-white-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 block w-full bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {/* Province */}
            <TextField
              required
              {...register('province')}
              label="Province"
              id="province"
              InputProps={{
                readOnly: isReadOnly,
              }}
              defaultValue={props.existedRes?.province}
              className="bg-white-50 border border-white-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 block w-full bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            
          {/* country */}
          <TextField
          required
              {...register('country')}
              label="Country"
              id="country"
              InputProps={{
                readOnly: isReadOnly,
              }}
              defaultValue={props.existedRes?.country}
              className="bg-white-50 border border-white-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 block w-full bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />

        {/* type */}
        <div className="flex flex-col">
        <FormLabel id="modal-modal-title">Types *</FormLabel>
          <RadioGroup 
          defaultValue={props.existedRes?.type}>
            <FormControlLabel {...register("type", {required: "This is required"})} value="Residential" control={<Radio />} label="Residential" disabled={isReadOnly}/>
            <FormControlLabel {...register("type", {required: "This is required"})} value="Commercial" control={<Radio />} label="Commercial" disabled={isReadOnly}/>
            <FormControlLabel {...register("type", {required: "This is required"})} value="Service" control={<Radio />} label="Service" disabled={isReadOnly}/>
            <FormControlLabel {...register("type", {required: "This is required"})} value="Outdoor Lighting" control={<Radio />} label="Outdoor Lighting" disabled={isReadOnly}/>
          </RadioGroup>
              
            </div>
            {/* Date and Time */}
            <div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                    label="Date & Time *"
                    renderInput={(props) => <TextField
                      {...props}/>}
                    value={props.selectedDate}
                    minDate={dayjs().add(1, 'day')}
                    readOnly={isReadOnly}
                    onChange={(chosenDay:any) => props.setSelectedDate(chosenDay)}
                  />
                </LocalizationProvider>
              
            </div>
            {/* Description */}
            <div>
              <div>
              <TextField
                {...register("description", { value: props.existedRes?.description})}
                label="Description"
                id="description"
                InputProps={{
                  readOnly: isReadOnly,
                }}
                multiline
                rows={4}
                defaultValue={props.existedRes?.description}
                className="bg-white-50 border border-white-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 block w-full bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            </div>
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
      </Typography>
    </Box>
        </form>
    </Modal>
  )
}

export default ReservationModal;