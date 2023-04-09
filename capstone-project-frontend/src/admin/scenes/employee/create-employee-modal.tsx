import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "../../../api/axios";
import { useMutation, useQueryClient } from "react-query";
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
  SelectChangeEvent,
} from "@mui/material";

const style = {
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

interface IEmployee {
  email: string;
  password: string;
  confirm_password: string;
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

const signUp = async (data: any) => {
  const { data: response } = await axios.post("auth/signup", data);
  return response.data;
};

const CustomerModal = (props: any) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [province, setProvince] = useState();

  const handleProvinceChange = (e: SelectChangeEvent<any>) => {
    setProvince(e.target.value);
  };

  const queryClient = useQueryClient();
  const {
    register,
    getValues,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<IEmployee>({
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
      window.location.replace("/admin/employees");
    },
    onError: () => {
      alert("there was an error");
    },
    onSettled: () => {
      queryClient.invalidateQueries("create");
    },
  });

  const onSubmit = (data: IEmployee) => {
    const newUser = {
      ...data,
    };
    mutate(newUser);
  };

  return (
    <Modal
      open={props.open}
      onClose={(): void => {
        props.setOpen(false);
      }}
    >
      <Box sx={style}>
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
            {...register("password", {
              required: true,
              minLength: 10,
            })}
            error={errors.password?.type === "minLength"}
            helperText={
              errors.password?.type === "minLength"
                ? "Password must be more than 8 chars."
                : null
            }
          />
          <TextField
            required
            id="outlined-required"
            label="Confirm Password"
            {...register("confirm_password", {
              required: true,
              validate: (value) => value === getValues("password"),
            })}
            sx={{
              margin: "0.5rem",
              width: "300px",
            }}
            error={
              errors.confirm_password &&
              errors.confirm_password.type === "validate"
            }
            helperText={
              errors.confirm_password &&
              errors.confirm_password.type === "validate"
                ? "Passwords do not match."
                : null
            }
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
          <Select
            required
            {...register("province")}
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={province}
            label="Province"
            onChange={handleProvinceChange}
            sx={{
              margin: "0.5rem",
              width: "300px",
            }}
          >
            {provinces.map((province: string) => (
              <MenuItem key={province} value={province}>
                {province}
              </MenuItem>
            ))}
          </Select>
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
          <FormControl
            sx={{
              margin: "0.5rem",
              width: "300px",
            }}
          >
            <InputLabel>Role</InputLabel>
            <Select required {...register("role")}>
              <MenuItem value={1}>Admin</MenuItem>
              <MenuItem value={2}>Employee</MenuItem>
            </Select>
          </FormControl>
          <FormControl
            sx={{
              margin: "0.5rem",
              width: "300px",
            }}
          >
            <InputLabel>Active</InputLabel>
            <Select required {...register("is_active")}>
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
