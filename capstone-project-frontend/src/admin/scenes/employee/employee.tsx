import { useState } from "react";
// icon
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import axios from "axios";

//modal
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

// table
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { SelectChangeEvent } from "@mui/material";
//update
import { useMutation, useQueryClient } from "react-query";
import { useForm } from "react-hook-form";

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  img: {
    width: "60px",
    height: "60px",
    objectFit: "cover",
    borderRadius: "50%",
    margin: "0",
    padding: "3px",
    alignItem: "center",
    justifyContent: "center",
  },
  icon_edit: {
    color: "black",
    cursor: "pointer",
    "&:icon_edit": {
      color: "#757575",
    },
  },
  icon_delete: {
    paddingLeft: "10px",
    color: "black",
    cursor: "pointer",
    "&:icon_delete": {
      color: "#757575",
    },
  },
});

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

export default function Employee({ employeeprop }: any) {
  const [province, setProvince] = useState(employeeprop.existedRes?.province);

  const classes = useStyles();
  const queryClient = useQueryClient();
  const employeeId = employeeprop.id;

  const {
    register,
    getValues,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<IEmployee>({
    mode: "onChange",
    resetOptions: {
      keepDirtyValues: true,
    },
    defaultValues: async () => await axios.get(`/user/${employeeId}`),
  });

  const handleProvinceChange = (e: SelectChangeEvent<any>) => {
    setProvince(e.target.value);
  };

  const { isLoading, mutate } = useMutation(
    async (updateEmployee) => {
      return (
        await axios.put(
          `http://localhost:8080/user/${employeeId}`,
          updateEmployee
        )
      ).data;
    },
    {
      onSuccess: (data) => {
        const message = "success";
        alert(message);
        window.location.replace("/admin/employees");
      },
      onError: () => {
        alert("there was an error");
      },
      onSettled: () => {
        queryClient.invalidateQueries("create");
      },
    }
  );

  const onSubmit = (data: any) => {
    console.log(data);
    const updateEmployee: any = {
      ...data,
    };
    mutate(updateEmployee);
  };

  //modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //delete
  const handleDelete = (e: any) => {
    console.log(e);
    e.preventDefault();
    try {
      axios.delete(`http://localhost:8080/user/${employeeprop.id}`, {
        data: { userId: employeeprop.id },
      });
      const message = "success";
      alert(message);
      handleClose();
      window.location.replace("/admin/employees");
    } catch (err) {
      console.log("err : " + err);
    }
  };

  return (
    <>
      <Table
        sx={{ borderBottom: "solid 0.5px rgb(196, 196, 196)", width: "1250px" }}
      >
        <TableBody>
          <TableRow sx={{ textAlign: "left" }}>
            <TableCell
              sx={{
                width: "10px",
                margin: "0",
                padding: "2px",
                border: "none",
              }}
            >
              <Box sx={{ width: "14px", border: "none" }}>
                {employeeprop.id}
              </Box>
            </TableCell>
            <TableCell
              sx={{
                width: "60px",
                display: "flex",
                padding: "0",
                margin: "0",
                border: "none",
              }}
            >
              <Box
                sx={{
                  width: "60px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  objectPosition: "center",
                  padding: "0",
                  margin: "0",
                  border: "none",
                }}
              >
                <img
                  className={classes.img}
                  src={employeeprop.profile}
                  alt={employeeprop.first_name}
                />
              </Box>
            </TableCell>
            <TableCell sx={{ width: "200px", border: "none" }}>
              {employeeprop.email}
            </TableCell>
            <TableCell
              sx={{
                width: "130px",
                margin: "0",
                padding: "2px",
                border: "none",
              }}
            >
              {employeeprop.first_name} {employeeprop.last_name}
            </TableCell>
            <TableCell
              sx={{
                width: "100px",
                margin: "0",
                padding: "2px",
                border: "none",
              }}
            >
              {employeeprop.phone_number}
            </TableCell>
            <TableCell
              sx={{
                width: "200px",
                margin: "0",
                padding: "2px",
                border: "none",
              }}
            >
              {employeeprop.address_line1}
              <br></br>
              {employeeprop.address_line2}
            </TableCell>
            <TableCell
              sx={{
                width: "80px",
                margin: "0",
                padding: "2px",
                border: "none",
              }}
            >
              {employeeprop.city}
            </TableCell>
            <TableCell
              sx={{
                width: "70px",
                margin: "0",
                padding: "2px",
                border: "none",
              }}
            >
              {employeeprop.province}
            </TableCell>
            <TableCell
              sx={{
                width: "80px",
                margin: "0",
                padding: "2px",
                border: "none",
              }}
            >
              {employeeprop.postal_code}
            </TableCell>
            <TableCell
              sx={{
                width: "80px",
                margin: "0",
                padding: "2px",
                border: "none",
              }}
            >
              {employeeprop.country}
            </TableCell>
            <TableCell
              sx={{
                width: "80px",
                margin: "0",
                padding: "2px",
                border: "none",
              }}
            >
              {employeeprop.role == 1 ? "Admin" : "Employee"}
            </TableCell>
            <TableCell
              sx={{
                width: "80px",
                margin: "0",
                padding: "2px",
                border: "none",
              }}
            >
              {employeeprop.is_active == true ? "Active" : "In Active"}
            </TableCell>
            <TableCell
              sx={{
                width: "60px",
                margin: "0",
                padding: "2px",
                border: "none",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  margin: "0",
                }}
              >
                <EditIcon className={classes.icon_edit} onClick={handleOpen} />
                <ClearIcon
                  fontSize="large"
                  className={classes.icon_delete}
                  onClick={handleDelete}
                />
              </Box>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      {/* Update Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
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
              Update Account
            </Typography>
            <TextField
              id="outlined-required"
              label="Email"
              sx={{
                margin: "0.5rem",
                width: "617px",
              }}
              defaultValue={employeeprop.email}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              required
              id="outlined-required"
              label="Password"
              placeholder="••••••••"
              sx={{
                margin: "0.5rem",
                width: "300px",
              }}
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
              placeholder="••••••••"
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
              placeholder={employeeprop.first_name}
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
              placeholder={employeeprop.last_name}
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
              placeholder={employeeprop.phone_number}
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
              placeholder={employeeprop.address_line1}
              {...register("address_line1")}
            />
            <TextField
              id="outlined-required"
              label="Address Line2"
              sx={{
                margin: "0.5rem",
                width: "300px",
              }}
              placeholder={employeeprop.address_line2}
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
              placeholder={employeeprop.city}
              {...register("city")}
            />

            <Select
              required
              {...register("province")}
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={province}
              label="Province"
              placeholder={employeeprop.province}
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
              placeholder={employeeprop.postal_code}
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
              placeholder={employeeprop.country}
              {...register("country")}
            />
            <Select
              required
              placeholder={employeeprop.role}
              sx={{
                margin: "0.5rem",
                width: "300px",
              }}
              {...register("role")}
            >
              <MenuItem value={1}>Admin</MenuItem>
              <MenuItem value={2}>Employee</MenuItem>
              <MenuItem value={3}>Customer</MenuItem>
            </Select>
            <Select
              required
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              sx={{
                margin: "0.5rem",
                width: "300px",
              }}
              placeholder={employeeprop.is_active}
              {...register("is_active")}
            >
              <MenuItem value={1}>Active</MenuItem>
              <MenuItem value={2}>In Active</MenuItem>
            </Select>

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
                Update
              </Button>
            </Typography>
          </form>
        </Box>
      </Modal>
    </>
  );
}
