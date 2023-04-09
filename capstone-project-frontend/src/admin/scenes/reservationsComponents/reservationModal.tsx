import React, { ChangeEvent, useEffect, useState } from "react";
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
  FormLabel,
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
import EditIcon from "@mui/icons-material/Edit";
import { ThemeProvider } from "@mui/styles";
import DeleteIcon from "@mui/icons-material/Delete";

interface ICustomer {
  id: number;
  first_name: string;
  last_name: string;
  profile: string;
  phone_number: string;
  email: string;
}
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

const theme = createTheme({
  spacing: 10,
});

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
  const [province, setProvince] = React.useState(props.existedRes?.province);

  useEffect(() => {
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
  };
  const {
    register,
    getValues,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<IReservationForm>({
    mode: "onChange",
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
      `reservation/${props.existedRes?.reservation_id}`,
      data
    );
    return response.data;
  };

  const deleteRes = useMutation(() => {
    return axios.delete(`reservation/${props.existedRes?.reservation_id}`);
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
    props.setIsNew(false);
    setIsReadOnly(false);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete this reservation?`)) {
      deleteRes.mutate();
      alert("success");
      makeReset();
      window.location.reload();
    }
  };

  const onSubmit = async (data: any) => {
    if (props.isNew) {
      const newRes = {
        ...data,
        date: props.selectedDate,
        user_id: props.customer.id,
      };
      mutate(newRes);
    } else {
      const updateRes = {
        ...data,
        date: props.selectedDate,
        user_id: props.customer.id,
      };
      mutate(updateRes);
    }
    makeReset();
    window.location.reload();
  };

  const EditDeleteIcons = () => {
    return (
      <>
        <EditIcon onClick={handleEditClick} />
        <DeleteIcon onClick={handleDelete} />
      </>
    );
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
          <Box
            sx={{
              float: "right",
              paddingRight: "5px",
                cursor: 'poiner',
                hover: 'grey'
            }}
          >
            {props.isNew === false ? EditDeleteIcons() : null}
          </Box>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {props.isNew === true ? (
              <>
                <InputLabel id="demo-simple-select-standard-label">
                  Customer List
                </InputLabel>
                <Select
                  {...register("id", {
                    value: props.customer?.id,
                    required: true,
                  })}
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
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
                      <TextField
                        id="outlined-required"
                        label="First Name"
                        margin="normal"
                        sx={{
                          margin: "0.5rem",
                          width: "300px",
                        }}
                        defaultValue={customer.first_name}
                      />
                      <TextField
                        id="outlined-required"
                        label="First Name"
                        margin="normal"
                        sx={{
                          margin: "0.5rem",
                          width: "300px",
                        }}
                        defaultValue={customer.last_name}
                      />
                    </MenuItem>
                  ))}
                </Select>
              </>
            ) : null}
            <Box>
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    paddingBottom: "20px",
                    paddingLeft: "5px",
                  }}
                >
                  <Avatar
                    sx={{
                      width: "80px",
                      height: "80px",
                    }}
                    alt={props.customer?.last_name}
                    src={props.customer?.profile}
                  />
                </Box>
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
              </Box>

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
              <TextField
                sx={{
                  margin: "0.5rem",
                  width: "300px",
                }}
                required
                {...register("province")}
                label="Province"
                id="province"
                InputProps={{
                  readOnly: isReadOnly,
                }}
                defaultValue={props.existedRes?.province}
              />
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
                  defaultValue={props.existedRes?.type}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    paddingLeft: "10px",
                    paddingBottom: "5px",
                  }}
                >
                  <FormControlLabel
                    {...register("type", { required: "This is required" })}
                    value="Residential"
                    control={<Radio />}
                    label="Residential"
                    disabled={isReadOnly}
                  />
                  <FormControlLabel
                    {...register("type", { required: "This is required" })}
                    value="Commercial"
                    control={<Radio />}
                    label="Commercial"
                    disabled={isReadOnly}
                  />
                  <FormControlLabel
                    {...register("type", { required: "This is required" })}
                    value="Service"
                    control={<Radio />}
                    label="Service"
                    disabled={isReadOnly}
                  />
                  <FormControlLabel
                    {...register("type", { required: "This is required" })}
                    value="Outdoor Lighting"
                    control={<Radio />}
                    label="Outdoor Lighting"
                    disabled={isReadOnly}
                  />
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
            </Box>
          </Typography>
        </Box>
      </form>
    </Modal>
  );
};

export default ReservationModal;
