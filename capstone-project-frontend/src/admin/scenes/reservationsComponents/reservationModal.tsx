import { Avatar, Box, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Modal, Radio, RadioGroup, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
// import { DateField } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import axios from '../../../api/axios';
import ICustomer from '../../../types/user';
import EditIcon from '@mui/icons-material/Edit';
import IReservationForm from '../../../types/reservation';
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
  // const [isReadOnly, setIsReadOnly] = React.useState(true);
  const [isReadOnly, setIsReadOnly] = React.useState(props.isNew===true ? false : true);
  // const [dateTime, setDateTime] = React.useState<Dayjs | null>(props.selectedDate);
  const [dateTime, setDateTime] = React.useState<Dayjs | null>(null);
  const [province, setProvince] = React.useState(null);
  
  // const [dateTime, setDateTime] = React.useState<Date>(new Date(props.selectedDate));

  /* useEffect(() => {
    if (dateTime) {
      props.setSelectedDate(dateTime.toISOString().slice(0, 16));
      // props.setSelectedDate(dayjs(dateTime.$d));
      console.log('in useEffect(): ',props.selectedDate);
    }
  }, [dateTime, props]); */

  const makeReset = () => {
    props.setSelectedDate(null);
    props.setOpen(false);
    props.setIsNew(false);
    props.setCustomer(null);
    props.setExistedRes(null); 
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
      resetOptions: {
        keepDirtyValues: true,
      },
      defaultValues: {
        user_id: props.customer?.id,
        type: props.existedRes?.type,
      }
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
        console.log(props.isNew);
        console.log(data);
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
    console.log(JSON.parse(e.target.value));
      props.setCustomer(JSON.parse(e.target.value));
    };

  const handleProvinceChange = (e:SelectChangeEvent<any>) => {
    setProvince(e.target.value);
  }

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
      console.log('update res: ', updateRes);
      mutate(updateRes);
    }
    makeReset();
    // window.location.reload();
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
        {props.isNew===false? <EditIcon onClick={()=>{/* props.setIsNew(); */ console.log('isNew: ', props.isNew); setIsReadOnly(false)}}/>:null}
        
        <FormControl>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <InputLabel id="demo-simple-select-standard-label">Customer List</InputLabel>
          <Select
            {...register('user_id', {value: customer?.id, required: true})}
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            onChange={handleChange}
            // value={customer?.id}
            // defaultValue={props.extestedRes?.user_id}
            // defaultValue={customer?.id}
            defaultValue={JSON.stringify(customer)}
            
          //   (event: SelectChangeEvent<any>, child: ReactNode) => void
            label="Age"
            inputProps={{ readOnly: isReadOnly }}
          >
            {props.customers.map((customer:ICustomer) => (
              <MenuItem key={customer.id} value={JSON.stringify(customer)}>{customer.first_name} {customer.last_name}</MenuItem>
              ))}
          </Select>
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
            <Select
            required
            {...register('province')}
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            onChange={handleProvinceChange}
            defaultValue={props.existedRes?.province}
            value={province}
          //   (event: SelectChangeEvent<any>, child: ReactNode) => void
            label="Province"
            inputProps={{ readOnly: isReadOnly }}
          >
            {provinces.map((province: string) => (
              <MenuItem key={province} value={province}>{province}</MenuItem>
              ))}
          </Select>
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
          </FormControl>
    </Box>
        </form>
    </Modal>
  )
}

export default ReservationModal;