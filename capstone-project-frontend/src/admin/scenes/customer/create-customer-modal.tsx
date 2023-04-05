import {
  Box,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Typography,
  FormControl,
  TextField,
  Button,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "../../../api/axios";
import { useMutation, useQueryClient } from "react-query";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface ICustomer {
  // id: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  address_line1: string;
  address_line2?: string;
  postal_code: string;
  city: string;
  province: string;
  country: string;
  role: number;
  is_active: boolean;
}

const signUp = async (data: any) => {
  const { data: response } = await axios.post("auth/signup", data);
  return response.data;
};

const CustomerModal = (props: any) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const queryClient = useQueryClient();
  const {
    register,
    getValues,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<ICustomer>({
    mode: "onChange", 
    defaultValues: {
      role: 3,
    },
  });

  const { isLoading, mutate } = useMutation(signUp, {
    onSuccess: (data) => {
      console.log(data);
      const message = "success";
      alert(message);
      handleClose();
      window.location.replace("/admin/customers");
    },
    onError: () => {
      alert("there was an error");
    },
    onSettled: () => {
      queryClient.invalidateQueries("create");
    },
  });

  const onSubmit = (data: ICustomer) => {
    const newUser = {
      ...data,
    };
    mutate(newUser);
  };

  return (
    <Modal open={props.open} onClose={():void => {props.setOpen(false)}}>
      <Box sx={modalStyle}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            sx={{
              marginLeft: "1rem",
              marginBottom: "1rem",
              fontWeight: "semiBold",
              fontSize: "20px",
            }}
          >
            Create Account
          </Typography>
          <TextField
            id="outlined-required"
            label="Email"
            sx={{
              margin: "0.5rem",
              width: "617px",
            }}
            {...register("email")}
          />
          <TextField
            required
            id="outlined-required"
            label="Password"
            sx={{
              margin: "0.5rem",
              width: "300px",
            }}
            placeholder="••••••••"
            {...register("password")}
          />
          <TextField
            required
            id="outlined-required"
            label="Confirm Password"
            sx={{
              margin: "0.5rem",
              width: "300px",
            }}
          />
          <TextField
            required
            id="outlined-required"
            label="First Name"
            margin="normal"
            sx={{
              margin: "0.5rem",
              width: "300px",
            }}
            {...register("first_name")}
          />
          <TextField
            required
            id="outlined-required"
            label="Last Name"
            sx={{
              margin: "0.5rem",
              width: "300px",
            }}
            {...register("last_name")}
          />
          <TextField
            required
            id="outlined-required"
            label="Phone"
            sx={{
              fullWidth: "true",
              margin: "0.5rem",
              width: "617px",
            }}
            {...register("phone_number")}
          />
          <TextField
            required
            id="outlined-required"
            label="Address Line1"
            sx={{
              margin: "0.5rem",
              width: "300px",
            }}
            {...register("address_line1")}
          />
          <TextField
            required
            id="outlined-required"
            label="Address Line2"
            sx={{
              margin: "0.5rem",
              width: "300px",
            }}
            {...register("address_line2")}
          />
          <TextField
            required
            id="outlined-required"
            label="City"
            sx={{
              margin: "0.5rem",
              width: "300px",
            }}
            {...register("city")}
          />
          <TextField
            required
            id="outlined-required"
            label="Province"
            sx={{
              margin: "0.5rem",
              width: "300px",
            }}
            {...register("province")}
          />
          <TextField
            required
            id="outlined-required"
            label="Postal Code"
            sx={{
              margin: "0.5rem",
              width: "300px",
            }}
            {...register("postal_code")}
          />
          <TextField
            required
            id="outlined-required"
            label="Country"
            sx={{
              margin: "0.5rem",
              width: "300px",
            }}
            {...register("country")}
          />

              <TextField
              id="outlined-required"
              label="Role"
              sx={{
                margin: "0.5rem",
                width: "300px",
              }}
              defaultValue="Customer"
            />
          <FormControl
            sx={{
              margin: "0.5rem",
              width: "300px",
            }}
          >
            <InputLabel id="demo-simple-select-label">Active</InputLabel>
            <Select
              required
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              {...register("is_active")}
            >
              <MenuItem value={1}>Active</MenuItem>
              <MenuItem value={2}>In Active</MenuItem>
            </Select>
          </FormControl>

          <Typography align="center">
            <Button
              sx={{
                marginTop: "1rem",
                width: "100px",
                backgroundColor: "black",
                color: "white",
              }}
              type="submit"
            >
              SUBMIT
            </Button>
          </Typography>
        </form>
      </Box>
    </Modal>
  );
};

export default CustomerModal;
