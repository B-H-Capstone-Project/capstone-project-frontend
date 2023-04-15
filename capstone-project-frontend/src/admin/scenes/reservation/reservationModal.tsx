import React, { useEffect, useState } from "react";
import axios from "../../../api/axios";
import { useMutation, useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import IReservationForm from "../../../types/reservation";
import {
  Avatar,
  Box,
  createTheme,
  Button,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Modal,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

// Icon
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import { makeStyles } from "@mui/styles";
interface ICustomer {
  id: number;
  first_name: string;
  last_name: string;
  profile: string;
  phone_number: string;
  email: string;
}

const useStyles = makeStyles({
  icon_edit: {
    color: "black",
    cursor: "pointer",
    "&:icon_edit": {
      color: "#757575",
    },
  },
  icon_delete: {
    marginLeft: "10px",
    color: "black",
    cursor: "pointer",
    "&:icon_delete": {
      color: "#757575",
    },
  },
});
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 720,
  height: 700,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflow: "scroll",
};


const provinces = [
  "AB",
  "BC",
  "NB",
  "NL",
  "NS",
  "NT",
  "NU",
  "MB",
  "ON",
  "PE",
  "QC",
  "SK",
  "YT",
];

const ReservationModal = (props: any) => {
  const queryClient = useQueryClient();
  const [error, setError] = useState(null);
  const [customer, setCustomer] = React.useState<ICustomer>(props.customer);
  const [isReadOnly, setIsReadOnly] = React.useState(false);
  const [dateTime, setDateTime] = React.useState<Dayjs | null>(null);
  const classes = useStyles();
  
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
    props.setProvince(null);
    props.setType(null);
    reset();
  };
  const {
      register,
      getValues,
      formState: { errors, isValid },
      handleSubmit,
      reset
    } = useForm<IReservationForm>({
      mode: 'onBlur',
    });

  const createRes = async (data: IReservationForm) => {
    const { data: response } = await axios.post(
      `reservation/${props.customer?.id}`,
      data
    );
    return response.data;
  };

  const updateRes = async (data: IReservationForm) => {
    const { data: response } = await axios.put(
      `reservation/${props.existedRes?.id}`,
      data
    );
    return response.data;
  };

  const deleteRes = useMutation(() => {
    return axios.delete(`reservation/${props.existedRes?.id}`);
  });

  const { isLoading, mutate } = useMutation(
    props.isNew ? createRes : updateRes,
    {
      onSuccess: (data) => {
        const message = "success";
        alert(message);
      },
      onError: (error: any) => {
        setError(error.response.data.message);
      },
      onSettled: () => {
        queryClient.invalidateQueries("create");
      },
    }
  );

  const handleChange = (e: SelectChangeEvent<any>) => {
    props.setCustomer(JSON.parse(e.target.value));
  };

  const handleEditClick = () => {
    props.setType(props.existedRes?.type);
    props.setIsNew(false);
    setIsReadOnly(false);
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setType((event.target as HTMLInputElement).value);
  }

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete this reservation?`)) {
      deleteRes.mutate();
      alert("success");
      makeReset();
      window.location.reload();
    }
  };

  const handleProvinceChange = (e: SelectChangeEvent<any>) => {
    props.setProvince(e.target.value);
  };

  const onSubmit = async (data: any) => {
    if (props.isNew) {
      const newRes = {
        ...data,
        date: props.selectedDate,
        user_id: props.customer.id,
        type: props.type
      }
      mutate(newRes);
    } else {
      const updateRes = {
        ...data,
        date: props.selectedDate,
        user_id: props.customer.id,
        type: props.type
      }
      mutate(updateRes);
    }
    makeReset();
    window.location.reload();
  };

  const EditDeleteIcons = () => {
    return <>
      <EditIcon onClick={handleEditClick} className={classes.icon_edit}/>
      <DeleteIcon onClick={handleDelete} className={classes.icon_delete}/>
    </>
  }
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
          {/* Edit Icon */}
          <Box
            sx={{
              float: "right",
              paddingRight: "5px",
              cursor: "poiner",
              hover: "grey",
            }}
          >
            {props.isNew === false ? EditDeleteIcons() : null}
          </Box>

          {/* Profile Avatar */}
          <Box
            sx={{
              display: "flex",
              paddingBottom: "10px",
              paddingRight: "10px",
              float: "right"
            }}
          >
            <Avatar
              sx={{
                width: "80px",
                height: "80px",
                margin: "0 0 0 0.5rem",
              }}
              alt={props.customer?.last_name}
              src={props.customer?.profile}
            />
          </Box>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {props.isNew === true ? (
              <>
                <InputLabel
                  id="demo-simple-select-standard-label"
                  sx={{ margin: "0 0 0 0.9rem", color:'grey', fontSize:'13px' }}
                >
                  Customer List
                </InputLabel>
                <Select
                  {...register("id", {
                    value: props.customer?.id,
                    required: true,
                  })}
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  sx={{ margin: "0.5rem", width: "300px" }}
                  onChange={handleChange}
                  defaultValue={
                    props.customer ? JSON.stringify(props.customer) : ""
                  }
                  label="Customer"
                  className="w-1/2 mb-2"
                >
                
                  {props.customers.map((customer: ICustomer) => (
                    <MenuItem
                      key={customer.id}
                      value={JSON.stringify(customer)}
                    >
                      {customer.first_name} {customer.last_name}
                    </MenuItem>
                  ))}
                </Select>
                <br/>
              </>
            ) : null}

            {/* Customer Information Name & Email & Phone */}
              {props.customer ? (
                <Box sx={{
                  width: "617px",
                  margin: "0.5rem",
                  padding: "0.5rem 0 0.5rem 0.5rem",
                  border: "lightgrey solid 1px",
                  borderRadius: "5px"
                }}>
                  <span>
                  <PersonIcon /> {props.customer?.first_name} {props.customer?.last_name}
                  </span>
                  <br/>
                  <span>
                    <EmailIcon /> {props.customer?.email}</span>
                  <br/>
                  <span><PhoneAndroidIcon /> {props.customer?.phone_number}</span>
                  <br/>
                </Box>
              ) : (
                <>
                  <TextField
                    id="outlined-required"
                    label="First Name"
                    margin="normal"
                    sx={{
                      margin: "0.5rem",
                      width: "300px",
                    }}
                    defaultValue={props.customer?.first_name}
                  />
                  <TextField
                    id="outlined-required"
                    label="Last Name"
                    margin="normal"
                    sx={{
                      margin: "0.5rem",
                      width: "300px",
                    }}
                    defaultValue={props.customer?.last_name}
                  />
                  <TextField
                    required
                    id="outlined-required"
                    label="Email"
                    sx={{
                      margin: "0.5rem",
                      width: "300px",
                    }}
                    defaultValue={props.customer?.email}
                  />
                  <TextField
                    required
                    id="outlined-required"
                    label="Phone Number"
                    sx={{
                      margin: "0.5rem",
                      width: "300px",
                    }}
                    defaultValue={props.customer?.phone_number}
                  />
                </>
              )}

            {/* AddressLine 1 & 2 */}
            <TextField
              required
              {...register("address_line1", { required: "This is required" })}
              label="Address Line1"
              id="address_line1"
              InputProps={{
                readOnly: isReadOnly,
              }}
              sx={{
                margin: "0.5rem",
                width: "300px",
              }}
              defaultValue={props.existedRes?.address_line1}
            />
            <TextField
              {...register("address_line2")}
              label="Address Line2"
              id="address_line1"
              InputProps={{
                readOnly: isReadOnly,
              }}
              sx={{
                margin: "0.5rem",
                width: "300px",
              }}
              defaultValue={props.existedRes?.address_line2}
            />

            {/* Postal Code & City */}
            <TextField
              required
              {...register("postal_code", { required: true })}
              label="Postal Code"
              id="postal_code"
              InputProps={{
                readOnly: isReadOnly,
              }}
              defaultValue={props.existedRes?.postal_code}
              sx={{
                margin: "0.5rem",
                width: "300px",
              }}
            />
            <TextField
              required
              {...register("city")}
              label="City"
              id="city"
              InputProps={{
                readOnly: isReadOnly,
              }}
              defaultValue={props.existedRes?.city}
              sx={{
                margin: "0.5rem",
                width: "300px",
              }}
            />

            {/* Province & Country */}
            <Select
              {...register("province")}
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              sx={{
                margin: "0.5rem",
                width: "300px",
              }}
              onChange={handleProvinceChange}
              value={props.province}
              label="Province"
              inputProps={{ readOnly: isReadOnly }}
              defaultValue={props.province}
            >
              {provinces.map((province: string) => (
                <MenuItem key={province} value={province}>
                  {province}
                </MenuItem>
              ))}
            </Select>
            <TextField
              sx={{
                margin: "0.5rem",
                width: "300px",
              }}
              required
              {...register("country")}
              label="Country"
              id="country"
              InputProps={{
                readOnly: isReadOnly,
              }}
              defaultValue={props.existedRes?.country}
            />

            {/* Type */}
            <Box
              sx={{
                margin: "0.5rem",
              }}
            >
              <InputLabel sx={{ fontSize: "12px", paddingLeft: "10px" }}>
                Types *
              </InputLabel>
              <RadioGroup
                onChange={handleRadioChange}
                defaultValue={props.existedRes?.type}
                value={props.type}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  paddingLeft: "10px",
                  paddingBottom: "5px",
                }}
              >
                <FormControlLabel value="Residential" control={<Radio />} label="Residential" disabled={isReadOnly}/>
                <FormControlLabel value="Commercial" control={<Radio />} label="Commercial" disabled={isReadOnly}/>
                <FormControlLabel value="Service" control={<Radio />} label="Service" disabled={isReadOnly}/>
                <FormControlLabel value="Outdoor Lighting" control={<Radio />} label="Outdoor Lighting" disabled={isReadOnly}/>
              </RadioGroup>
            </Box>

            {/* Date and Time */}
            <Box
              sx={{
                margin: "0.5rem",
                width: "617px",
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="Date & Time *"
                  renderInput={(props) => <TextField fullWidth {...props} />}
                  value={props.selectedDate}
                  minDate={dayjs().add(1, "day")}
                  readOnly={isReadOnly}
                  onChange={(chosenDay: any) =>
                    props.setSelectedDate(chosenDay)
                  }
                />
              </LocalizationProvider>
            </Box>

            {/* Description */}
            <TextField
              sx={{
                margin: "0.5rem 0.5rem 0 0.5rem",
                width: "617px",
              }}
              {...register("description", {
                value: props.existedRes?.description,
              })}
              label="Description"
              id="description"
              InputProps={{
                readOnly: isReadOnly,
              }}
              multiline
              rows={4}
              defaultValue={props.existedRes?.description}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                type="submit"
                sx={{
                  marginTop: "1rem",
                  width: "100px",
                  backgroundColor: "black",
                  color: "white",
                }}
              >
                SUBMIT
              </Button>
            </Box>
          </Typography>
        </Box>
      </form>
    </Modal>
  );
};

export default ReservationModal;
